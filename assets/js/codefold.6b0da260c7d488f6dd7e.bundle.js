(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["codefold"],{

/***/ "1zNg":
/*!****************************!*\
  !*** ./src/js/codefold.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("new Readmore(\".highlight\", {\n  speed: 75,\n  heightMargin: 25,\n  lessLink:\n    '<div class=\"fold\"><div class=\"button\"><div class=\"button__text fold\"><a href=\"#\">↑↑</a></div></div></div>',\n  moreLink:\n    '<div class=\"fold\"><div class=\"button\"><div class=\"button__text fold\"><a href=\"#\">↓↓</a></div></div></div>',\n  afterToggle: function (trigger, element, expanded) {\n    if (!expanded) {\n      // The \"Close\" link was clicked\n      window.scrollTo({ top: element.offsetTop, behavior: \"smooth\" });\n    }\n  },\n});\n\n\n//# sourceURL=webpack:///./src/js/codefold.js?");

/***/ })

},[["1zNg","runtime"]]]);