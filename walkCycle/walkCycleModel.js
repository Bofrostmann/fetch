/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*jslint node: true, browser: true */
/*global google*/
"use strict";


function WalkCycleModel() {
    this.role= '';
    this.dog = {name: "Fido"}; //TODO: just a placeholder
    this.map = new Map('map_div', this.onUserClick);
    this.init();    
}


WalkCycleModel.prototype.init = function () {
    var that = this;
    this.role = getUrlParameter('role');    
};

WalkCycleModel.prototype.getNameOfDog = function() {
    return this.dog.name;
};

WalkCycleModel.prototype.onUserClick = function (id) {
    window.alert(id);
    
};


// Internal
var getUrlParameter = function (name) {
    var argument_strings = window.location.href.split('?')[1].split('&');
    for (var i = 0; i < argument_strings.length; i++) {
        var argument_split = argument_strings[i].split('=');
        if( argument_split.length > 1 && argument_split[0] === name) {
            return argument_split[1];
        }
    }
    return '';
};