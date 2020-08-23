// Toggle theme

const getTheme = window.localStorage && window.localStorage.getItem("theme");
const themeToggle = document.querySelector(".theme-toggle");
const isDark = getTheme === "dark";
var metaThemeColor = document.querySelector("meta[name=theme-color]");

if (getTheme !== null) {
  document.body.classList.toggle("dark-theme", isDark);
  isDark
    ? metaThemeColor.setAttribute("content", "#252627")
    : metaThemeColor.setAttribute("content", "#fafafa");
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  window.localStorage &&
    window.localStorage.setItem(
      "theme",
      document.body.classList.contains("dark-theme") ? "dark" : "light",
    );
  document.body.classList.contains("dark-theme")
    ? metaThemeColor.setAttribute("content", "#252627")
    : metaThemeColor.setAttribute("content", "#fafafa");
});

// TOC Inline style

const tocToggle = document.getElementById("tocTog");
const sideTOC = document.querySelector(".sideTOC");

tocToggle.addEventListener("click", function () {
  sideTOC.classList.toggle("m-fadeOut");
  if (getComputedStyle(document.documentElement).getPropertyValue("--sidebar-width") == "20fr") {
    // console.log(
    //   "was:",
    //   getComputedStyle(document.documentElement).getPropertyValue("--sidebar-width"),
    // );
    document.documentElement.style.setProperty("--sidebar-width", "1fr");
    // console.log(
    //   "is",
    //   getComputedStyle(document.documentElement).getPropertyValue("--sidebar-width"),
    // );
  } else {
    // console.log(
    //   "was:",
    //   getComputedStyle(document.documentElement).getPropertyValue("--sidebar-width"),
    // );
    document.documentElement.style.setProperty("--sidebar-width", "20fr");
    // console.log(
    //   "is",
    //   getComputedStyle(document.documentElement).getPropertyValue("--sidebar-width"),
    // );
  }
});
