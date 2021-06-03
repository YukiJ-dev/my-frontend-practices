"use strict";

// For all actions on page
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

        // choose blog card action 
        (function() {
            let blogContainer = document.getElementById("blog-container");

            let innerCards = blogContainer.querySelectorAll(".blog-card");


            // set event for add styles to choosed blog card
            innerCards.forEach(card => {
                card.addEventListener("click", event => {
                    if (card.dataset.isChoosed != "true") {
                        blogContainer.dataset.gridStructure = card.dataset.cardPosition;

                        innerCards.forEach(blogCard => blogCard.dataset.isChoosed = "false");
                        card.dataset.isChoosed = "true";
                    }

                    event.stopPropagation();
                });
            });

            // set center position when user taped in empty place
            document.addEventListener("click", event => {
                if (blogContainer.dataset.gridStructure != "center") {
                    blogContainer.dataset.gridStructure = "center";

                    innerCards.forEach(blogCard => {
                        blogCard.dataset.isChoosed = (blogCard.dataset.cardPosition === "center") ? "true" : "false";
                    });
                }
            });
        })();

        // show popup with customer comments
        (function() {

            // Creates popup window

            function createPopupDialog() {
                // create dom elements
                let dialogWindow = document.createElement("div");
                let dialogHeader = document.createElement("span");
                let messageHeader = document.createElement("span");
                let messageParagraph = document.createElement("p");
                let closeButton = document.createElement("button");
                let closeButtonImage = document.createElement("img");

                // dialog window
                dialogWindow.className = "customer-comment-dialog";
                dialogWindow.dataset.direction = "right";

                // header of dialog
                dialogHeader.className = "main-info";
                dialogHeader.classList.add("block-sp");
                dialogHeader.setAttribute("id", "dialog-header");

                // header of message
                messageHeader.className = "message-header";
                messageHeader.classList.add("block-sp", "bold");
                messageHeader.setAttribute("id", "message-header");

                // close button
                closeButton.className = "close-dialog-btn";
                closeButton.addEventListener("click", event => dialogWindow.remove());

                //close button image
                closeButtonImage.setAttribute("arria-hidden", "true");
                closeButtonImage.setAttribute("src", "resources/images/bitcoin.svg");
                closeButtonImage.setAttribute("alt", "");

                // message paragraph
                messageParagraph.setAttribute("id", "message-p");

                closeButton.append(closeButtonImage);

                dialogWindow.append(dialogHeader);
                dialogWindow.append(messageHeader);
                dialogWindow.append(messageParagraph);
                dialogWindow.append(closeButton);


                return dialogWindow;
            }

            function fillDataFromCustomerMessage(dialogWindow, avatarData) {
                // set text for dialog header 
                let headerOfDialog = dialogWindow.querySelector("#dialog-header");
                headerOfDialog.textContent = upperCasedFirstLetter(avatarData.name) + " from " + upperCasedFirstLetter(avatarData.cauntry);

                // remove old stars
                dialogWindow.querySelectorAll("svg").forEach(star => star.remove());

                // set count of stars
                makeStartsForComment(avatarData.starsCount).forEach(star => headerOfDialog.after(star));

                // set message header
                let headerOfMessage = dialogWindow.querySelector("#message-header");
                headerOfMessage.textContent = upperCasedFirstLetter(avatarData.messageHeader);

                // set message text
                let messageParagraph = dialogWindow.querySelector("#message-p");
                messageParagraph.textContent = upperCasedFirstLetter(avatarData.messageText);

                return dialogWindow;
            }

            // make svg with count of stars
            function makeStartsForComment(count) {
                let stars = [];
                for (let i = 0; i < count; i++) {
                    const svgns = "http://www.w3.org/2000/svg";
                    const starIcon = document.createElementNS(svgns, "svg");
                    const starPath = document.createElementNS(svgns, "path");
                    const defs = document.createElementNS(svgns, "defs");
                    const linearGradient = document.createElementNS(svgns, "linearGradient");
                    const firstStop = document.createElementNS(svgns, "stop");
                    const lastStop = document.createElementNS(svgns, "stop");

                    // main svg attributes
                    starIcon.setAttribute("width", "13");
                    starIcon.setAttribute("height", "12");
                    starIcon.setAttribute("viewBox", "0 0 13 12");
                    starIcon.setAttribute("fill", "none");

                    // path attributes
                    starPath.setAttribute("d", "M6.01199 10.9408L3.81199 11.8408C3.31199 12.0408 2.71199 11.8408 2.51199 11.3408C2.41199 11.1408 2.41199 11.0408 2.41199 10.8408L2.61199 8.44082C2.61199 8.14082 2.51199 7.94082 2.41199 7.74082L0.811988 5.94082C0.511988 5.54082 0.511988 4.84082 0.911988 4.54082C1.11199 4.44082 1.21199 4.34082 1.41199 4.34082L3.71199 3.84082C4.01199 3.74082 4.21199 3.64082 4.31199 3.34082L5.51199 1.34082C5.81199 0.84082 6.41199 0.74082 6.91199 1.04082C7.01199 1.14082 7.21199 1.24082 7.21199 1.34082L8.41199 3.34082C8.51199 3.54082 8.81199 3.74082 9.01199 3.84082L11.412 4.34082C11.912 4.44082 12.312 5.04082 12.112 5.54082C12.112 5.74082 12.012 5.84082 11.912 5.94082L10.412 7.74082C10.212 7.94082 10.112 8.24082 10.212 8.44082L10.412 10.8408C10.412 11.4408 10.012 11.8408 9.51199 11.9408C9.31199 11.9408 9.21199 11.9408 9.01199 11.8408L6.81199 10.9408C6.51199 10.8408 6.31199 10.8408 6.01199 10.9408Z");
                    starPath.setAttribute("fill", "url(#paint0_linear)");

                    // gradient attributes
                    linearGradient.setAttribute("id", "paint0_linear");
                    linearGradient.setAttribute("x1", "6.95969");
                    linearGradient.setAttribute("y1", "-0.870233");
                    linearGradient.setAttribute("x2", "7.55735");
                    linearGradient.setAttribute("y2", "18.7395");
                    linearGradient.setAttribute("gradientUnits", "userSpaceOnUse");

                    // stops attributes
                    firstStop.setAttribute("stop-color", "#FD749B");
                    lastStop.setAttribute("offset", "1");
                    lastStop.setAttribute("stop-color", "#281AC8");

                    linearGradient.append(firstStop, lastStop);
                    defs.append(linearGradient);
                    starIcon.append(starPath, defs);
                    stars[i] = starIcon;
                }

                return stars;
            }

            // make text with first upper cased letter
            function upperCasedFirstLetter(text) {
                return text[0].toUpperCase() + text.slice(1, text.length).toLowerCase();
            }

            // data for customer comments   
            let datasArray = [{
                    name: "ivan",
                    cauntry: "pillipines",
                    starsCount: 5,
                    messageHeader: "Morbi vitae elit risus",
                    messageText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                },

                {
                    name: "dima",
                    cauntry: "nigeria",
                    starsCount: 5,
                    messageHeader: "Morbi vitae elit risus",
                    messageText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                },

                {
                    name: "anton",
                    cauntry: "nigeria",
                    starsCount: 4,
                    messageHeader: "Morbi vitae elit risus",
                    messageText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                },

                {
                    name: "tany",
                    cauntry: "nigeria",
                    starsCount: 4,
                    messageHeader: "Morbi vitae elit risus",
                    messageText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                },

                {
                    name: "olia",
                    cauntry: "ukraine",
                    starsCount: 5,
                    messageHeader: "Morbi vitae elit risus",
                    messageText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                },

                {
                    name: "inna",
                    cauntry: "nigeria",
                    starsCount: 5,
                    messageHeader: "Morbi vitae elit risus",
                    messageText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                },

                {
                    name: "sasha",
                    cauntry: "russia",
                    starsCount: 2,
                    messageHeader: "Morbi vitae elit risus",
                    messageText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                },

                {
                    name: "yura",
                    cauntry: "moldova",
                    starsCount: 3,
                    messageHeader: "Morbi vitae elit risus",
                    messageText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                },

                {
                    name: "kolya",
                    cauntry: "nigeria",
                    starsCount: 1,
                    messageHeader: "Morbi vitae elit risus",
                    messageText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                },

                {
                    name: "irra",
                    cauntry: "china",
                    starsCount: 5,
                    messageHeader: "Morbi vitae elit risus",
                    messageText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                },

                {
                    name: "cammar",
                    cauntry: "nigeria",
                    starsCount: 2,
                    messageHeader: "Morbi vitae elit risus",
                    messageText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                },

                {
                    name: "joba",
                    cauntry: "australia",
                    starsCount: 5,
                    messageHeader: "Morbi vitae elit risus",
                    messageText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                },

                {
                    name: "opana",
                    cauntry: "gernamy",
                    starsCount: 4,
                    messageHeader: "Morbi vitae elit risus",
                    messageText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                }
            ];

            // get all dom elements for placing popup
            let avatarsWrapper = document.getElementById("avatars-wrapper");
            let customersSvg = avatarsWrapper.querySelector("#customer-avatars");
            let avatars = customersSvg.querySelectorAll("path");

            // fill map with info for each customer
            let avatarDatas = new Map();
            for (let i = 0; i < avatars.length; i++) {
                avatarDatas.set(avatars[i], datasArray[i]);
            }

            // dialog window for customer comment
            let dialogWindow = createPopupDialog();

            // fill and initialize window in his start position
            function initializeStartWindow(avatar) {
                fillDataFromCustomerMessage(dialogWindow, avatarDatas.get(avatar));

                // redirect dialog window to initial position of container
                dialogWindow.style.cssText = "top: 0px; left 0px;";
                // reset default property for arrow
                dialogWindow.dataset.direction = "right";
            }

            // paint dialog window in screen
            function paintDialogWindow(avatar) {
                initializeStartWindow(avatar);

                // dimensions for outer container and current avatar path of svg
                const wrapperRect = avatarsWrapper.getBoundingClientRect();
                const avatarRect = avatar.getBoundingClientRect();

                const avatarPosX = avatarRect.right - wrapperRect.x;
                const avatarPosY = avatarRect.bottom - wrapperRect.y;

                // get left arrow width from dialog window 
                const arrowWidth = parseFloat(window.getComputedStyle(dialogWindow, "::before").borderRightWidth);

                // some addition space from bubble to dialog window
                const spaceBetweenBubbleAndDialog = 10;

                //last part of function, that defines place of dialog window
                (function() {
                    let dialogPosX = avatarPosX + spaceBetweenBubbleAndDialog + arrowWidth;
                    let dialogPosY = avatarPosY - (avatarRect.height / 2) - (dialogWindow.offsetHeight / 2);

                    // check that window can be placed at right hand of the avatar 
                    if ((avatarsWrapper.offsetWidth - dialogPosX) < dialogWindow.offsetWidth) {
                        // defines x position from left hand of avatar
                        const avatarPosLeft = avatarRect.left - wrapperRect.x;

                        // postion in left hand of the avatar
                        dialogPosX = avatarPosLeft - spaceBetweenBubbleAndDialog - arrowWidth - dialogWindow.offsetWidth;

                        // set place for arrow on dialog window
                        dialogWindow.dataset.direction = "left";
                    }

                    // set correct coodrinates for dialog window
                    dialogWindow.style.left = `${dialogPosX}px`;
                    dialogWindow.style.top = `${dialogPosY}px`;
                })();

            }

            // avatar that was used as last
            let lastChoosedAvatar = null;

            let lastWidthOfWindow = 0;

            function isTaged(obj, tagName) {
                return obj.tagName.toLowerCase() === tagName.toLowerCase();
            }

            avatarsWrapper.addEventListener("mouseover", event => {
                let targetObj = event.target;

                if (!isTaged(targetObj, "path"))
                    return;

                lastChoosedAvatar = targetObj;

                avatarsWrapper.append(dialogWindow);
                paintDialogWindow(targetObj);
                dialogWindow.classList.add("active");
                lastWidthOfWindow = dialogWindow.getBoundingClientRect().width;
            });

            avatarsWrapper.addEventListener("mouseout", event => {

                if (!isTaged(event.target, "path"))
                    return;

                dialogWindow.classList.remove("active");
                dialogWindow.remove();
            });

            // check when the container will be resized and change coordinates
            const resizeObserver = new ResizeObserver(entries => {
                if (avatarsWrapper.contains(dialogWindow))
                    paintDialogWindow(lastChoosedAvatar);
            });

            resizeObserver.observe(avatarsWrapper);

            // when user changed font size for all page dialog repaint
            const dialogWindowObserver = new ResizeObserver(entries => {
                let newWidthOfDialog = entries[0].borderBoxSize[0].inlineSize;

                if (newWidthOfDialog != 0 && newWidthOfDialog != lastWidthOfWindow) {
                    paintDialogWindow(lastChoosedAvatar);
                    lastWidthOfWindow = newWidthOfDialog;
                }

            });

            dialogWindowObserver.observe(dialogWindow);
        })();


        // mobile action for avatar comments
        (function() {

            let commentWrapper = document.getElementById("mob-comment-wrapper");
            let cardWrappers = commentWrapper.querySelectorAll(".comment-card-wrapper");
            let commentBubbles = commentWrapper.querySelectorAll(".comment-card-wrapper>svg");

            let firstBubble = 0;
            commentBubbles.forEach(bubble => {
                // parent wrapper for bubble and comment card
                let cardWrapper = cardWrappers[firstBubble++];
                // comment card next to bubble
                let commentCard = bubble.nextElementSibling;

                bubble.addEventListener("mouseenter", event => {
                    commentCard.classList.add("shown");
                    bubble.classList.add("shown");
                });

                // event for close comment button
                commentCard.querySelector("button").addEventListener("click", event => {
                    commentCard.classList.remove("shown");
                    bubble.classList.remove("shown");
                });

                cardWrapper.addEventListener("mouseleave", event => {
                    commentCard.classList.add("closing");
                    setTimeout(() => commentCard.classList.remove("closing"), 300);

                    commentCard.classList.remove("shown");
                    bubble.classList.remove("shown");
                });
            });
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