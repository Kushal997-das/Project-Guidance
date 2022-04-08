
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

// to check if game started
var started = false;

var level = 0;

// To detect when a keyboard key has been pressed
$(document).keypress(function () {

  if (!started) {
    // The h1 title starts out saying "Press A Key to Start", when the game has started, it changes to "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }

});


$(".btn").click(function () {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

// check input
function checkAnswer(currentLevel) {

  // To check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong"
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    // check that they have finished their sequence with another if statement
    if (userClickedPattern.length === gamePattern.length) {

      // Calling nextSequence() after a 1000 millisecond delay
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } else {

    // Sound plays if the user got one of the answers wrong
    playSound("wrong");

    // CSS applied after user gives wrong answer
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    // h1 says "Game Over, Press Any Key to Restart" if the user got the answer wrong
    $("#level-title").text("Game Over, Press Any Key to Restart");

    // Calling startOver() if the user gets the sequence wrong
    startOver();
  }

}


function nextSequence() {

  userClickedPattern = [];

  // Increase the level by 1 every time nextSequence() is called.
  level++;

  // h1 changes with the value of level
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}


// animation on button clicks
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

}

// playing sound on button clicks
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


// for restart
function startOver() {

  // Reseting the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
}