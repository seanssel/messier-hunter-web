"use strict";

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

  // UI
  $(document).ready(function() {
    // Enable lazy-loading images
    // lazyload();

    // Setup navbar dropdown menu
    $("#menu-button").click(() => $("#nav-menu").toggleClass("hidden"));

    // Setup object filtering
    const filters = {
      "#cluster": $(".GC, .OC"),
      "#nebulae": $(".EN, .RN, .PN"),
      "#galaxy": $(".G"),
      "#misc": $(".SR, .Ds")
    };

    $.each(filters, (id, elems) => {
      $(id).change(() => {
        if ($(id).prop("checked")) {
          elems.fadeIn(300);
        } else {
          elems.fadeOut(300);
        }
      });
    });

    // Setup information modals
    let openmodal = document.querySelectorAll(".modal-open");
    for (let i = 0; i < openmodal.length; i++) {
      openmodal[i].addEventListener("click", function(event) {
        currObject = openmodal[i].classList[3];
        event.preventDefault();
        toggleModal();
      });
    }

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
  });
}

init();
