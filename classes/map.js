/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*jslint node: true, browser: true */
"use strict";

function Map(id, user_cb) {
    this.googleMap = new google.maps.Map(document.getElementById(id), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 12
    });
    this.user_callback = user_cb;
    this.path = null;
    this.position = "";
    this.marker = new google.maps.Marker({
            icon: '../images/bluecircle.png',
            map: this.googleMap
    });
    this.is_centered = false;
    
    //it is necessary to do this. Otherwise, we would not have the map object in the intervall function
    var that=this;
    setInterval(function () {
        that.updatePosition();
    }, 500);
}

Map.prototype.addUser = function (position, user_name, user_id) {
    var userMarker = new google.maps.Marker({
        position: position,
        map: this.googleMap,
        title: user_name
    });
    var _this = this;

    userMarker.addListener('click', function () {
        _this.user_callback(user_id);
    });
};


Map.prototype.startPath = function (position) {
    //Longitude is left / rigt
    this.path = new google.maps.Polyline({
        path: [new google.maps.LatLng(position.coords.latitude, position.coords.longitude)],
        geodesic: false,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
        map: this.googleMap
    });
};


Map.prototype.addToPath = function (position) {
    this.path.getPath().push(position);
};

//TODO: Use googles location Api
Map.prototype.updatePosition = function () {
    var that = this,
        options = {enableHighAccuracy: true,
                   timeout: 900};
    //Get the current Position
    navigator.geolocation.getCurrentPosition(function (position) {     
        //generate a position that is close to the current position
        //(Reminder: Longitude is left / rigt)
        that.position = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        that.marker.setPosition(that.position);
        if (!that.is_centered) {
            that.is_centered = true;
            that.googleMap.setCenter(that.position);
        }
            
    }, function () {
        console.log("no location found");
    },options);
};