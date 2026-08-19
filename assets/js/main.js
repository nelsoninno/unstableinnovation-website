/* ============================================================
   Unstable Innovation — site behavior
   ============================================================ */
(function () {
  "use strict";

  /* ---- Mobile menu toggle -------------------------------- */
  /* The header (.menu-toggle / .site-nav) is injected by partials.js on
     DOMContentLoaded, which fires AFTER this deferred script runs, so the
     button does not exist yet here. Use event delegation so the toggle
     works no matter when the header is rendered. */
  document.addEventListener("click", function (e) {
    const toggle = e.target.closest && e.target.closest(".menu-toggle");
    if (!toggle) return;
    const nav = document.querySelector(".site-nav");
    if (!nav) return;
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  /* ---- Mark active nav item ------------------------------ */
  function markActiveNav() {
    const path = location.pathname.replace(/\/index\.html$/, "/").replace(/\/$/, "") || "/";
    document.querySelectorAll(".site-nav a[data-path]").forEach((a) => {
      const p = a.getAttribute("data-path");
      if (p === path || (p !== "/" && path.startsWith(p))) {
        a.setAttribute("aria-current", "page");
      }
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", markActiveNav);
  } else {
    markActiveNav();
  }

  /* ---- Lazy-load YouTube iframes (click to play) --------- */
  function loadYouTube(el) {
    const id = el.getAttribute("data-yt");
    if (!id) return;
    const params = el.getAttribute("data-yt-params") || "autoplay=1&rel=0&modestbranding=1";
    const iframe = document.createElement("iframe");
    iframe.src = "https://www.youtube.com/embed/" + id + "?" + params;
    iframe.title = "YouTube video player";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.allowFullscreen = true;
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "0";
    iframe.style.position = "absolute";
    iframe.style.inset = "0";
    el.innerHTML = "";
    el.appendChild(iframe);
  }
  // Event delegation so clicks always reach the right element
  document.addEventListener("click", function(e) {
    const target = e.target.closest("[data-yt]");
    if (target) loadYouTube(target);
  });
  document.addEventListener("keydown", function(e) {
    if (e.key === "Enter" || e.key === " ") {
      const target = e.target.closest && e.target.closest("[data-yt]");
      if (target) { e.preventDefault(); loadYouTube(target); }
    }
  });
  /* ---- Email-capture form ----------------------------------
     The subscribe form on /get/ and /es/get/ now posts natively to
     /api/subscribe (a Cloudflare Pages Function) which stores the
     signup in D1 and redirects to /thank-you/. No client-side handler
     needed here. Left as documentation only. */


  /* ---- Personalize thank-you page with first name -------- */
  const greetingEl = document.querySelector("[data-greeting]");
  if (greetingEl) {
    const params = new URLSearchParams(location.search);
    const name = params.get("name");
    if (name) {
      greetingEl.textContent = name.replace(/[<>]/g, "").slice(0, 40);
    }
  }
})();
