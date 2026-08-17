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
syncMenuExpanded();

function syncMenuExpanded() {
  if (!menuButton || !menu) return;
  const open = isMobile() && !menu.classList.contains("hidden");
  menuButton.setAttribute("aria-expanded", open ? "true" : "false");
}

menuButton.addEventListener("click", function () {
  if (isMobile()) {
    menuTrigger.click();
  }
});

menuTrigger && menuTrigger.addEventListener("click", () => {
  menu && menu.classList.toggle("hidden");
  syncMenuExpanded();
});

window.addEventListener("resize", () => {
  isMobileMenu();
  syncMenuExpanded();
});
