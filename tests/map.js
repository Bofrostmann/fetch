/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*jslint node: true, browser: true */
"use strict";

function Map(id) {
    this.googleMap = new google.maps.Map(document.getElementById(id), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 12
    });
}

Map.prototype.setCurrentLocation = function () {
    var map = this.googleMap;
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            
            var myLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(myLatLng);
            var userMarker = new google.maps.Marker({
                position: myLatLng,
                map: map
            });
            
            
            
        }, function () {
            handleLocationError(true, infoWindow, this.googleMap.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        infoWindow.setPosition(this.googleMap.getCenter());
        infoWindow.setContent(false ?
                'Error: The Geolocation service failed.' :
                'Error: Your browser doesn\'t support geolocation.');
    }
};


Map.prototype.init = function () {
};


