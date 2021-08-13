// get each button
var greenBox = document.getElementById("greenBox");
var redBox = document.getElementById("redBox");
var yellowBox = document.getElementById("yellowBox");
var blueBox = document.getElementById("blueBox");

// setup sound
var buttonSound = document.getElementById("buttonSound");
var rightOrWrongSound = document.getElementById("rightOrWrongSound");
buttonSound.volume = 0.2;
rightOrWrongSound.volume = 0.2;

// save unlit color values to use when turning off lights
var unlitGreen = greenBox.style.backgroundColor;
var unlitRed = greenBox.style.backgroundColor;
var unlitYellow = greenBox.style.backgroundColor;
var unlitBlue = greenBox.style.backgroundColor;

var colorSequence = [];
var gameOver = true;
var buttonsEnabled = false;
var score = 0;
var highScore = 0;
var colorCount = 0;  // track how many colors have been entered each round


if (localStorage.length > 0)
	highScore = localStorage.getItem("highScore");
displayScore();
displayHighScore();


// --- function definitions ---
function startGame()
{
  if (gameOver)
  {
    gameOver = false;
    colorSequence = [];
    score = 0;
    colorCount = 0;
    toggleStartButton(false);
		displayScore();
		displayHighScore();
    startNewRound();
  }
}

function startNewRound()
{
	toggleButtons(false)

  // play sequence
  insertColor();
  flashSequence();

  // restart color test
  colorCount = 0;
}

// flash color when clicked
function flashColor(color)
{
  var flashLength = 350;

  // color set to green by default
  var button = greenBox;
  var brighterColor = "#00FF00";
  var darkerColor = unlitGreen;

  // test for other color buttons
  if (color == "red")
  {
    button = redBox;
    brighterColor = "#FF3333";
    darkerColor = unlitRed;
  }
  else if (color == "yellow")
  {
    button = yellowBox;
    brighterColor = "#FFFF44";
    darkerColor = unlitYellow;
  }
  else if (color == "blue")
  {
    button = blueBox;
    brighterColor = "#3344FF";
    darkerColor = unlitBlue;
  }

  // turn light on and off
  button.style.backgroundColor = brighterColor;
  setTimeout(
    function() { button.style.backgroundColor = darkerColor; },
    flashLength
  );
}

function colorClick(color)
{
  // prevent button interaction if buttons are disabled
  if (!buttonsEnabled)
    return;

  // play error sound and end game if wrong
  if (colorSequence[colorCount] != color)
  {
    rightOrWrongSound.src = "audio/wrong.wav";
    rightOrWrongSound.play();
    gameOver = true;
  }
  else  // play button normally otherwise
  {
    buttonSound.src = "audio/" + color + ".mp3";
    buttonSound.play();
    score++;
    displayScore();
  }
  flashColor(color);
  colorCount++;
  checkRoundComplete();
}

// check if player successfully enters full sequence
function checkRoundComplete()
{
  if (gameOver)
  {
    endGame();
  }
  // play success animation
  else if (colorCount == colorSequence.length)
  {
		toggleButtons(false);
    rightOrWrongSound.src = "audio/correct.wav";
    rightOrWrongSound.play();
    flashColor("green");
    flashColor("red");
    flashColor("blue");
    flashColor("yellow");
    setTimeout(startNewRound, 1500);
  }
}

// add new color to sequence
function insertColor()
{
  var randInt = Math.floor(Math.random() * 4);
  var colors = ["green", "red", "yellow", "blue"];
  colorSequence.push(colors[randInt]);
}

// recursively iterate through sequence
function flashSequence()
{
  flashNextColor(0);
}
function flashNextColor(index)
{
  if (index < colorSequence.length)
  {
    var color = colorSequence[index]
    flashColor(color);
    buttonSound.src = "audio/" + color + ".mp3";
    buttonSound.play();
    setTimeout(function() {flashNextColor(index + 1)}, 800);
  }
	else
	{
		toggleButtons(true)		// turn on buttons when sequence finishes
	}
}

function displayScore()
{
  document.getElementById("score").innerHTML = "Score: " + score;
}

function displayHighScore()
{
  document.getElementById("highScore").innerHTML = "High Score: " + highScore;
}

function toggleButtons(enabled)
{
	buttonsEnabled = enabled;
  if (enabled)  // turn on all colors, turn off start button
  {
    greenBox.style.cursor = "pointer";
    redBox.style.cursor = "pointer";
    yellowBox.style.cursor = "pointer";
    blueBox.style.cursor = "pointer";
  }
  else          // turn off all colors, turn on start button
  {
    greenBox.style.cursor = "default";
    redBox.style.cursor = "default";
    yellowBox.style.cursor = "default";
    blueBox.style.cursor = "default";
  }
}

function toggleStartButton(enabled)
{
	if (enabled)
	{
		startButton.style.cursor = "pointer";
		startButton.style.backgroundColor = "#DD99FF";
	}
	else
	{
		startButton.style.cursor = "default";
    startButton.style.backgroundColor = "#C5C5C5";
	}
}

// reset game
function endGame()
{
  toggleButtons(false);
	toggleStartButton(true);

  // save high score
  if (score > highScore)
  {
		highScore = score;
		localStorage.setItem("highScore", highScore);
	}
  displayHighScore();
}
