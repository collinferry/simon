$(document).ready(function() {

  var gameArray = [];
  var playerArray = [];
  var speed = 800;
  var strict = false;
  var power = false;
  var player = false;
  var count = 0;
  var sound1 = document.getElementById("sound1");
  var sound2 = document.getElementById("sound2");
  var sound3 = document.getElementById("sound3");
  var sound4 = document.getElementById("sound4");
  var gameover = document.getElementById("gameover");
  var lose = document.getElementById("lose");
  var victory = document.getElementById("victory");
  var powerup = document.getElementById("powerup");

  // Power off the machine when the power button is pressed

  function powerOff() {
    power = false;
    document.getElementById("count").innerHTML = "";
    if ($(".slight").hasClass("hidden")) {
      $('.slight').toggleClass('hidden');
    }
  }

  // Reset the game, used for both reset button and failing on strict mode

  function reset() {
    gameArray = [];
    playerArray = [];
    speed = 800;
    player = false;
    count = 0;
  }

  // Four separate functions for toggling each color on/off ------- //

  function green() {
    sound1.play();

    $('.gbtn').toggleClass('hidden');

    setTimeout(function() {
      $('.gbtn').toggleClass('hidden');
    }, speed)
  }

  function red() {
    sound2.play();
    $('.rbtn').toggleClass('hidden');

    setTimeout(function() {
      $('.rbtn').toggleClass('hidden');
    }, speed)
  }

  function blue() {
    sound3.play();
    $('.bbtn').toggleClass('hidden');

    setTimeout(function() {
      $('.bbtn').toggleClass('hidden');
    }, speed)
  }

  function yellow() {
    sound4.play();
    $('.ybtn').toggleClass('hidden');
    setTimeout(function() {
      $('.ybtn').toggleClass('hidden');
    }, speed)
  }

  // Check players progress ----------------- //

  function playerSequence() {

    // Check if player hit the wrong color in running sequence

    if (playerArray[playerArray.length - 1] != gameArray[playerArray.length - 1]) {

      if (strict === true) {
        document.getElementById("count").innerHTML = "XX";
        gameover.play();
        setTimeout(function() {
          gameOn();
        }, 1500)

      } else {
        playerArray = [];
        lose.play();
        document.getElementById("count").innerHTML = "XX";
        setTimeout(function() {
          document.getElementById("count").innerHTML = count + 1;
        }, speed)

      }
      // If they got everything right, check for a winning streak of 20
    } else if (playerArray.length == 20) {
      victory.play();
      document.getElementById("count").innerHTML = "!!";
      setTimeout(function() {
        gameOn();
      }, 1000)
    } // Pass control back to the computer
    else if (playerArray.length == count + 1) {
      count += 1;
      runSequence();
    }

  }

  // Computer runs through the sequence up to the current count ------ //

  function runSequence() {
    player = false;
    var b = 0;
    document.getElementById("count").innerHTML = count + 1;

    if (count == 4) {
      speed = 600;
    } else if (count == 8) {
      speed = 400;
    } else if (count == 12) {
      speed = 300;
    }

    // Light up the correct colors in order (according to the speed)

    function colorFlash() {

      if (gameArray[b] == 0) {
        setTimeout(function() {
          green()
        }, speed);
      } else if (gameArray[b] == 1) {
        setTimeout(function() {
          red()
        }, speed);
      } else if (gameArray[b] == 2) {
        setTimeout(function() {
          blue()
        }, speed);
      } else if (gameArray[b] == 3) {
        setTimeout(function() {
          yellow()
        }, speed);
      }
      b += 1;
      if (b <= count) {
        setTimeout(function() {
          colorFlash()
        }, speed + (speed / 2));
      }
    }

    colorFlash();
    playerArray = [];
    player = true;

  }

  // Start a new game and generate random sequence-------------- //

  function gameOn() {
    powerup.play();
    reset();
    power = true;
    for (var a = 0; a < 20; a++) {
      var rand = Math.floor(Math.random() * 4);
      gameArray.push(rand);
      console.log(gameArray);
    }
    setTimeout(runSequence, 700);
  }

  // Functions to run upon clicking each respective CIRCLE button ----------- //

  $(".power").click(function() {
    if (power === false) {
      document.getElementById("count").innerHTML = "--";
      gameOn();
    } else {
      powerOff();
    }
  });

  $(".strict").click(function() {
    if (power === true) {
      $('.slight').toggleClass('hidden');
      strict = !strict;
    }
  });

  $(".reset").click(function() {
    if (power === true) {
      document.getElementById("count").innerHTML = "--";
      gameOn();
    }
  });

  // Functions to run upon clicking each respective COLOR button ----------- //

  function colorToggle(tag, sound, value) {
    if (power === true) {
      $(tag).toggleClass('hidden');
      sound.currentTime = 0; //this can allow for overlapping plays of the same sound, but currently it's nested in a timed function so it's ineffective
      sound.play();
      setTimeout(function() {
        $(tag).toggleClass('hidden');
      }, 300)
    }

    if (player === true) {
      playerArray.push(value);
      playerSequence();
    }
  }

  $(".green").click(function() {
    colorToggle(".gbtn", sound1, 0);
  });
  $(".red").click(function() {
    colorToggle(".rbtn", sound2, 1);
  });
  $(".blue").click(function() {
    colorToggle(".bbtn", sound3, 2);
  });
  $(".yellow").click(function() {
    colorToggle(".ybtn", sound4, 3);
  });

  $(".instructions").click(function() {
    $(".instructions").toggle();
    document.getElementById("count").innerHTML = "--";
    gameOn();
  });

});

/* To-do: make turning off the power cancel the runSequence function
        - fix the sound issue (same sound trying to play twice cancels second play)

*/
