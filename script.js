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
    {width: 0, height: 0},
    {width: 400, height: 400},
    {width: 500, height: 500},
    {width: 50, height: 10},
    {width: 60, height: 10},
    {width: 70, height: 10},
    {width: 80, height: 10},
    {width: 90, height: 10},
    {width: 100, height: 10},
    {width: 20, height: 10},
];

let testCounter = 0; // which test number the user is currently on
const numberOfPostions = 10; // how many tests will be generated


$(function() {
    //ON PAGE LOAD:
    $('#divGameObject').hide(); //hide game object
    makeGameObjectPositions();

    //Press start button: show game object and move it
    $('#btnStart').on("click", function() {
        $('#divGameObject').show();
        moveGameObject();
    });
});

//Moves game object to a postion based on which test the user is currently on
function moveGameObject() {
    $("#divGameObject").animate({left: gameObjectPositions[testCounter].left + 'px', top: gameObjectPositions[testCounter].top + 'px'});
    testCounter++;
}

// fills an array of game object positions based on the game window size, game object size and game object positions offsets
function makeGameObjectPositions(numberOfPostions) {
    const gameWindow = document.querySelector('#divGameWindow');
    const gameWindowWidth = getComputedStyle(gameWindow).width.split("px")[0];
    const gameWindowHeight = getComputedStyle(gameWindow).height.split("px")[0];

    const gameObject = document.querySelector('#divGameObject');
    const gameObjectWidth = getComputedStyle(gameObject).width.split("px")[0];
    const gameObjectHeight = getComputedStyle(gameObject).height.split("px")[0];

    for (i=0; i<numberOfPostions; i++) {
        let gameObjectPosition = {
            left: gameWindowWidth-gameObjectWidth-gameObjectPositionOffset[i].width,
            top: gameWindowHeight-gameObjectHeight-gameObjectPositionOffset[i].height
        };

        gameObjectPositions.push(gameObjectPosition);
    }
}