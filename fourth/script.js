"use strict";

// For all actions on page
(function() {

    // scripts for mobile menu actions
    (function() {
        let menuBtn = document.querySelector("#menu-btn");

        let mainNav = document.querySelector("#main-n");
        let body = document.body;

        let logo = document.querySelector(".logo");


        let innerNav = document.querySelector("#inner-nav");
        let sellContainer = document.querySelector("#sell-actions-c");

        let hiddenElems = [sellContainer, innerNav];
        let mobileStyledElems = [mainNav, body];

        const scrollSize = window.innerWidth - mainNav.clientWidth;

        menuBtn.addEventListener("click", event => {
            let isOpend = !mainNav.classList.contains("opend-menu");

            hiddenElems.forEach(htmlEl => htmlEl.classList.toggle("menu-hidden"));
            mobileStyledElems.forEach(htmlEl => htmlEl.classList.toggle("opend-menu"));

            menuBtn.dataset.isOpend = isOpend;
            logo.dataset.menuIsOpend = isOpend;
        });

    })();

    // footer sub menu actions
    (function() {
        let firstDiv = document.querySelector("#sub-menu-action1");
        let lastDiv = document.querySelector("#sub-menu-action2");

        let divs = [firstDiv, lastDiv];

        divs.forEach(div => {
            div.addEventListener("click", event => {
                div.nextElementSibling.classList.toggle("sr-only");
                div.querySelector(".i-right-arrow").classList.toggle("opend-sub-menu");
            });
        });
    })();
})();