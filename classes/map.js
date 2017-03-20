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
}

Map.prototype.setCurrentLocation = function () {
    var map = this.googleMap;
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {     
            //Longitude is left / rigt
            var myLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(myLatLng);
            var userMarker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                icon: '../images/bluecircle.png'
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
    console.log("test");
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

