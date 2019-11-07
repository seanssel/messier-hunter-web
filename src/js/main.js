"use strict";

/* Global element references */
const navMenu = document.getElementById("nav-menu");
const goTop = document.getElementById("go-top");
const modalName = document.querySelector(".modal-name");
const modalExtract = document.querySelector(".modal-extract");
const modalOverlay = document.querySelector(".modal-overlay");

const topOffset = 400; // vertical pixel offset for scroll-to-top button fade
let currObject = null; // currently active messier object (for modal)

/**
 * Toggle information modal on object selection
 */
function toggleModal() {
  const modal = document.querySelector(".modal");
  if (currObject) {
    modalName.textContent = extracts[currObject].to;
    modalExtract.textContent = extracts[currObject].extract;
  }
  modal.classList.toggle("opacity-0");
  modal.classList.toggle("pointer-events-none");
  document.body.classList.toggle("modal-active");
}

/**
 * Perform all app initialization tasks.
 */
function init() {
  // Register service worker
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then(registration => {
          console.log(`Service Worker registed! Scope: ${registration.scope}`);
        })
        .catch(err => {
          console.log(`Service Worker registration failed: ${err}`);
        });
    });
  }

  // UI initialization
  document.addEventListener("DOMContentLoaded", function() {

    // Toggle navbar dropdown menu
    document.getElementById("menu-button").addEventListener("click", function() {
      navMenu.classList.toggle("hidden");
    });

    const filters = {
      "cluster": document.querySelectorAll(".GC, .OC"),
      "nebulae": document.querySelectorAll(".EN, .RN, .PN"),
      "galaxy": document.querySelectorAll(".G"),
      "misc": document.querySelectorAll(".SR, .Ds")
    };

    for (const id in filters) {
      const filter = document.getElementById(id);
      filter.addEventListener("change", () => {
        filters[id].forEach(e => e.classList.toggle("inline-block"));
        filters[id].forEach(e => e.classList.toggle("hidden"));
      });
    }

    // Setup information modals
    let openmodal = document.querySelectorAll(".modal-open");
    openmodal.forEach(m => {
      m.addEventListener("click", (event) => {
        currObject = m.classList[3];
        event.preventDefault();
        toggleModal();
      });
    });

    modalOverlay.addEventListener("click", toggleModal);
    document.querySelectorAll(".modal-close").forEach(e => {
      e.addEventListener("click", toggleModal);
    });

    // Handle keypresses to close modals
    document.onkeydown = function(evt) {
      evt = evt || window.event;
      let isEscape = false;
      if ("key" in evt) {
        isEscape = evt.key === "Escape" || evt.key === "Esc";
      } else {
        isEscape = evt.keyCode === 27;
      }
      if (isEscape && document.body.classList.contains("modal-active")) {
        toggleModal();
      }
    };

    // Scroll to top button behavior
    window.onscroll = () => {
      if (window.scrollY >= topOffset && goTop.classList.contains("hidden")) {
        goTop.classList.toggle("hidden");
        goTop.classList.toggle("inline-block");
      } else if (window.scrollY < topOffset) {
        goTop.classList.add("hidden");
      }
    };

    goTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });

    // end DOMContentLoaded
  });
}

init();