"use strict";

// Same actions for all pages
document.addEventListener("DOMContentLoaded", () => {
    (function() {
        // scripts for mobile menu actions
        (function() {

            // moblie header menu actions
            (function() {
                let menuBtn = document.getElementById("menu-btn");

                let isOpend;
                menuBtn.addEventListener("click", event => {
                    isOpend = document.body.classList.toggle("opend-menu")
                });

                // delete js styles mutched to media query
                const matchQuery_1024px = window.matchMedia("(min-width: 64em)");

                matchQuery_1024px.addEventListener("change", event => {
                    if (isOpend && event.matches)
                        document.body.classList.remove("opend-menu");
                    else if (isOpend && !event.matches)
                        document.body.classList.add("opend-menu");
                });
            }());
        })();

        // footer sub menu action
        (function() {
            let footerNavList = document.getElementById("footer-nav-list");

            footerNavList.querySelectorAll(".c-f--footer-nav-list>li").forEach(li => {
                let footerList = li.querySelector(".footer-list");
                let toggleBtn = li.querySelector("button");
                let btnArrow = li.querySelector(".i-right-arrow");

                toggleBtn.addEventListener("click", event => {
                    footerList.classList.toggle("opend-sub-menu");
                    btnArrow.classList.toggle("opend-sub-menu");
                });

                li.addEventListener("mouseleave", event => {
                    if (footerList.classList.contains("opend-sub-menu")) {
                        footerList.classList.remove("opend-sub-menu");
                        btnArrow.classList.remove("opend-sub-menu");
                    }
                });
            });
        })();
    })();
});