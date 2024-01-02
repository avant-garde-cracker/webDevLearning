var buttonColours = ["red", "blue", "green", "yellow"]
var gamePattern = []
var started = false;
var level = 0;
var userClickedPattern = []


function nextSequence() {
    userClickedPattern = [];
    level += 1
    var randomNumber = Math.floor(Math.random() * 4)
    var randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    $("#"+randomChosenColour).fadeOut(100, function () {
        PlaySound(randomChosenColour);
    }).fadeIn(100);
    $("h1").text("Level "+level);    
}

function PlaySound(color){
    var audio = new Audio("sounds/"+color+".mp3");
    audio.play();
}

function startOver(){
    started = false;
    $(document).on("keydown", function (){
        $("h1").text("Press A Key to Start"); 
    })
    level = 0;
    gamePattern=[];
}

$(".btn").click(function (){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    animatePress(this.id)
    PlaySound(userChosenColour);
    CheckAnswer(userClickedPattern.length-1);
})

function CheckAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      console.log("wrong");
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 100);
      $("h1").text("Game Over, Press Any Key to Restart"); 
      startOver()
    }
}


function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }

$(document).on("keydown", function (e){
    if(e.key === "a" && !started){
        started = true;
        nextSequence();
    }
})