const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    siteNav.dataset.open = String(!isOpen);
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menuToggle.setAttribute("aria-expanded", "false");
      siteNav.dataset.open = "false";
    }
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = String(new Date().getFullYear());

const mottos = {
  default: "A good scientist carries a backup seed.",
  data: "The dataset is vast. The README is your map.",
  wizard: "No wizardry required: just a clean environment.",
  training: "The validation suite has entered its training arc.",
  focus: "Charge the analysis. Check the assumptions twice."
};
const motto = document.querySelector("[data-motto]");

function showMotto(key = "default") {
  if (motto) motto.textContent = mottos[key] || mottos.default;
}

document.querySelectorAll("[data-quest-card]").forEach((card) => {
  card.addEventListener("click", () => showMotto(card.dataset.questCard));
});
document.querySelector("[data-quest]")?.addEventListener("click", () => {
  showMotto();
  document.querySelector(".quest-section")?.scrollIntoView({ behavior: "smooth" });
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
}
