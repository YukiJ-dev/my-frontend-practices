"use strict";

// actions for show dialog windows
document.addEventListener("DOMContentLoaded", event => {
    (function() {
        // initialize plain popups objects

        // constructor for popup obj
        function PopupWindow(domElement, parent) {
            return {
                domElement,
                parent,
            };
        };

        // parent windows
        let bitcoinSalesPopup = new PopupWindow(document.getElementById("bitcoin-sales"), null);
        let giftCardSales = new PopupWindow(document.getElementById("giftcard-sales"), null);

        const allSitePopups = new Map();
        // initialize all objects for all popups
        // parent popups
        allSitePopups.set("bitcoin-sales", bitcoinSalesPopup);
        allSitePopups.set("giftcard-sales", giftCardSales);

        // without parents
        allSitePopups.set("login-popup", new PopupWindow(document.getElementById("login-popup"), null));
        allSitePopups.set("registration-popup", new PopupWindow(document.getElementById("registration-popup"), null));

        // showed from other popups

        // from bitcoin sales
        allSitePopups.set("sale-bitcoin", new PopupWindow(document.getElementById("sale-bitcoin"), bitcoinSalesPopup));
        allSitePopups.set("sale-ethereum", new PopupWindow(document.getElementById("sale-ethereum"), bitcoinSalesPopup));

        // from gift card sales
        allSitePopups.set("sale-amazon-card", new PopupWindow(document.getElementById("sale-amazon-card"), giftCardSales));
        allSitePopups.set("sale-app-store-iTunes-card", new PopupWindow(document.getElementById("sale-app-store-iTunes-card"), giftCardSales));
        allSitePopups.set("sale-steam-card", new PopupWindow(document.getElementById("sale-steam-card"), giftCardSales));
        allSitePopups.set("sale-google-play-card", new PopupWindow(document.getElementById("sale-google-play-card"), giftCardSales));
        allSitePopups.set("sale-other-cards", new PopupWindow(document.getElementById("sale-other-cards"), giftCardSales));



        // the logic of work with popups
        (function() {
            let currentUsedPopup = null;
            // check state of popup and then show him

            function activatePopup(popup) {
                // hide or show popup window
                if (popup.domElement.hidden = !popup.domElement.hidden) {
                    document.body.classList.remove("modal-active");

                    currentUsedPopup = null;
                    // check that popup has a parent or not
                    let parentPopup = popup.parent;

                    if (parentPopup)
                        activatePopup(parentPopup);
                } else {
                    // when the user trying to open new popup over the old
                    // check that now it isn't parent popup
                    if (currentUsedPopup !== null && (popup !== currentUsedPopup.parent)) {
                        activatePopup(currentUsedPopup);
                    }


                    currentUsedPopup = popup;
                    document.body.classList.add("modal-active");
                }
            }


            // function for show and hide popups

            // show some popup window
            document.addEventListener("click", event => {
                let idOfThePopup = event.target.dataset.shownPopup;
                if (idOfThePopup) {
                    activatePopup(allSitePopups.get(idOfThePopup));
                }
            });

            // event for closing popup when user taped on close btn in ther top-right corner of him
            document.addEventListener("click", event => {
                if (event.target.dataset.action === "closeWindow") {
                    activatePopup(currentUsedPopup);
                }
            });


            // hide when user tap in the empty place at the screen
            document.addEventListener("click", event => {
                if (event.target.closest(".modal-window-wrapper")) {
                    // when user taped isn't in the modal window

                    if (currentUsedPopup && !event.target.closest(".modal-window")) {
                        activatePopup(currentUsedPopup);
                    }
                }
            });

            // show login and registration window
            (function() {
                // actions for popup header sub menu
                (function() {
                    let mainSallesWrapper = document.getElementById("sales-wrapper");
                    let toggleBtn = mainSallesWrapper.querySelector(".submenu-btn");
                    let subMenuWrapper = mainSallesWrapper.querySelector(".sales-submenu-wrapper");

                    mainSallesWrapper.addEventListener("click", event => {
                        // get clicked element 
                        switch (event.target.dataset.action) {
                            case "showsalles":
                                // for palacing popup in center of small arrow in togled btn
                                const downArrowStyles = window.getComputedStyle(toggleBtn, "::after");
                                const topArrowRect = subMenuWrapper.firstElementChild.getBoundingClientRect();
                                const arrowLeftSpace = topArrowRect.x - subMenuWrapper.getBoundingClientRect().x;

                                const xInfelicity = ((parseFloat(downArrowStyles.width) + topArrowRect.width) / 2) + arrowLeftSpace;

                                if (toggleBtn.classList.toggle("opend-submenu")) {
                                    let x = toggleBtn.getBoundingClientRect().right - mainSallesWrapper.getBoundingClientRect().x;
                                    let y = mainSallesWrapper.offsetHeight + window.pageYOffset;

                                    subMenuWrapper.style.cssText = `left: ${x - xInfelicity}px; top: ${y}px;`;
                                } else {
                                    subMenuWrapper.style.cssText = " ";
                                }
                                break;
                            case "showlogin":
                                activatePopup(allSitePopups.get("login-popup"));
                                break;

                        }
                    });

                    document.addEventListener("click", event => {
                        if (event.target !== toggleBtn && toggleBtn.classList.contains("opend-submenu"))
                            toggleBtn.classList.remove("opend-submenu");
                    });

                    // when user will change a font size 
                    const checkToggleDimensions = new ResizeObserver(entries => {
                        if (toggleBtn.classList.contains("opend-submenu"))
                            toggleBtn.classList.remove("opend-submenu");
                    });

                    checkToggleDimensions.observe(toggleBtn);
                })();
            })();

            // logic for selectors
            (function() {
                let currentSelector = {
                    targetBtn: null,
                    list: null,
                    event: null,
                    lastSelected: null,

                    enableList() {
                        let options = this.list.querySelectorAll("button");
                        // set last selected elment from options
                        this.lastSelected = Array.from(options).find(item => item.dataset.isSelected === "true");

                        this.list.addEventListener("click", this.event = event => {
                            console.log("event work");
                            let currentOption = event.target;

                            // check that click was in the correct place (on option from list)
                            if (currentOption.closest("button")) {
                                event.preventDefault();

                                if (currentOption.dataset.isSelected !== "true") {
                                    this.targetBtn.textContent = currentOption.textContent;

                                    if (this.lastSelected)
                                        this.lastSelected.dataset.isSelected = "false";

                                    this.lastSelected = currentOption;
                                    this.lastSelected.dataset.isSelected = "true";
                                }
                            }
                        });
                    },

                    // disable all list properties
                    disableList() {
                        this.targetBtn = null;
                        this.lastSelected = null;
                        this.list.removeEventListener("click", this.event);
                        this.list = null;
                        this.event = null;
                    },

                    hideIfShown() {
                        if (this.targetBtn.classList.contains("shown")) {
                            this.targetBtn.classList.remove("shown");
                            this.list.classList.remove("shown");
                        }
                    }
                };

                // for closing
                document.addEventListener("click", event => {
                    let currentTarget = event.target;

                    if (currentSelector.targetBtn && (currentTarget !== currentSelector.targetBtn)) {
                        currentSelector.hideIfShown();

                        // if taping isn't in inner list, disable whole selector
                        if (!currentSelector.list.contains(currentTarget))
                            currentSelector.disableList();
                    }
                });

                // for opening
                document.addEventListener("click", event => {
                    let targetBtn = event.target;
                    // if element is selector
                    if (targetBtn.dataset.showList != undefined) {
                        let shownList = targetBtn.nextElementSibling;

                        shownList.classList.toggle("shown");
                        targetBtn.classList.toggle("shown");

                        if (targetBtn !== currentSelector.targetBtn) {
                            currentSelector.targetBtn = targetBtn;
                            currentSelector.list = shownList;
                            currentSelector.enableList();
                        }

                        event.preventDefault();
                    }
                });
            })();
        })();
    })();
});