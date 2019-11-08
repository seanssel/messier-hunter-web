"use strict";
/* Global element references */

var navMenu = document.getElementById("nav-menu");
var goTop = document.getElementById("go-top");
var modalName = document.querySelector(".modal-name");
var modalExtract = document.querySelector(".modal-extract");
var modalOverlay = document.querySelector(".modal-overlay");
var topOffset = 400; // vertical pixel offset for scroll-to-top button fade

var currObject = null; // currently active messier object (for modal)

/**
 * Toggle information modal on object selection
 */

function toggleModal() {
  var modal = document.querySelector(".modal");

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
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("/sw.js").then(function (registration) {
        console.log("Service Worker registered! Scope: ".concat(registration.scope));
      })["catch"](function (err) {
        console.log("Service Worker registration failed: ".concat(err));
      });
    });
  } // UI initialization


  document.addEventListener("DOMContentLoaded", function () {
    // Toggle navbar dropdown menu
    document.getElementById("menu-button").addEventListener("click", function () {
      navMenu.classList.toggle("hidden");
    });
    var filters = {
      "cluster": document.querySelectorAll(".GC, .OC"),
      "nebulae": document.querySelectorAll(".EN, .RN, .PN"),
      "galaxy": document.querySelectorAll(".G"),
      "misc": document.querySelectorAll(".SR, .Ds")
    };

    var _loop = function _loop(id) {
      var filter = document.getElementById(id);
      filter.addEventListener("change", function () {
        filters[id].forEach(function (e) {
          return e.classList.toggle("inline-block");
        });
        filters[id].forEach(function (e) {
          return e.classList.toggle("hidden");
        });
      });
    };

    for (var id in filters) {
      _loop(id);
    } // Setup information modals


    var openmodal = document.querySelectorAll(".modal-open");
    openmodal.forEach(function (m) {
      m.addEventListener("click", function (event) {
        currObject = m.classList[3];
        event.preventDefault();
        toggleModal();
      });
    });
    modalOverlay.addEventListener("click", toggleModal);
    document.querySelectorAll(".modal-close").forEach(function (e) {
      e.addEventListener("click", toggleModal);
    }); // Handle keypresses to close modals

    document.onkeydown = function (evt) {
      evt = evt || window.event;
      var isEscape = false;

      if ("key" in evt) {
        isEscape = evt.key === "Escape" || evt.key === "Esc";
      } else {
        isEscape = evt.keyCode === 27;
      }

      if (isEscape && document.body.classList.contains("modal-active")) {
        toggleModal();
      }
    }; // Scroll to top button behavior


    window.onscroll = function () {
      if (window.scrollY >= topOffset && goTop.classList.contains("hidden")) {
        goTop.classList.toggle("hidden");
        goTop.classList.toggle("inline-block");
      } else if (window.scrollY < topOffset) {
        goTop.classList.add("hidden");
      }
    };

    goTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }); // end DOMContentLoaded
  });
}

init();