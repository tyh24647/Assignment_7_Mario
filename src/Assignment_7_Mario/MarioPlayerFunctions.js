var serverURL = "http://webprogrammingassignment7.azurewebsites.net/mario";

var marioActions = [
    "walk", "jump", "wait", "run"
];

var DEFAULT_BCKGD_COLOR = '#0F242A';
var DEFAULT_BOX_SHADOW = '0px 2px 5px 2px rgba(0, 0, 0, 0.4)';
var CENTER = 'center';
var MIDDLE = 'middle';


function startGame() {
    moveMario();
}


function run() {
    var mario = document.getElementById('mario');
    var mImg = document.getElementById('mario-image');
    var leftVal = mario.style.left;

    if (mario.style.left == 0) {
        leftVal = 0 + 'px';
    } else {
        leftVal = leftVal.substr(0, leftVal.length - 2);
    }

    var tmp = leftVal + 160;

    mImg.setAttribute('src', 'Images/mario_running.gif');
    mario.style.left = tmp + 'px';
    mImg.style.left = tmp + 'px';
}


function walk() {
    var mario = document.getElementById('mario');
    var mImg = document.getElementById('mario-image');
    var leftVal = 0;

    if (mario.style.left != 0 && mario.style.left.length >= 3) {
        var tmpStr = mario.style.left;
        leftVal = parseInt(mario.style.left.substr(0, leftVal.length - 2));
    }

    var tmp = leftVal + 120;
    mImg.setAttribute('src', 'Images/mario_walking.gif');
    mario.style.left = tmp + 'px';
    mImg.style.left = tmp + 'px';
}


function moveMario() {
    $.ajax(serverURL + "/" + generateRandomAction(), {
        method: "GET",
        contentType: "application/json",
        success: handleDataChange
    });
}


function handleDataChange(data) {
    document.getElementById('result').innerHTML = JSON.stringify(data);
}


function generateRandomAction() {
    var rand = Math.floor(Math.random() * marioActions.length);
    
    if (serverURL[rand] == null) {
        print("ERROR: Invalid index.\nPlease ensure that the random index" +
            "was generated correctly in order to perform the requested action.");
        return;
    }

    return marioActions[rand];
}


function initSky() {
    gameBckgd.setAttribute('src', 'Images/sky.png');
}


function initMario() {
    var mario = document.getElementById('mario');
    mario.setAttribute('src', '/Images/mario_standing.png');
}
