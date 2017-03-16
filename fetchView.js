/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/*jslint node: true, browser: true */
"use strict";

function FetchView() {
    var owner_overlay = document.getElementById("owner_overlay"),
        walker_overlay = document.getElementById("walker_overlay"),
        selection_overlay = document.getElementById("selection_overlay");
    this.init = function () {
        document.getElementById("owner_button").addEventListener("click", function () {
            owner_overlay.classList.remove("hidden");
            selection_overlay.classList.add("hidden");
        });
        document.getElementById("walker_button").addEventListener("click", function () {
            walker_overlay.classList.remove("hidden");
            selection_overlay.classList.add("hidden");
        });
    };
}