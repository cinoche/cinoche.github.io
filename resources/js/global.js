var version = "1.0.3";
var project = "Project location: <a href=\"https://github.com/cinoche/cinoche.github.io\">https://github.com/cinoche/cinoche.github.io</a>";
var w = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

var h = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;

var x = navigator.userAgent;
var url = window.location.href;

document.getElementById("resolution").innerHTML = "Browser inner window width: " + w + ", height: " + h + ".";
document.getElementById("agent").innerHTML = "User-agent header sent: " + x;
document.getElementById("version").innerHTML = "Cinoche version: " + version;
document.getElementById("project").innerHTML = project;

// Test if screes resolution is larger than 1130. Tesla full screen resolution is reported as w: 1111 h: 694
// Tesla browser when not in full screen is reported as 1130 as of 2021.4.x release
//if (w >= 1130 && x.includes("Tesla")) {
if (w >= 1130) {
    divOverlay('fullscreen')
    //document.getElementById("fullscreen").style.display = "inline";
    // Test if this is running on a Tesla. If so show the fullscreen button when not in fullscreen only
    if (x.includes("Tesla")) {
        // Simulate an HTTP redirect:
        //	window.location.replace("https://www.youtube.com/redirect?q=" + url + "/");
        // Change image property fron none to inline so it is displayed
        //document.getElementById("agent").innerHTML = "Running in a Tesla Browser";
        //	document.getElementById("img1").style.display = "inline";
    }
    else {
        //document.getElementById("agent").innerHTML = "Running in a Generic Browser";
    }
}

function divDisplayToggle(name) {
    var x = document.getElementById(name);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function divDisplayOff(name) {
    var x = document.getElementById(name);
    if (x.style.display === "block") {
        x.style.display = "none";
    }
}

function divOverlay(name) {
    divDisplayToggle('overlay');
    divDisplayToggle(name);
}

function divDisplayAllOff() {
    divDisplayOff('overlay');
    divDisplayOff('fullscreen');
    divDisplayOff('myURL');
    divDisplayOff('info');
}

function navigate(event) {
    if (event.keyCode == 13) {
        var url = document.getElementById("myURLText");
        window.location.href = decodeURIComponent(url.value);
    }
}

function navigateOK() {
    var url = document.getElementById("myURLText");
    window.location.href = decodeURIComponent(url.value);
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

function getUrlParam(parameter, defaultvalue) {
    var urlparameter = defaultvalue;
    if (window.location.href.indexOf(parameter) > -1) {
        urlparameter = getUrlVars()[parameter];
    }
    return urlparameter;
}

// Add the ability to set the default URL value to an externally provided URL variable like:
//
// https://cinoche.github.io/?url=http://some.url.com
//
// otherwise the default will remain: http://
//
var reveivedURL = getUrlParam('url', 'Empty');

// alert(reveivedURL);
if (!(reveivedURL === 'Empty')) {
    //alert("Setting URL: " + reveivedURL);
    const urlDefaultValue = document.getElementById("myURLText");
    // setting the value
    urlDefaultValue.value = decodeURIComponent(reveivedURL);
}