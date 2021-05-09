(function() {

    // The logic for mobile menu
    (function() {
        let body = document.body;
        let mainNav = body.querySelector("#main-nav");

        let mainElements = [body, mainNav];

        let mainMenu = body.querySelector(".main-menu");
        let buttonsCont = body.querySelector(".f-main-header > div:last-child");

        let navElements = body.querySelectorAll(".main-menu > li");

        let openingMenuBtn = body.querySelector(".opening-m-btn");

        let menuIsOpen;

        // Change main styles for mobile menu
        openingMenuBtn.addEventListener("click", event => {
            menuIsOpen = body.classList.toggle("opend-mobile-menu");
            mainNav.classList.toggle("opend-mobile-menu");

            openingMenuBtn.style.transform = "translateX(500%)";

            setTimeout(() => {
                openingMenuBtn.dataset.isToggled = menuIsOpen;
                openingMenuBtn.style.transform = "";
            }, 200);
        });

        // Change inner styles for mobile menu elements
        openingMenuBtn.addEventListener("click", event => {
            mainMenu.dataset.isHidden = !menuIsOpen;
            buttonsCont.dataset.isHidden = !menuIsOpen;

            setTimeout(() => {
                navElements.forEach(liElement => {
                    liElement.dataset.isHidden = !menuIsOpen;
                });
            }, 100);
        });

        const mediaFor_1024px = window.matchMedia("(min-width: 64em)");

        let actionForQuery = event => mainElements.forEach(htmlEl => {
            if (event.matches)
                htmlEl.classList.remove("opend-mobile-menu");
            else
                htmlEl.classList.add("opend-mobile-menu");
        });

        openingMenuBtn.addEventListener("click", event => {
            if (menuIsOpen)
                mediaFor_1024px.addEventListener("change", actionForQuery);
            else
                mediaFor_1024px.removeEventListener("change", actionForQuery);
        })
    })();

    // Move user to plans contanier
    (function() {
        let getStartedBtn = document.querySelector(".main-button");
        let planBlockHeader = document.querySelector(".plans-wrapper h2");


        getStartedBtn.addEventListener("click", event => {
            window.scrollTo(0, planBlockHeader.offsetTop);
        });
    })();

    // Hidden or visible footer inner lists
    (function() {
        let footerHeaders = document.querySelectorAll(".footer-h");

        footerHeaders.forEach(header => {
            header.addEventListener("click", event => {
                header.classList.toggle("is-open");
                header.nextElementSibling.classList.toggle("is-open");
            });
        });
    })();

    // The fixing menu on the to of page without css animation

    (function() {
        let mainNav = document.querySelector("#main-nav");
        let mainHeader = mainNav.closest("header");

        let getStartedBtn = document.querySelector(".main-button");

        window.addEventListener("scroll", event => {
            let isScrolled = mainNav.classList.contains("is-scrolled");

            if (window.pageYOffset > getStartedBtn.offsetTop && !isScrolled) {
                mainHeader.style.height = mainNav.clientHeight + "px";
                mainNav.classList.add("is-scrolled");
            } else if (window.pageYOffset <= getStartedBtn.offsetTop && isScrolled) {
                mainHeader.style.height = "";
                mainNav.classList.remove("is-scrolled");
            }
        });
    })();

})();