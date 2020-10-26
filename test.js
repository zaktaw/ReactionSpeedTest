const gameObjectPositionsPercent = [
    {left: 90, top: 90},
    {left: 25, top: 25},
    {left: 50, top: 50},
    {left: 75, top: 75},
    {left: 0, top: 90},
    {left: 90, top: 0}
];

let testCounter = 0; // which test number the user is currently on
const numberOfTests = 10; // how many tests will be generated
const waitMilliseconds = 3000; // how many milleseconds before showing game object in tests
let startTime; // current system time before clicking box


$(function() {
    //ON PAGE LOAD:
    $('#divGameObject').hide(); //hide game object
    $('#btnPrevious').hide(); // hide previous button
    makeTable();
    setGameWindowSize();

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
        $('#pTestCounter').text("Test " + (testCounter + 1) + " / " + gameObjectPositionsPercent.length);
        hideShowButtons();
    });

    //Press previous button: updates test counter
    $('#btnPrevious').on("click", function() {
        testCounter--;
        $('#pTestCounter').text("Test " + (testCounter + 1) + " / " + gameObjectPositionsPercent.length);
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

//Adjusts the game window size based on what the user put in in index.html
function setGameWindowSize() {
    let urlVariables = window.location.search.substring(1).split("&");
    console.log(urlVariables);

    let gameWindowWidth = urlVariables[0].split("=")[1] + 'px';
    let gameWindowHeight = urlVariables[1].split("=")[1] + 'px';

    $('#divGameWindow').css({width: gameWindowWidth, height: gameWindowHeight});
}