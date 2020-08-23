(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["theme"],{

/***/ "k9OC":
/*!*************************!*\
  !*** ./src/js/theme.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// Toggle theme\n\nconst getTheme = window.localStorage && window.localStorage.getItem(\"theme\");\nconst themeToggle = document.querySelector(\".theme-toggle\");\nconst isDark = getTheme === \"dark\";\nvar metaThemeColor = document.querySelector(\"meta[name=theme-color]\");\n\nif (getTheme !== null) {\n  document.body.classList.toggle(\"dark-theme\", isDark);\n  isDark ? metaThemeColor.setAttribute(\"content\", \"#252627\") : metaThemeColor.setAttribute(\"content\", \"#fafafa\");\n}\n\nthemeToggle.addEventListener(\"click\", () => {\n  document.body.classList.toggle(\"dark-theme\");\n  window.localStorage &&\n    window.localStorage.setItem(\n      \"theme\",\n      document.body.classList.contains(\"dark-theme\") ? \"dark\" : \"light\",\n    );\n  document.body.classList.contains(\"dark-theme\") ?\n    metaThemeColor.setAttribute(\"content\", \"#252627\") : metaThemeColor.setAttribute(\"content\", \"#fafafa\");\n  ;\n});\n\n\n//# sourceURL=webpack:///./src/js/theme.js?");

/***/ })

},[["k9OC","runtime"]]]);