const gameObjectPositionsPercent = [
    {left: 25, top: 89},
    {left: 33, top: 10},
    {left: 44, top: 73},
    {left: 54, top: 36},
    {left: 62, top: 11},
    {left: 1, top: 17},
    {left: 81, top: 73},
    {left: 83, top: 0},
    {left: 75, top: 15},
    {left: 55, top: 83}
];

const gameObjectSizes = [
    {height: 6, width: 10},
    {height: 6, width: 10},
    {height: 6, width: 10},
    {height: 12, width: 20},
    {height: 12, width: 20},
    {height: 15, width: 23},
    {height: 15, width: 23},
    {height: 9, width: 18},
    {height: 9, width: 18},
    {height: 9, width: 18}
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
    //populateArray()

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
        $('#divGameObject').hide();
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
    $('#divGameObject').css({height: gameObjectSizes[testCounter].height + '%', width: gameObjectSizes[testCounter].width +'%'});
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

function populateArray() {
    for (i=0;i<10;i++) {
        let position = {left: genRandNum(0,90), top: genRandNum(0,94)};
        gameObjectPositionsPercent.push(position);
    }
}

//Generate a random number between lower bound and upper bound (including lower and upper bound)
function genRandNum(lowerBound, upperBound) {
    return Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound;
}