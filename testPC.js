const tests = [
    {height: 6, width: 10, left: 25, top: 89, testNumber: 1},
    {height: 20, width: 34, left: 25, top: 30, testNumber: 2},
    {height: 10, width: 14, left: 82, top: 88, testNumber: 3},
    {height: 6, width: 10, left: 6, top: 10, testNumber: 4},
    {height: 16, width: 24, left: 52, top: 36, testNumber: 5},
    {height: 8, width: 12, left: 8, top: 70, testNumber: 6},
    {height: 20, width: 34, left: 45, top: 5, testNumber: 7},
    {height: 8, width: 12, left: 84, top: 50, testNumber: 8},
    {height: 6, width: 10, left: 40, top: 90, testNumber: 9},
    {height: 20, width: 34, left: 60, top: 10, testNumber: 10}
]

let testCounter = 0; // which test number the user is currently on
const numberOfTests = 10; // how many tests will be generated
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
        $("#divStart").css({'background-color': 'red'});
        $("#divStart").html('');
        moveGameObject();
        setTimeout(() => {
            startTime = Date.now();
            $('#divGameObject').show();
        }, genRandNum(1000,4000));
    });

    //Press next button: updates test counter
    $('#btnNext').on("click", function() {
        $("#divStart").css({'background-color': 'green'});
        $("#divStart").html('START');

        testCounter++;
        $('#pTestCounter').text("Test " + (testCounter + 1) + " / " + tests.length);
        hideShowButtons();
        $('#divGameObject').hide();
    });

    //Press previous button: updates test counter
    $('#btnPrevious').on("click", function() {
        $("#divStart").css({'background-color': 'green'});
        $("#divStart").html('START');

        testCounter--;
        $('#pTestCounter').text("Test " + (testCounter + 1) + " / " + tests.length);
        hideShowButtons();
        $('#divGameObject').hide();
    });

    //Press game object
    $('#divGameObject').on("click", () => {
        $('#divGameObject').hide();

        $("#divStart").css({'background-color': 'green'});
        $("#divStart").html('START');

        let totalTime = Date.now() - startTime;
        $(`#rowTest${testCounter}`).html(tests[testCounter].testNumber);
        $(`#rowResult${testCounter}`).html(totalTime);
        if (testCounter < tests.length-1) {
            testCounter++;
            $('#pTestCounter').text("Test " + (testCounter + 1) + " / " + tests.length);
        }
        hideShowButtons();
    });
});

//Moves game object to a postion based on which test the user is currently on
function moveGameObject() {
    $('#divGameObject').css({height: tests[testCounter].height + '%', width: tests[testCounter].width +'%'});
    $("#divGameObject").animate({left: tests[testCounter].left + '%', 
    top: tests[testCounter].top + '%'});
}

// hides next button when user is at last test and hides previous button when user is at first test
function hideShowButtons() {
    if (testCounter == tests.length-1) $('#btnNext').hide();
    else $('#btnNext').show();
    
    if (testCounter == 0) $('#btnPrevious').hide();
    else $('#btnPrevious').show();
}

//Generate a table with as many rows as number of test results
function makeTable() {
    let tableHTML = '<tr><th>Test</th><th>Result (milliseconds)</th></tr>';

    for (i=0; i<numberOfTests;i++) {
        tableHTML += `<tr><td id='rowTest${i}'></td><td id='rowResult${i}'></td></tr>`;
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
        tests.push(position);
    }
}

//Generate a random number between lower bound and upper bound (including lower and upper bound)
function genRandNum(lowerBound, upperBound) {
    return Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound;
}