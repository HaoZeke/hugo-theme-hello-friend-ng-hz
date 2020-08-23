(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["menu"],{

/***/ "XH8H":
/*!************************!*\
  !*** ./src/js/menu.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// Mobile menu\n\nconst menuTrigger = document.querySelector(\".menu-trigger\");\nconst menu = document.querySelector(\".menu\");\nconst mobileQuery = getComputedStyle(document.body).getPropertyValue(\"--phoneWidth\");\nconst isMobile = () => window.matchMedia(mobileQuery).matches;\nconst isMobileMenu = () => {\n  menuTrigger && menuTrigger.classList.toggle(\"hidden\", !isMobile());\n  menu && menu.classList.toggle(\"hidden\", isMobile());\n};\n\nisMobileMenu();\n\nmenuTrigger && menuTrigger.addEventListener(\"click\", () => menu && menu.classList.toggle(\"hidden\"));\n\nwindow.addEventListener(\"resize\", isMobileMenu);\n\n\n//# sourceURL=webpack:///./src/js/menu.js?");

/***/ })

},[["XH8H","runtime"]]]);