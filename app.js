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

let audioContext;
let ambientNodes = [];
const soundToggle = document.querySelector("[data-sound]");

function stopAmbient() {
  ambientNodes.forEach((node) => node.stop?.());
  ambientNodes = [];
  audioContext?.close();
  audioContext = undefined;
}

function startAmbient() {
  audioContext = new AudioContext();
  const master = audioContext.createGain();
  master.gain.value = 0.035;
  master.connect(audioContext.destination);

  [130.81, 196, 261.63, 329.63].forEach((frequency, index) => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = index % 2 ? "sine" : "triangle";
    oscillator.frequency.value = frequency;
    gain.gain.value = index === 0 ? 0.5 : 0.18;
    oscillator.connect(gain).connect(master);
    oscillator.start();
    ambientNodes.push(oscillator);
  });
}

soundToggle?.addEventListener("click", async () => {
  const enabled = soundToggle.getAttribute("aria-pressed") === "true";
  if (enabled) {
    stopAmbient();
    soundToggle.setAttribute("aria-pressed", "false");
    soundToggle.textContent = "♫ Ambient off";
    return;
  }
  startAmbient();
  await audioContext.resume();
  soundToggle.setAttribute("aria-pressed", "true");
  soundToggle.textContent = "♫ Ambient on";
});

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
