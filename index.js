/**
 * How many pixels the game object positions should be offset by compared to gameWinow size minus gameObject size
 *
 * minimum width: 0
 * minimum height: 0
 * maximum width: gameWindow.width (280) - gameObject.width (40) = 240
 * maximum height: gameWindow.height (500) - gameObject.height (40) = 360
 */

const gameObjectPositionsPercent = [
    {left: 30, top: 10},
    {left: 80, top: 70},
    {left: 60, top: 50},
];

let testCounter = 0; // which test number the user is currently on
const numberOfTests = 3; // how many tests will be generated
const waitMilliseconds = 3000; // how many milleseconds before showing game object in tests
let startTime; // current system time before clicking box

$(function() {
    //ON PAGE LOAD:
    $('#divGameObject').hide(); //hide game object
    $('#btnPrevious').hide(); // hide previous button;
    makeTable();

    //Press start button: show game object and move it
    $('#divStart').on("click", function() {
        moveGameObject();
        setTimeout(() => {
            startTime = Date.now();
            $('#divGameObject').show();
        }, waitMilliseconds);
    });

    //Press next button: updates test counter
    $('#btnNext').on("click", function() {
        testCounter++;
        $('#pTestCounter').text("Test " + (testCounter + 1) + " / " + gameObjectPositions.length);
        hideShowButtons();
        $('#divGameObject').hide();
    });

    //Press previous button: updates test counter
    $('#btnPrevious').on("click", function() {
        testCounter--;
        $('#pTestCounter').text("Test " + (testCounter + 1) + " / " + gameObjectPositions.length);
        hideShowButtons();
        $('#divGameObject').hide();
    });

    //Press game object
    $('#divGameObject').on("click", () => {
        $('#divGameObject').hide();
        let totalTime = Date.now() - startTime;
        $(`#rowResult${testCounter}`).html(totalTime);
        if (testCounter < gameObjectPositionsPercent.length-1) {
            testCounter++;
            $('#pTestCounter').text("Test " + (testCounter + 1) + " / " + gameObjectPositionsPercent.length);
        }
        hideShowButtons();
    });

    //Press 'make smaller width' button
    $('#btnMakeSmallerWidth').on("click", () => {
        let gameWindowWidth = $('#divGameWindow').css("width").split("px")[0];
        gameWindowWidth -= 3;
        $('#divGameWindow').css({width: gameWindowWidth+'px'});
    });

    //Press 'make bigger width' button
    $('#btnMakeBiggerWidth').on("click", () => {
        let gameWindowWidth = $('#divGameWindow').css("width").split("px")[0];
        gameWindowWidthParsed = parseInt(gameWindowWidth);          //Need to parse due to bug where JS adds strings together. 280 + 3 = 2803..
        gameWindowWidth = gameWindowWidthParsed + 3;
        $('#divGameWindow').css({width: gameWindowWidth+'px'});
    });

    //Press 'make smaller height' button
    $('#btnMakeSmallerHeight').on("click", () => {
        let gameWindowHeight = $('#divGameWindow').css("height").split("px")[0];
        gameWindowHeight -= 3;
        $('#divGameWindow').css({height: gameWindowHeight+'px'});
    });

    //Press 'make bigger height' button
    $('#btnMakeBiggerHeight').on("click", () => {
        let gameWindowHeight = $('#divGameWindow').css("height").split("px")[0];
        gameWindowHeightParsed = parseInt(gameWindowHeight);    //Need to parse due to bug where JS adds strings together. 280 + 3 = 2803..
        gameWindowHeight = gameWindowHeightParsed  + 3;
        $('#divGameWindow').css({height: gameWindowHeight+'px'});
    });

    $('#btnMobile').on("click", () => {
        startTestMobile();
    });

    $('#btnPC').on("click", () => {
        startTestPc();
    });
});

//Moves game object to a postion based on which test the user is currently on
function moveGameObject() {
    $("#divGameObject").animate({left: gameObjectPositionsPercent[testCounter].left + '%',
        top: gameObjectPositionsPercent[testCounter].top + '%'});
}


// hides next button when user is at last test and hides previous button when user is at first test
function hideShowButtons() {
    if (testCounter == gameObjectPositionsPercent.length-1) $('#btnNext').hide();
    else $('#btnNext').show();

    if (testCounter == 0) $('#btnPrevious').hide();
    else $('#btnPrevious').show();
}

//Generate a table with as many rows as number of test results
function makeTable() {
    let tableHTML = '<tr><th>Test</th><th>Result (milliseconds)</th></tr>';

    for (i=0; i<numberOfTests;i++) {
        tableHTML += `<tr><td id='rowTest${i}'>${i+1}</td><td id='rowResult${i}'></td></tr>`;
    }

    $('#tableTestResults').html(tableHTML);
}

function startTestMobile() {
    let gameWindowWidth = $('#divGameWindow').css("width").split("px")[0];
    let gameWindowHeight = $('#divGameWindow').css("height").split("px")[0];
    window.location = 'testMobile.html?width=' + gameWindowWidth + '&height=' + gameWindowHeight;
}

function startTestPc() {
    let gameWindowWidth = $('#divGameWindow').css("width").split("px")[0];
    let gameWindowHeight = $('#divGameWindow').css("height").split("px")[0];
    window.location = 'testPc.html?width=' + gameWindowWidth + '&height=' + gameWindowHeight;
}


