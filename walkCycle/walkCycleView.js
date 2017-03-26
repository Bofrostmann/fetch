/* 
 * © 2017-03: Florian Haimerl
 */

function WalkCycleView() {
    var topInfo_div = document.getElementById("top_info");
    var mode = null;
    var getDogCb = null;


    var setTopInfoContent = function (name) {
        topInfo_div.textContent = name;
    };

    this.setMode = function (mode) {
        mode = mode;
        setTopInfoContent(getDogCb());  
    };

    this.setGetDogCallback = function(cb_function) {
        getDogCb = cb_function;
    };

}
