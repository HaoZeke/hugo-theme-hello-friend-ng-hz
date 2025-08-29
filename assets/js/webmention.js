// Using modern ES Modules import syntax is also an option,
// but require is fine for a simple script.
const fs = require("fs/promises");
const path = require("path");
const https = require("https");

const DATA_DIR = path.join(__dirname, "..", "data", "webmentions");

/**
 * Fetches recent webmentions from the webmention.io API.
 * @returns {Promise<Array<object>>} A promise that resolves to an array of webmention objects.
 */
async function fetchWebmentions() {
  const token = process.env.WEBMENTIONS_TOKEN;
  if (!token) {
    console.warn(
      "⚠️ WEBMENTIONS_TOKEN environment variable not set. Skipping fetch.",
    );
    return [];
  }

  const since = new Date();
  since.setDate(since.getDate() - 3); // Fetch mentions from the last 3 days

  const url = new URL("https://webmention.io/api/mentions.jf2");
  url.searchParams.set("domain", "rgoswami.me");
  url.searchParams.set("token", token);
  url.searchParams.set("since", since.toISOString());
  url.searchParams.set("per-page", "999");

  console.log(`Fetching webmentions since ${since.toISOString()}...`);

  // A modern wrapper around the native https.get
  const responseBody = await new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => resolve(body));
      })
      .on("error", reject);
  });

  const response = JSON.parse(responseBody);
  if (!response.children) {
    throw new Error(
      "Invalid webmention.io response: missing 'children' property.",
    );
  }
  return response.children;
}

/**
 * Saves a webmention to a JSON file corresponding to the post slug.
 * @param {object} webmention The webmention object.
 */
async function saveWebmention(webmention) {
  const targetUrl = webmention["wm-target"];
  // Create a slug from the URL path
  const slug = new URL(targetUrl).pathname
    .replace(/\/$/, "")
    .replace(/\//g, "--");
  if (!slug) return; // Skip mentions for the homepage

  const filename = path.join(DATA_DIR, `${slug}.json`);

  // Read existing mentions or start with an empty array
  let entries = [];
  try {
    const content = await fs.readFile(filename, "utf-8");
    entries = JSON.parse(content);
  } catch (error) {
    if (error.code !== "ENOENT") throw error; // Ignore "file not found"
  }

  // Add new mention and remove any old version of it
  const updatedEntries = entries
    .filter((wm) => wm["wm-id"] !== webmention["wm-id"])
    .concat(webmention);

  // Sort by ID to keep the file consistent
  updatedEntries.sort((a, b) => a["wm-id"] - b["wm-id"]);

  await fs.writeFile(filename, JSON.stringify(updatedEntries, null, 2));
  console.log(`✅ Saved/updated webmention ${webmention["wm-id"]} for ${slug}`);
}

/**
 * Main execution function.
 */
async function main() {
  try {
    const webmentions = await fetchWebmentions();
    if (webmentions.length === 0) {
      console.log("No new webmentions found.");
      return;
    }

    console.log(`Processing ${webmentions.length} new webmentions...`);
    // Ensure the data directory exists
    await fs.mkdir(DATA_DIR, { recursive: true });

    for (const webmention of webmentions) {
      await saveWebmention(webmention);
    }
    console.log("✨ Webmention processing complete.");
  } catch (error) {
    console.error("❌ An error occurred:", error);
    process.exit(1);
  }
}

// Entry point
main();
