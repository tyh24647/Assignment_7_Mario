var serverURL = 'http://localhost:57294/api/MarioLevel'

var marioActions = [
    "walk", "jump", "wait", "run"
];

var DEFAULT_BCKGD_COLOR = '#0F242A';
var DEFAULT_BOX_SHADOW = '0px 2px 5px 2px rgba(0, 0, 0, 0.4)';
var CENTER = 'center';
var MIDDLE = 'middle';
var RUN_IMG_URL = 'Images/mario_running.gif', WALK_IMG_URL = 'Images/mario_walking.gif';
var marioAction = 'wait';
var leftVal = 0;


function startGame() {
    moveMario();
}


function applyMarioAction(imageTitle, movementAmt, transitionStr, direction) {
    var mario = document.getElementById('mario');
    var mImg = document.getElementById('mario-image');
    mImg.setAttribute('src', imageTitle);
    
    if (imageTitle == null || movementAmt == null || (direction != 'left'
        && direction != 'right' && direction != 'top' && direction != 'bottom')) {
        return;
    } if (mario.style.left != 0 && mario.style.left.length >= 3) {
        leftVal += parseInt(mario.style.left.substr(0, leftVal.length - 2));
    }

    var tmp = leftVal + movementAmt;
    mario.style.transition = transitionStr;
    mario.style.left = tmp + 'px';
}


function moveMario() {
    marioAction = generateRandomAction();
    $.ajax(serverURL + "?marioAction=" + marioAction, {
        method: "GET",
        contentType: "application/json",
        success: handleDataChange
    });
}


function handleDataChange(data) {
    //if (marioAction == '')
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


function jumpAction() {

}


function waitAction() {

}


function runAction() {
    applyMarioAction(RUN_IMG_URL, 160, '0.25s linear', 'left');
}


function walkAction() {
    applyMarioAction(WALK_IMG_URL, 100, '0.75s linear', 'left');
}
