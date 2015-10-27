﻿var serverURL = "http://webprogrammingassignment7.azurewebsites.net/mario";

var marioActions = [
    "walk", "jump", "wait", "run"
];

var DEFAULT_BCKGD_COLOR = '#0F242A';
var DEFAULT_BOX_SHADOW = '0px 2px 5px 2px rgba(0, 0, 0, 0.4)';
var CENTER = 'center';
var MIDDLE = 'middle';
var RUN_IMG_URL = 'Images/mario_running.gif', WALK_IMG_URL = 'Images/mario_walking.gif';

var leftVal = 0;


function applyMarioAction(imageTitle, movementAmt, transitionStr) {
    var mario = document.getElementById('mario');
    var mImg = document.getElementById('mario-image');
    mImg.setAttribute('src', imageTitle);
    
    if (imageTitle == null || movementAmt == null) {
        return;
    } if (mario.style.left != 0 && mario.style.left.length >= 3) {
        leftVal += leftVal += parseInt(mario.style.left.substr(0, leftVal.length - 2));
    }

    var tmp = leftVal + movementAmt;
    mario.style.transition = transitionStr;
    mario.style.left = tmp + 'px';
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
    mario.setAttribute('src', 'Images/mario_standing.png');
}


function startGame() {
    moveMario();
}


function runAction() {
    applyMarioAction(RUN_IMG_URL, 160, '0.25s linear');
}


function walkAction() {
    applyMarioAction(WALK_IMG_URL, 100, '0.75s linear');
}
