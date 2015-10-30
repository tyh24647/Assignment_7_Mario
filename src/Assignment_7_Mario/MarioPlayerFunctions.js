var serverURL = "http://localhost:57294/api/MarioLevel";

var marioActions = [
    "walk", "jump", "wait", "run"
];

var DEFAULT_BCKGD_COLOR = '#0F242A';
var DEFAULT_BOX_SHADOW = '0px 2px 5px 2px rgba(0, 0, 0, 0.4)';

var currentPos = 0;
var continueWalking = true;


function startGame() {
    continueWalking = true;
    disableStartButton();
    moveMario();
}


function moveMario() {
    marioAction = generateRandomAction();
    var jQueryURL = serverURL + '?marioAction=' + marioAction;
    var mario = document.getElementById('mario');
    var windowWidth = $(window).width();

    if (continueWalking) {
        $.ajax(jQueryURL, {
            method: "GET",
            success: handleDataChange
        });
    }
}


function handleDataChange(data, data2, data3) {
    if (data == "ERROR") {
        enableStartButton();
        document.getElementById('results').textContent = 'Mario died :(';
        continueWalking = false;
        return;
    }

    var imgURL = "", moveAmt = 0, transition = "", attribute = "";
    var windowWidth = $(window).width();

    if (marioAction == 'walk') {
        imgURL = "Images/mario_walking.gif";
        moveAmt = windowWidth * 0.05;
        transition = "0.75s linear";
        attribute = "left";
    } else if (marioAction == 'run') {
        imgURL = "Images/mario_running.gif";
        moveAmt = windowWidth * 0.1;
        transition = "0.25s linear";
        attribute = "left";
    } else if (marioAction == 'wait') {
        imgURL = "Images/mario_standing.png";
        moveAmt = null;
        transition = null;
        attribute = null;
    } else if (marioAction == 'jump') {
        imgURL = "Images/mario_jumping.png";
        moveAmt = windowWidth * 0.05;
        transition = "0.25s linear";
        attribute = "left";
    }

    applyMarioAction(imgURL, moveAmt, transition, attribute);

    console.log("> Current position: \'" + currentPos + "\'\n> Window width: " + windowWidth + "\'");

    var resultsDiv = document.getElementById('results');
    resultsDiv.textContent = JSON.parse(data).Message;
}


function applyMarioAction(imageTitle, movementAmt, transitionStr, direction) {
    var mario = document.getElementById('mario');
    var mImg = document.getElementById('mario-image');
    mImg.setAttribute('src', imageTitle);

    if (imageTitle === null || (direction !== 'left'
        && direction !== 'right' && direction !== 'top' && direction !== 'bottom')) {
        return;
    }

    currentPos += movementAmt;
    mario.style.transition = transitionStr;

    if (direction == "left") {
        mario.style.left = currentPos + 'px';
    } else if (direction == "bottom") {
        mario.style.bottom = currentPos + 'px';
    } else if (direction == "top") {
        mario.style.top = currentPos + 'px';
    } else if (direction == "right") {
        mario.style.right = currentPos + 'px';
    }
}


function generateRandomAction() {
    return marioActions[Math.floor(Math.random() * marioActions.length)];
}


function disableStartButton() {
    var startButton = document.getElementById('start-button');
    startButton.disabled = true;
    startButton.style.visibility = 'hidden';
}


function enableStartButton() {
    var startButton = document.getElementById('start-button');
    startButton.disabled = false;
    startButton.style.visibility = "visible";
}
