/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*jslint node: true, browser: true */
/*global WalkCycleModel*/
/*global WalkCycleView*/
"use strict";

function WalkCycleController() {
}

WalkCycleController.prototype.init = function () {
    var view = new WalkCycleView(),
        model = new WalkCycleModel();
    view.setTopInfoContent(model.getNameOfDog());
};


var controller = new WalkCycleController();
window.addEventListener("load", controller.init);