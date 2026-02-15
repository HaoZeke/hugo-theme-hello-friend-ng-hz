// Toggle theme

const getTheme = window.localStorage && window.localStorage.getItem("theme");
const themeToggle = document.querySelector(".theme-toggle");
const metaThemeColor = document.querySelector("meta[name=theme-color]");

function resolveThemeColor() {
  return getComputedStyle(document.documentElement).getPropertyValue("--bg-header").trim();
}

if (getTheme !== null) {
  const isDark = getTheme === "dark";
  document.body.classList.toggle("dark-theme", isDark);
  metaThemeColor.setAttribute("content", resolveThemeColor());
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  document.body.classList.add("dark-theme");
  metaThemeColor.setAttribute("content", resolveThemeColor());
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  const isDark = document.body.classList.contains("dark-theme");
  window.localStorage &&
    window.localStorage.setItem("theme", isDark ? "dark" : "light");
  metaThemeColor.setAttribute("content", resolveThemeColor());
});

// TOC Inline style

const tocToggle = document.getElementById("tocTog");

if (tocToggle) {
  const sideTOC = document.querySelector(".sideTOC");
  tocToggle.addEventListener("click", function () {
    sideTOC.classList.toggle("m-fadeOut");
    const current = getComputedStyle(document.documentElement).getPropertyValue("--sidebar-width");
    document.documentElement.style.setProperty(
      "--sidebar-width",
      current == "20fr" ? "1fr" : "20fr",
    );
  });
}
