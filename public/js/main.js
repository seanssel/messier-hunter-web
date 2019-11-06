"use strict";

const TOP_OFFSET = 400; // vertical pixel offset for scroll-to-top button fade

let currObject = null;

/**
 * Toggle information modal on object selection
 */
function toggleModal() {
  const modal = document.querySelector(".modal");
  if (currObject) {
    const modalName = document.querySelector(".modal-name");
    const modalExtract = document.querySelector(".modal-extract");
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
    const navMenu = document.getElementById("nav-menu");
    const goTop = document.getElementById("go-top");

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

    const overlay = document.querySelector(".modal-overlay");
    overlay.addEventListener("click", toggleModal);

    let closemodal = document.querySelectorAll(".modal-close");
    for (let i = 0; i < closemodal.length; i++) {
      closemodal[i].addEventListener("click", toggleModal);
    }

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
      if (window.scrollY >= TOP_OFFSET && goTop.classList.contains("hidden")) {
        goTop.classList.toggle("hidden");
        goTop.classList.toggle("inline-block");
      } else if (window.scrollY < TOP_OFFSET) {
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