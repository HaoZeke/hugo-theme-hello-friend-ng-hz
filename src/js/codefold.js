new Readmore(".highlight", {
  speed: 75,
  heightMargin: 25,
  lessLink:
    '<div class="fold"><div class="button"><div class="button__text fold"><a href="#">↑↑</a></div></div></div>',
  moreLink:
    '<div class="fold"><div class="button"><div class="button__text fold"><a href="#">↓↓</a></div></div></div>',
  afterToggle: function (trigger, element, expanded) {
    if (!expanded) {
      // The "Close" link was clicked
      window.scrollTo({ top: element.offsetTop, behavior: "smooth" });
    }
  },
});
