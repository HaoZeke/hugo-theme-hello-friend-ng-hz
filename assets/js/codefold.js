new Readmore(".highlight", {
  speed: 75,
  heightMargin: 25,
  lessLink:
    '<div class="fold"><div class="button"><div class="button__text fold"><a href="#" aria-label="Collapse code">Collapse</a></div></div></div>',
  moreLink:
    '<div class="fold"><div class="button"><div class="button__text fold"><a href="#" aria-label="Expand code">Expand</a></div></div></div>',
  afterToggle: function (trigger, element, expanded) {
    if (!expanded) {
      var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({
        top: element.offsetTop,
        behavior: reduce ? "auto" : "smooth",
      });
    }
  },
});
