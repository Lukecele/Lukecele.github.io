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

const youtubeButton = document.querySelector("[data-youtube]");
const youtubePlayer = document.querySelector("[data-youtube-player]");

youtubeButton?.addEventListener("click", () => {
  if (!youtubePlayer) return;
  const isLoaded = Boolean(youtubePlayer.querySelector("iframe"));
  if (!isLoaded) {
    const iframe = document.createElement("iframe");
    iframe.title = "Hey Brother — official YouTube player";
    iframe.loading = "lazy";
    iframe.allow = "autoplay; encrypted-media; picture-in-picture";
    iframe.allowFullscreen = true;
    iframe.src = "https://www.youtube-nocookie.com/embed/YxIiPLVR6NA?rel=0&modestbranding=1&playsinline=1";
    youtubePlayer.append(iframe);
  }
  const hidden = youtubePlayer.hidden;
  youtubePlayer.hidden = !hidden;
  youtubeButton.textContent = hidden ? "Hide YouTube player" : "▶ Hey Brother · YouTube";
});

const mottos = {
  default: "A good scientist carries a backup seed.",
  data: "The dataset is vast. The README is your map.",
  wizard: "No wizardry required: just a clean environment.",
  training: "The validation suite has entered its training arc.",
  focus: "Charge the analysis. Check the assumptions twice.",
  power: "Power level: reproducible."
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
