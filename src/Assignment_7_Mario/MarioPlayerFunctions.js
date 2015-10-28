var serverURL = 'http://localhost:57294/api/MarioLevel'

var marioActions = [
    "walk", "jump", "wait", "run"
];

var DEFAULT_BCKGD_COLOR = '#0F242A';
var DEFAULT_BOX_SHADOW = '0px 2px 5px 2px rgba(0, 0, 0, 0.4)';
var END_OF_WINDOW = 10;
var CENTER = 'center';
var MIDDLE = 'middle';
var RUN_IMG_URL = 'Images/mario_running.gif',
    WALK_IMG_URL = 'Images/mario_walking.gif',
    STAND_IMG_URL = 'Images/mario_standing.png',
    JUMP_IMG_URL = 'Images/mario_jumping.png';
var marioAction = 'wait';
var leftVal = 0, currentPos = 1;
var runResult = "Mario is running";
var waitResult = "Mario is waiting";
var jumpResult = "Mario is jumping";
var walkResult = "Mario is walking";


function startGame() {
    moveMario();
}


function applyMarioAction(imageTitle, movementAmt, transitionStr, direction) {
    var mario = document.getElementById('mario');
    var mImg = document.getElementById('mario-image');
    var lDistance = mario.style.left;
    mImg.setAttribute('src', imageTitle);

    if (imageTitle == null || movementAmt == null || (direction != 'left'
        && direction != 'right' && direction != 'top' && direction != 'bottom')) {
        return;
    } if (lDistance != 0 && lDistance.length >= 3) {
        leftVal += parseInt(lDistance.substr(0, leftVal.toString().length - 2));
    }

    var tmp = leftVal + movementAmt;
    mario.style.transition = transitionStr;
    mario.style.left = tmp + 'px';
}


function moveMario() {
    marioAction = generateRandomAction();
    var jQueryURL = serverURL + "?marioAction" + marioAction;

    $.ajax(jQueryURL, {
        method: "GET",
        success: handleDataChange
    });
}


function handleDataChange(data) {
    var resultsContainer = document.getElementById('results');

    if (marioAction == 'walk') {
        walkAction();
        resultsContainer.textContent = walkResult;
    } else if (marioAction == 'run') {
        runAction();
        resultsContainer.textContent = runResult;
    } else if (marioAction == 'wait') {
        waitAction();
        resultsContainer.textContent = waitResult;
    } else if (marioAction == 'jump') {
        jumpAction();
        resultsContainer.textContent = jumpResult;
    } else {
        resultsContainer.textContent = "ERROR: Could not perform the requested action";
    }
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
    mario.setAttribute('src', STAND_IMG_URL);
}


function actionIsValid() {
    return (currentPos < END_OF_WINDOW);
}


function jumpAction() {
    if (actionIsValid()) {
        var moveAmt = document.getElementById('body').style.width * 0.05;
        //applyMarioAction(JUMP_IMG_URL, moveAmt, ')
    }
}


function waitAction() {
    if (actionIsValid()) {
        applyMarioAction(STAND_IMG_URL, null, null, null);
    }
}

// TODO move according to percentage instead of specific values
function runAction() {
    if (actionIsValid()) {
        var moveAmt = document.getElementById('body').style.width * 0.1;
        applyMarioAction(RUN_IMG_URL, 160, '0.25s linear', 'left');
        //applyMarioAction(RUN_IMG_URL, moveAmt, '0.25s linear', 'left');
        currentPos++;
    }
}


function walkAction() {
    if (actionIsValid()) {
        var moveAmt = document.getElementById('body').style.width * 0.05;
        applyMarioAction(WALK_IMG_URL, 100, '0.75s linear', 'left');
        //applyMarioAction(WALK_IMG_URL, moveAmt, '0.75s linear', 'left');
        currentPos++;

    }
}
