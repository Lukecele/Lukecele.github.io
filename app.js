import { inject, track } from "@vercel/analytics";

inject();

document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-track]");
  if (target && target.dataset.track) {
    const trackLabel = target.dataset.track;

    // 1. Google Analytics & Google Tag Manager DataLayer event
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "custom_click",
        click_target: trackLabel,
        click_url: target.href || "",
        click_text: target.innerText ? target.innerText.trim().slice(0, 50) : ""
      });
    }
    if (typeof window.gtag === "function") {
      window.gtag("event", "click_action", {
        event_category: "Engagement",
        event_label: trackLabel,
        link_url: target.href || ""
      });
    }

    // 2. Vercel Analytics (fallback)
    try {
      track(trackLabel);
    } catch (e) {}
  }
});

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

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && siteNav.dataset.open === "true") {
      menuToggle.setAttribute("aria-expanded", "false");
      siteNav.dataset.open = "false";
      menuToggle.focus();
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

document.querySelectorAll("[data-quote-video]").forEach((button) => {
  button.addEventListener("click", () => {
    const player = button.parentElement?.querySelector("[data-quote-player]");
    const videoId = button.dataset.quoteVideo;
    if (!player || !videoId) return;
    const isLoaded = Boolean(player.querySelector("iframe"));
    if (!isLoaded) {
      const iframe = document.createElement("iframe");
      iframe.title = "English scene of the quote";
      iframe.loading = "lazy";
      iframe.allow = "autoplay; encrypted-media; picture-in-picture";
      iframe.allowFullscreen = true;
      iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`;
      player.append(iframe);
    }
    const hidden = player.hidden;
    player.hidden = !hidden;
    button.setAttribute("aria-expanded", String(hidden));
    button.textContent = hidden ? "Hide scene" : "▶ Watch English scene";
  });
});

document.querySelectorAll("[data-instagram-video]").forEach((button) => {
  button.addEventListener("click", () => {
    const player = button.parentElement?.querySelector("[data-instagram-player]");
    const reelId = button.dataset.instagramVideo;
    if (!player || !reelId) return;
    const isLoaded = Boolean(player.querySelector("iframe"));
    if (!isLoaded) {
      const iframe = document.createElement("iframe");
      iframe.title = "Instagram frame from Luca's Cave";
      iframe.loading = "lazy";
      iframe.allow = "autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      iframe.src = `https://www.instagram.com/reel/${reelId}/embed/`;
      player.append(iframe);
    }
    const hidden = player.hidden;
    player.hidden = !hidden;
    button.setAttribute("aria-expanded", String(hidden));
    button.textContent = hidden ? "Hide Instagram frame" : "▣ Open Instagram frame";
  });
});

const mottos = {
  default: "A good researcher always carries a spare random seed.",
  data: "The dataset is vast. The README is your map.",
  wizard: "No magic: just a clean reproducible environment.",
  training: "The validation test suite has entered its training arc.",
  focus: "Charge the analysis. Double-check your hypotheses.",
  power: "Power level: fully reproducible.",
  shield: "Strict spatial holdouts: zero leakage, zero regrets."
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

// --- PWA Live Update System & Cache Buster ---
if ("serviceWorker" in navigator) {
  let refreshing = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (!refreshing) {
      refreshing = true;
      window.location.reload();
    }
  });

  const toast = document.querySelector("#pwa-update-toast");
  const updateBtn = document.querySelector("#pwa-update-btn");
  const dismissBtn = document.querySelector("#pwa-dismiss-btn");
  const manualBtn = document.querySelector("#pwa-manual-check");
  const navManualBtn = document.querySelector("#pwa-nav-check");

  let waitingWorker = null;

  function showToast(worker) {
    waitingWorker = worker;
    if (toast) {
      toast.hidden = false;
      requestAnimationFrame(() => toast.classList.add("visible"));
    }
  }

  function hideToast() {
    if (toast) {
      toast.classList.remove("visible");
      setTimeout(() => { toast.hidden = true; }, 350);
    }
  }

  updateBtn?.addEventListener("click", () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ action: "skipWaiting" });
    } else {
      forceUpdateAndReload();
    }
  });

  dismissBtn?.addEventListener("click", hideToast);

  async function forceUpdateAndReload() {
    if (manualBtn) manualBtn.textContent = "⏳ Updating...";
    if (navManualBtn) navManualBtn.textContent = "⏳ Updating...";

    try {
      if ("caches" in window) {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map((name) => caches.delete(name)));
      }
      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({ action: "clearCache" });
        navigator.serviceWorker.controller.postMessage({ action: "skipWaiting" });
      }
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const reg of registrations) {
        await reg.update();
      }
    } catch (err) {
      console.warn("Manual PWA refresh error:", err);
    }

    setTimeout(() => {
      window.location.reload();
    }, 300);
  }

  manualBtn?.addEventListener("click", forceUpdateAndReload);
  navManualBtn?.addEventListener("click", forceUpdateAndReload);

  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        if (registration.waiting) {
          showToast(registration.waiting);
        }

        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (!newWorker) return;
          newWorker.addEventListener("statechange", () => {
            if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
              showToast(newWorker);
            }
          });
        });

        document.addEventListener("visibilitychange", () => {
          if (document.visibilityState === "visible") {
            registration.update().catch(() => {});
          }
        });

        setInterval(() => {
          registration.update().catch(() => {});
        }, 10 * 60 * 1000);
      })
      .catch((error) => {
        console.warn("Service worker registration failed.", error);
      });
  });
}
