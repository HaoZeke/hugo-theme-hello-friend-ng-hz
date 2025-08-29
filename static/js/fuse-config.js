document.addEventListener("DOMContentLoaded", () => {
  const searchQuery = document.getElementById("search-query");
  const searchResults = document.getElementById("search-results");
  const searchResultTemplate = document.getElementById("search-result-template");
  const filterCheckboxes = document.querySelectorAll("input[name=search-section]");
  const includeCheckboxes = document.querySelectorAll("input[name=search-include]");

  let searchList = [];
  let isSearchInitialized = false;

  async function initSearch() {
    try {
      const response = await fetch("/index.json");
      if (!response.ok) throw new Error("Failed to load search index");
      searchList = await response.json();
      isSearchInitialized = true;

      const urlParams = new URLSearchParams(window.location.search);
      const queryParam = urlParams.get("q") || urlParams.get("search-query");
      if (queryParam) {
        searchQuery.value = queryParam;
        executeSearch();
      }
    } catch (error) {
      console.error("Search initialization failed:", error);
    }
  }

  function executeSearch() {
    if (!isSearchInitialized) return;

    const searchKeys = [
      { name: "title", weight: 0.8 },
      { name: "contents", weight: 0.5 },
    ];
    const selectedIncludes = Array.from(includeCheckboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    if (selectedIncludes.includes("tags")) {
      searchKeys.push({ name: "tags", weight: 0.3 });
    }
    if (selectedIncludes.includes("categories")) {
      searchKeys.push({ name: "categories", weight: 0.3 });
    }

    const selectedSections = Array.from(filterCheckboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    if (selectedSections.length === 0) {
      renderResults([], searchQuery.value.trim(), true);
      return;
    }
    const filteredList = searchList.filter((item) => selectedSections.includes(item.section));

    const options = {
      keys: searchKeys,
      includeMatches: true,
      minMatchCharLength: 2,
      threshold: 0.4,
    };

    const fuse = new Fuse(filteredList, options);
    const query = searchQuery.value.trim();
    const results = query ? fuse.search(query) : [];

    renderResults(results, query);
  }

  function renderResults(results, query, noSections = false) {
    searchResults.innerHTML = "";

    if (noSections) {
      searchResults.innerHTML = `<li class="post-item"><span class="post-title">Please select a section to search in.</span></li>`;
      return;
    }
    if (results.length === 0 && query) {
      searchResults.innerHTML = `<li class="post-item"><span class="post-title">No results found for "${query}"</span></li>`;
      return;
    }

    results.slice(0, 20).forEach(({ item }) => {
      const { title, link, date, readingTime, tags, categories, snippet } = item;

      const tagsHTML =
        tags && tags.length > 0
          ? `<div class="taxonomy-group"><strong>Tags:</strong> ${tags.map((tag) => `<a class="taxonomy-item" href="/tags/${tag.toLowerCase().replace(/ /g, "-")}">${tag}</a>`).join("")}</div>`
          : "";

      const categoriesHTML =
        categories && categories.length > 0
          ? `<div class="taxonomy-group"><strong>Categories:</strong> ${categories.map((cat) => `<a class="taxonomy-item" href="/categories/${cat.toLowerCase().replace(/ /g, "-")}">${cat}</a>`).join("")}</div>`
          : "";

      const resultHTML = searchResultTemplate.innerHTML
        .replace(/\${link}/g, link)
        .replace(/\${title}/g, title)
        .replace(/\${date}/g, date)
        .replace(/\${readingTime}/g, readingTime)
        .replace(/\${snippet}/g, snippet)
        .replace(/\${tags}/g, tagsHTML)
        .replace(/\${categories}/g, categoriesHTML);

      searchResults.insertAdjacentHTML("beforeend", resultHTML);
    });

    if (query) {
      new Mark(searchResults).mark(query, { separateWordSearch: false });
    }
  }

  // Add event listeners
  searchQuery.addEventListener("keyup", executeSearch);
  filterCheckboxes.forEach((checkbox) => checkbox.addEventListener("change", executeSearch));
  includeCheckboxes.forEach((checkbox) => checkbox.addEventListener("change", executeSearch));

  initSearch();
});
