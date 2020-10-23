const gameObjectPositions = []; // will be filled on page load

/**
 * How many pixels the game object positions should be offset by compared to gameWinow size minus gameObject size
 * 
 * minimum width: 0
 * minimum height: 0
 * maximum width: gameWindow.width (500) - gameObject.width (100) = 400
 * maximum height: gameWindow.height (500) - gameObject.height (100) = 400  
 */
const gameObjectPositionOffset = [
    {width: 7, height: 229},
    {width: 45, height: 366},
    {width: 390, height: 221},
    {width: 279, height: 295},
    {width: 55, height: 216},
    {width: 245, height: 346},
    {width: 293, height: 160},
    {width: 84, height: 301},
    {width: 321, height: 304},
    {width: 149, height: 27},
];

let testCounter = 0; // which test number the user is currently on
const numberOfPositions = 10; // how many tests will be generated
const waitMilliseconds = 3000; // how many milleseconds before showing game object in tests


$(function() {
    //ON PAGE LOAD:
    $('#divGameObject').hide(); //hide game object
    $('#btnPrevious').hide(); // hide previous button
    makeGameObjectPositions();

    //Press start button: show game object and move it
    $('#btnStart').on("click", function() {
        moveGameObject();
        setTimeout(() => $('#divGameObject').show(), waitMilliseconds);
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
});

//Moves game object to a postion based on which test the user is currently on
function moveGameObject() {
    $("#divGameObject").animate({left: gameObjectPositions[testCounter].left + 'px', top: gameObjectPositions[testCounter].top + 'px'});

}

// fills an array of game object positions based on the game window size, game object size and game object positions offsets
function makeGameObjectPositions() {
    const gameWindow = document.querySelector('#divGameWindow');
    const gameWindowWidth = getComputedStyle(gameWindow).width.split("px")[0];
    const gameWindowHeight = getComputedStyle(gameWindow).height.split("px")[0];

    const gameObject = document.querySelector('#divGameObject');
    const gameObjectWidth = getComputedStyle(gameObject).width.split("px")[0];
    const gameObjectHeight = getComputedStyle(gameObject).height.split("px")[0];

    for (i=0; i<numberOfPositions; i++) {
        let gameObjectPosition = {
            left: gameWindowWidth-gameObjectWidth-gameObjectPositionOffset[i].width,
            top: gameWindowHeight-gameObjectHeight-gameObjectPositionOffset[i].height
        };

        gameObjectPositions.push(gameObjectPosition);
    }
}

// hides next button when user is at last test and hides previous button when user is at first test
function hideShowButtons() {
    if (testCounter == gameObjectPositions.length-1) $('#btnNext').hide();
    else $('#btnNext').show();
    
    if (testCounter == 0) $('#btnPrevious').hide();
    else $('#btnPrevious').show();
}
