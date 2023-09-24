var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function(){                      //function to detect user key press.
  if(!started){
    $("#level-title").text("Level " + level);        //change the level title to level 0.

    nextSequence();                                  //every time increase by 1.
    started = true;                                  //for recursion of the if statement.
  }
});

$(".btn").click(function(){

    var userChosenColor = $(this).attr("id");        //store the id of the clicked btn.

    userClickedPattern.push(userChosenColor);       //push the values of userChosenColor to the userClickedPattern array.

    playSound(userChosenColor);                     //play the sound for user click.
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
 if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
   console.log("Success!");

   if(userClickedPattern.length === gamePattern.length){
     setTimeout(function(){
       nextSequence();
     }, 1000);
   }
 }
 else {
   console.log("Wrong");

   playSound("wrong");                                   //play corresponding sound.

   $("body").addClass("game-over");                      //add game-over class from css section.

   setTimeout(function(){                                //function for delay.
     $("body").removeClass("game-over");
   },200);

   $("#level-title").text("Game Over, Press any Key to Restart")

   //calling startOver function to reset all the values to original.

   startOver();
 }
}

function nextSequence(){

  userClickedPattern = [];

  level++;                                         //every time level incresed by 1 whenever nextSequence call above.

  $("#level-title").text("Level " + level);

  var randomNumbre = Math.floor(Math.random()*4);

  var randomChosenColor = buttonColors[randomNumbre];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);    //select random colour button with Id.

  playSound(randomChosenColor);                                        //play the sound for randomChosenColor sequence.
}

//function to play the sounds.
function playSound(name){

  var audio = new Audio("sounds/"+name+".mp3");

  audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed")

    setTimeout(function(){                              //javascript code for removing added pressed class.
      $("#" + currentColor).removeClass("pressed")
    }, 100);
}

function startOver(){
  //reset all the desired values of variables.

  level = 0;
  gamePattern = [];
  started = false;
}
