// alert("hello");
var level = 0;
var started = 0;
var gamePattern = [];
var userClickedPattern = [];
const buttonColors = ["red", "blue", "green", "yellow"];
function nextSequence(){
  userClickedPattern = [];
  var randomNumber = Math.round(Math.random()*3);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  console.log(randomNumber);
  console.log(randomChosenColor);
  console.log(gamePattern);
  playSound(randomChosenColor);
$("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
var newLevel = level++;
var newText = "Level" + " " + newLevel;
$("h1").text(newText);
}

$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  console.log(userChosenColor);
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);
  console.log(userClickedPattern.length);
  console.log(level);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
})

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");

  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed")
  },100);
}

 $(document).keypress(function(){
   var currentStatus = started++;
   if(currentStatus >= 0 && currentStatus < 1){
    nextSequence();
   }
 });

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("Success");
    console.log(userClickedPattern);
    console.log(gamePattern);

  if(userClickedPattern.length === gamePattern.length){
    setTimeout(function(){
      nextSequence(),1000});
  }

}
  else{
    console.log("Wrong");
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over"),200
    });
    $("h1").text("Game Over. Press any key to restart");
    startOver();
  }

}

function startOver(){
  level = 0;
  gamePattern = [];
  started = 0;

}
