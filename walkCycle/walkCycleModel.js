/* 
 * © 2017-03: Florian Haimerl
 */

/*jslint node: true, browser: true */
/*global google*/
"use strict";
var getUrlParameter = function (name) {
    var argument_strings = window.location.href.split('?')[1].split('&');
    for (var i = 0; i < argument_strings.length; i++) {
        var argument_split = argument_strings[i].split('=');
        if (argument_split.length > 1 && argument_split[0] === name) {
            return argument_split[1];
        }
    }
    return '';
};

function WalkCycleModel() {
    var role = getUrlParameter('role'), //walker | owner
        map = new Map('map_div'),
        dog = null, //TODO: just a placeholder
        setModeCallback = null,
        mode = "",
        max_target_distance = 10; //in metres

    this.init = function () {
        dog = {name: "Fido",
            position: map.getPosition()};
        dog.position = new google.maps.LatLng(dog.position.lat(), dog.position.lng() + 0.01);
        map.addMarker(dog.position, dog.name, 1, true);
        map.setMarkerClickCallback(this.onMarkerClick);
    };

    this.PositionIsSet = function () {
        if (map.getPosition()) {
            return true;
        }
        return false;
    };

    this.setSetModeCallback = function (cb_function) {
        setModeCallback = cb_function;
    };

    this.setMode = function (m) {
        var that = this;
        mode = m;
        switch (mode) {
        case 'pick_up':
            if (role === 'walker') {
                map.setPositionUpdateCallback(function () {
                    if (map.getDistanceToTarget() <= max_target_distance) {
                        window.alert('reached target! Start walk:');
                        that.setMode('walk');
                    }
                });
            } else {
                //TODO
            }
            break;
        case 'walk':
            map.updatePath();
            map.setPositionUpdateCallback(function () {
                map.updatePath();
                console.log(map.getLengthOfPathInM());
            });
            break;
        case 'return':
            break;
        default:

            break;
        }
        setModeCallback(mode);
    };


    this.getDog = function () {
        return dog;
    };

    this.onMarkerClick = function (id) {
        window.alert(id);
    };
}
