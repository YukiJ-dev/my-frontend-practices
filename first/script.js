"use strict";
(function () {

  // Dynamic addition styles for mobile menu
  let body = document.body;

  (function () {
    
    let mobileContainer = body.querySelector("#main-h-container");
    let mainMenu = body.querySelector("#main-menu");
    let contactInfo = body.querySelector("#contact-info");

    let mainMenuElements = [body, mobileContainer, mainMenu, contactInfo];

    let mainMenuBtn = body.querySelector("#menu-btn");

    // delete js-nav-open when mobile menu isn't available
    const media1200Px = window.matchMedia("(min-width: 75em)");

    // Open and close icons for hamburger menu
    let openIcon = mainMenuBtn.firstElementChild;
    let closeIcon = mainMenuBtn.lastElementChild;

    // Add style for mobile menu elements
    mainMenuBtn.addEventListener("click", event => {
      let isOpen;
      mainMenuElements.forEach(
        htmlEl => (isOpen = htmlEl.classList.toggle("js-nav-open"))
      );

      if (isOpen) {
        media1200Px.addEventListener("change", deleteOrAddIfOpen);
        mainMenuBtn.dataset.isClose = "false";
      } else {
        media1200Px.removeEventListener("change", deleteOrAddIfOpen);
        mainMenuBtn.dataset.isClose = "true";
      }
    });

    // Add or remove styles if use open mobile menu before screen size was changed
    function deleteOrAddIfOpen(e) {
      e.matches ? mainMenuElements.forEach(htmlEl => htmlEl.classList.remove("js-nav-open"))
        : mainMenuElements.forEach(htmlEl => htmlEl.classList.add("js-nav-open"));
    }

  })();

  // Open sub menu elements
  (function () {
    let subMenuButtons = body.querySelectorAll(".sub-menu-btn");

    subMenuButtons.forEach(btn => {
      let subMenuForBtn = btn.nextElementSibling;
      btn.addEventListener("click", e => subMenuForBtn.classList.toggle("is-open"));
    });
  })();

  // Scrolling main menu
  (function () {
    let mainHeader = body.querySelector("#main-header");
    let genericCont = body.firstElementChild;
    

    let scrollElements = [mainHeader, genericCont];
  
    const scrollingSpace = mainHeader.offsetHeight * 2;

    window.addEventListener("scroll", e => {
      let isScrolled = mainHeader.classList.contains("scroll-menu");

      if (window.pageYOffset > scrollingSpace && !isScrolled) {
        mainHeader.style.transform = "translateY(-100%)";
        
        setTimeout(() => {
          mainHeader.style.transform = "translateY(0%)";
          scrollElements.forEach(htmlEl => htmlEl.classList.add("scroll-menu"));
          mainHeader.style = "";
        }, 500);
        
      } else if (window.pageYOffset <= scrollingSpace && isScrolled) {
        scrollElements.forEach(htmlEl => htmlEl.classList.remove("scroll-menu"));
      }
    });

  })();
})();
