// ==UserScript==
// @name        Hackerbear
// @namespace   Violentmonkey Scripts
// @match       https://explore.gethopscotch.com/c/*
// @match       https://explore.gethopscotch.com/u/*
// @grant       none
// @version     1.0
// @author      Rawrbear
// @description 3/21/2024, 2:07:51 PM
// ==/UserScript==

// Add stylesheet
// https://github.com/greasemonkey/gm4-polyfill/blob/master/gm4-polyfill.js#L33
this.GM_addStyle = (aCss) => {
  'use strict';
  let head = document.getElementsByTagName('head')[0];
  if (head) {
    let style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.textContent = aCss;
    head.appendChild(style);
    return style;
  }
  return null;
};

let styleElement = GM_addStyle(`
.hackerbear-project-div {
        margin-top: 3px;
        padding-left: 15px;
        display: flex;
        flex-flow: row;
        justify-content: center;
}

.hackerbear-btn {
        background: none;
        color: gray;
        margin-right: 15px;
}

.hackerbear-btn sub {
        font-size: 12px;
}

.project-card hr {
        background-color: transparent;
        border: dashed 1px #ddd;
}
`);


// Download icons (hack)
const icons = [
  "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200",
  "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
]
icons.forEach(icon => {
  document.getElementsByTagName('head')[0].innerHTML = document.getElementsByTagName('head')[0].innerHTML + `<link rel="stylesheet" href=` + icon + ` />`;
});

// Observe any element in the DOM.
const observeDOM = (fn, e = document.documentElement, config = { attributes: 1, childList: 1, subtree: 0 }) => {
        const observer = new MutationObserver(fn);
        observer.observe(e, config);
        return () => observer.disconnect();
};

// When new projects are added to the project page...
observeDOM(() => {
        // Go through every project card on the page
        document.querySelectorAll('.project-card').forEach(card => {
                // If the hack hasn't been applied...
                if (!card.getElementsByClassName('hackerbear-project-div')[0]) {
                        // Resize the card
                        card.style.height = '454px';

                        // Make room for the icons
                        const hackerbearProjectDiv = document.createElement('div');
                        hackerbearProjectDiv.classList.add('hackerbear-project-div');

                        // The JSON v1 button
                        const downloadButtonV1 = document.createElement('a');
                        downloadButtonV1.href = "http://community.gethopscotch.com/api/v1/projects/" + card.id;
                        downloadButtonV1.role="button";
                        downloadButtonV1.alt="View project JSON";
                        downloadButtonV1.setAttribute('target', '_blank');
                        downloadButtonV1.classList.add('hackerbear-btn');
                        downloadButtonV1.innerHTML = `<span class="material-symbols-outlined">data_object</span><sub>v1</sub>`;

                        // The JSON v2 button
                        const downloadButtonV2 = document.createElement('a');
                        downloadButtonV2.href = "http://community.gethopscotch.com/api/v2/projects/" + card.id;
                        downloadButtonV2.role="button";
                        downloadButtonV2.alt="View project JSON";
                        downloadButtonV2.setAttribute('target', '_blank');
                        downloadButtonV2.classList.add('hackerbear-btn');
                        downloadButtonV2.innerHTML = `<span class="material-symbols-outlined">data_object</span><sub>v2</sub>`;

                        const projectBuilderButton = document.createElement('a');
                        projectBuilderButton.href = "https://ae-hopscotch.github.io/hs-tools/hs-builder/";
                        projectBuilderButton.alt="Open Project Builder";
                        projectBuilderButton.setAttribute('target', '_blank');
                        projectBuilderButton.classList.add('hackerbear-btn');
                        projectBuilderButton.innerHTML = `<span class="material-symbols-outlined">precision_manufacturing</span>`;
                        projectBuilderButton.role="button";

                        // Add these buttons to the div
                        hackerbearProjectDiv.append(downloadButtonV1);
                        hackerbearProjectDiv.append(downloadButtonV2);
                        hackerbearProjectDiv.append(projectBuilderButton);
                        card.append(hackerbearProjectDiv);
                        card.insertBefore(document.createElement('hr'), hackerbearProjectDiv);
                }
        });
},
document.querySelector(".project-container"));
