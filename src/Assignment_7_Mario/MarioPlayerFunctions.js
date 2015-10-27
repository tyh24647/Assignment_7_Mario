var serverURL = "http://webprogrammingassignment7.azurewebsites.net/mario";

var marioActions = [
    "walk", "jump", "wait", "run"
];

var DEFAULT_BCKGD_COLOR = '#0F242A';
var DEFAULT_BOX_SHADOW = '0px 2px 5px 2px rgba(0, 0, 0, 0.4)';
var CENTER = 'center';
var MIDDLE = 'middle';


/** FOR DEBUGGING ONLY!!!! **/
function walk() {
    var mario = document.getElementById('mario');
    mario.setAttribute('src', 'Images/mario_standing.png');
    // TODO
}
/****************************/



function startGame() {
    moveMario();
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

