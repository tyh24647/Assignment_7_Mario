var serverURL = "http://webprogrammingassignment7.azurewebsites.net/mario";

var marioActions = [
    "walk", "jump", "wait", "run"
];


function startGame() {
    moveMario();
}


function moveMario() {
    alert("TEST!!");
    $.ajax(serverURL + "/" + generateRandomAction(), {
        method: "GET",
        contentType: "application/json"

        // TODO: figure this shit out man
    });
}


function generateRandomAction() {
    var rand = Math.floor(Math.random() * 4);
    
    if (serverURL[rand] == null) {
        print("ERROR: Invalid index.\nPlease ensure that the random index" +
            "was generated correctly in order to perform the requested action.");
        return;
    }

    return marioActions[rand];
}

