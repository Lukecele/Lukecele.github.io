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
let ambientTimer;
const soundToggle = document.querySelector("[data-sound]");

function stopAmbient() {
  window.clearInterval(ambientTimer);
  ambientTimer = undefined;
  ambientNodes.forEach((node) => node.stop?.());
  ambientNodes = [];
  audioContext?.close();
  audioContext = undefined;
}

function startAmbient() {
  audioContext = new AudioContext();
  const compressor = audioContext.createDynamicsCompressor();
  compressor.threshold.value = -28;
  compressor.knee.value = 18;
  compressor.ratio.value = 4;
  compressor.attack.value = 0.02;
  compressor.release.value = 0.4;
  compressor.connect(audioContext.destination);

  const master = audioContext.createGain();
  master.gain.value = 0.045;
  master.connect(compressor);

  const filter = audioContext.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 1600;
  filter.Q.value = 0.35;
  filter.connect(master);

  const bass = audioContext.createOscillator();
  const bassGain = audioContext.createGain();
  bass.type = "sine";
  bass.frequency.value = 130.81;
  bassGain.gain.value = 0.2;
  bass.connect(bassGain).connect(filter);
  bass.start();
  ambientNodes.push(bass);

  const chords = [
    [261.63, 329.63, 392],
    [220, 277.18, 329.63],
    [246.94, 293.66, 369.99],
    [196, 246.94, 293.66]
  ];
  let step = 0;
  const playChord = () => {
    const now = audioContext.currentTime;
    const chord = chords[step % chords.length];
    chord.forEach((frequency, index) => {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = index === 1 ? "sine" : "triangle";
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.08 / (index + 1), now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);
      oscillator.connect(gain).connect(filter);
      oscillator.start(now);
      oscillator.stop(now + 3);
      ambientNodes.push(oscillator);
    });
    step += 1;
  };
  playChord();
  ambientTimer = window.setInterval(playChord, 2800);
}

soundToggle?.addEventListener("click", async () => {
  const enabled = soundToggle.getAttribute("aria-pressed") === "true";
  if (enabled) {
    stopAmbient();
    soundToggle.setAttribute("aria-pressed", "false");
    soundToggle.textContent = "♫ Soundscape off";
    return;
  }
  startAmbient();
  await audioContext.resume();
  soundToggle.setAttribute("aria-pressed", "true");
  soundToggle.textContent = "♫ Soundscape on";
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
