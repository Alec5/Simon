var green = document.getElementById("green");
var red = document.getElementById("red");
var blue = document.getElementById("blue");
var yellow = document.getElementById("yellow");

var score_text = document.getElementById("score");
var high_score_text = document.getElementById("high_score");
var score = 0
var high_score = 0

var counter = 0;
var counter2 = 0;
var counter3 = 0;
var counter4 = 0;

var color_pattern = [];
var colors = [];

var colors_string = ""
var color_pattern_string = ""

var success = false;
var failure = false;
var playing = false;

var green_sound = document.getElementById("green_sound");
var red_sound = document.getElementById("red_sound");
var blue_sound = document.getElementById("blue_sound");
var yellow_sound = document.getElementById("yellow_sound");
var wrong = document.getElementById("wrong");

green_sound.volume = 0.2
red_sound.volume = 0.2
blue_sound.volume = 0.2
yellow_sound.volume = 0.2
wrong.volume = 0.1

if (localStorage.getItem("highscore") == 0){
	high_score_text.innerHTML = "High Score: " + 0;
} else {
	high_score = localStorage.getItem("highscore")
	high_score_text.innerHTML = "High Score: " + high_score
}

score_text.innerHTML = ("Score: " + score)

function colorClick(id){
	if (playing == true){
		if (id == "green"){		
			green.style.backgroundColor = "#44E929";
			green_sound.play()
			setTimeout(function(){green.style.backgroundColor = "green"}, 300);
			colors.push(1);
		} else if (id == "red") {
			red.style.backgroundColor = "#FF4545";
			red_sound.play();
			setTimeout(function(){red.style.backgroundColor = "red"}, 300);
			colors.push(2);
		} else if (id == "blue") {
			blue.style.backgroundColor = "#1853FC";
			blue_sound.play();
			setTimeout(function(){blue.style.backgroundColor = "blue"}, 300);
			colors.push(3);
		} else if (id == "yellow") {
			yellow.style.backgroundColor = "#F9FD6A";
			yellow_sound.play();
			setTimeout(function(){yellow.style.backgroundColor = "yellow"}, 300);
			colors.push(4);
		}
	}
}

function newGame(){
	if (playing == false){
		color_pattern = [];
		colors = [];
		colors_string = ""
		color_pattern_string = ""
		failure = false;
		success = false;
		playing = true;
		counter = 0;
		counter2 = 0;
		counter3 = 0;
		counter4 = 0;
	
		color_pattern.push((Math.floor((Math.random() * 10)) % 4) + 1)
		color_pattern_string += parseFloat(color_pattern[counter3])
		shineColors();
	}
}

function nextRound(){
	failure = false;
	success = false;
	counter = 0;
	counter2 = 0;
	counter4 = 0;
	colors = [];
	colors_string = ""
	
	counter3++
	
	color_pattern.push((Math.floor((Math.random() * 10)) % 4) + 1)
	color_pattern_string += parseFloat(color_pattern[counter3])
}

green.addEventListener("click", colorCheck);
red.addEventListener("click", colorCheck);
blue.addEventListener("click", colorCheck);
yellow.addEventListener("click", colorCheck);

function greenClick(){
	green.style.backgroundColor = "#44E929";
		setTimeout(function(){green.style.backgroundColor = "green"}, 300);
}



function colorCheck(){
	parseColors();
	counter2++
		
	if (colors_string == color_pattern_string){			
		success = true;
	} else if (colors_string[counter2-1] !== color_pattern_string[counter2-1]) {
		failure = true;
	}
		
	if (success == true){
		score++
		scoreGame();
		setTimeout(nextRound, 1000);
	} else if (failure == true && playing == true){
		wrong.play();
		setTimeout(function(){location.reload()}, 500)
	}
}

function scoreGame(){
	score_text.innerHTML = ("Score: " + score)	
	if (score >= high_score){
		high_score = score;
		localStorage.setItem("highscore", high_score);
	}
	high_score_text.innerHTML = ("High Score: " + localStorage.getItem("highscore"))
}


function parseColors(){
	colors_string += parseFloat(colors[counter])
	counter++
}

function getColor(){
	if (color_pattern[counter4] == 1){
		green.style.backgroundColor = "#44E929";
		green_sound.play();
		setTimeout(function(){green.style.backgroundColor = "green"}, 450);
	} else if (color_pattern[counter4] == 2){
		red.style.backgroundColor = "#FF4545";
		red_sound.play();
		setTimeout(function(){red.style.backgroundColor = "red"}, 450);
	} else if (color_pattern[counter4] == 3){
		blue.style.backgroundColor = "#1853FC";
		blue_sound.play();
		setTimeout(function(){blue.style.backgroundColor = "blue"}, 450);
	} else if (color_pattern[counter4] == 4){
		yellow.style.backgroundColor = "#F9FD6A";
		yellow_sound.play();
		setTimeout(function(){yellow.style.backgroundColor = "yellow"}, 450);
	}
	counter4++
}

function shineColors(){
	setInterval(getColor, 700)
}

function resetGame(){
	location.reload();
}