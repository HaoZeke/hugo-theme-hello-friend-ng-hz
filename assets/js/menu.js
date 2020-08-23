// Mobile menu

const menuButton = document.getElementById("toggleMenu");
const menuTrigger = document.querySelector(".menu-trigger");
const menu = document.querySelector(".menu");
const mobileQuery = getComputedStyle(document.body).getPropertyValue("--phoneWidth");
const isMobile = () => window.matchMedia(mobileQuery).matches;
const isMobileMenu = () => {
  menuTrigger && menuTrigger.classList.toggle("hidden", !isMobile());
  menu && menu.classList.toggle("hidden", isMobile());
};

isMobileMenu();

menuButton.addEventListener("click", function () {
  if (isMobile()) {
    menuTrigger.click();
  }
});

menuTrigger && menuTrigger.addEventListener("click", () => menu && menu.classList.toggle("hidden"));

window.addEventListener("resize", isMobileMenu);
