var buttoncolors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userclickpattern = [];

var flag = 0;
var level = 0;

$(document).keypress(function () {
  if (flag === 0) {
    level = 0;
    $("h1").text("Level " + level);
    flag = 1;
    nextsequence();
  }
});

$(".btn").click(function () {
  var userchosencolour = this.id;
  userclickpattern.push(userchosencolour);
  playsound(userchosencolour);
  animatepress(userchosencolour);
  if (level === 0) {
    $("h1").text("Level " + level);
  } else {
    $("h1").text("Level " + level);
  }
  checkanswer(userchosencolour);
});

function nextsequence() {
  level++;
  var random = Math.random();
  random = random * 4;
  random = Math.floor(random);
  var randomchoosecolor = buttoncolors[random];
  gamePattern.push(randomchoosecolor);

  $("#" + randomchoosecolor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playsound(randomchoosecolor);
}

function playsound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatepress(currentcolor) {
  $("#" + currentcolor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentcolor).removeClass("pressed");
  }, 100);
}

function checkanswer(currentlevel) {
  if (gamePattern[gamePattern.length - 1] === currentlevel) {
    if (gamePattern.length === userclickpattern.length) {
      setTimeout(function () {
        nextsequence();
      }, 1000);
    }
  } else {
    playsound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over,Press Any Key to Restart");
  }
  flag = 0;
  gamePattern.length = 0;
  userclickpattern.length = 0;
}
