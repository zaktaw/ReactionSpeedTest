$(function() {
    //ON PAGE LOAD:
    $('#divGameObject').hide(); //hide game object
    $('#btnPrevious').hide(); // hide previous button
    makeGameObjectPositions();
    makeTable();

    //Press start button: show game object and move it
    $('#btnStart').on("click", function() {
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
    });

    //Press 'make smaller' button
    $('#btnMakeSmaller').on("click", () => {
        let gameWindowWidth = $('#divGameWindow').css("width").split("px")[0];
        gameWindowWidth -= 3;
        $('#divGameWindow').css({width: gameWindowWidth+'px'});
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

    for (i=0; i<numberOfTests; i++) {
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

//Generate a table with as many rows as number of test results
function makeTable() {
    let tableHTML = '<tr><th>Test</th><th>Result (milliseconds)</th></tr>';

    for (i=0; i<numberOfTests;i++) {
        tableHTML += `<tr><td id='rowTest${i}'>${i+1}</td><td id='rowResult${i}'></td></tr>`;
    }

    $('#tableTestResults').html(tableHTML);
}
