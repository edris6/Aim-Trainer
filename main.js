let x, y, size;
x = 30;
y = 30;
size = 55;

let windowWidthb;
let windowHeightb;

let playings = false;
let button;


let clicked = 0;
let clickedpb = 0;
let clickedprs = 0;
let alltimere;
if(alltimere == undefined){
	alltimere = 0;
}else{
	getCookie("record");
}

let maxlimittime = 15;
let timeleft = maxlimittime;
let cheaterr = false;
let previoustime = maxlimittime;



function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
}

function setup() {
	windowHeightb = windowHeight;
	windowWidthb = windowWidth;
	createCanvas(windowWidth, windowHeight);
	
	rectMode(CENTER);
	button = createButton("click me to start the new game");
	button.position(640, 640);
	button.mousePressed(starts);
	
}



function draw() {
	background(255);
	if (playings == true) {
		square(x, y, size);
		console.log("x is " + x + " y is " + y);
		button.hide();
		document.getElementById("recordsession").innerHTML = "";
		document.getElementById("alltime").innerHTML = "";
		document.getElementById("beforesss").innerHTML = "";
		
	}else if(cheaterr == true) {
		document.getElementById("recordsession").innerHTML ="CHEATER";
		document.getElementById("alltime").innerHTML = "CHEATER";
		document.getElementById("beforesss").innerHTML = "CHEATER";
		button.hide;
		

	}else if (playings == false && cheaterr == false) {
		document.getElementById("recordsession").innerHTML =
			"The record in this session is " + clickedpb;
		document.getElementById("alltime").innerHTML = "Your all time record is " + getCookie("record");
		document.getElementById("beforesss").innerHTML = "The previous run you clicked  " + clickedprs + " times";
		button.show();
		x = 30;
		y = 30;
		
	}

	if (windowHeightb != windowHeight || windowWidthb != windowWidth) {
		console.log("new screen");
		createCanvas(windowWidth, windowHeight);
		windowHeightb = windowHeight;
		windowWidthb = windowWidth;
	}
}

function mouseClicked() {
	if (
		mouseX > x - size / 2 &&
		mouseX < x + size / 2 &&
		mouseY > y - size / 2 &&
		mouseY < y + size / 2
	) {
		changeposition();
		clicked += 1;
	}
}

function changeposition() {
	x = Math.floor(Math.random() * windowWidth);
	y = Math.floor(Math.random() * windowHeight);
}

function starts() {
	playings = true;
}

	
var timergame = setInterval(function () {
		
	if(!playings){return;}else{timeleft -= 1; previoustime -= 1};
	
	console.log(timeleft);
	if(timeleft == previoustime && playings == true){
		previoustime = timeleft + 1
		console.log(previoustime)
	}
	if (timeleft <= 0) {
		playings = false;
		if (clicked > clickedpb) {
			clickedpb = clicked;
		}
		if(clicked > alltimere){
			alltimere = clicked
			document.cookie = "record=" + alltimere + "; expires=Tues, 18 Dec 3068 12:00:00 UTC"; 
			console.log(document.cookie)
			
		}
		clickedprs = clicked;
		clicked = 0;
		timeleft = maxlimittime;
		previoustime = maxlimittime;
	}
	if(timeleft > maxlimittime){cheaterrr()}else if(timeleft > previoustime){cheaterrr()}
		
}, 1000);

function cheaterrr(){
	playings = false;
	cheaterr = true;
	myAudio = new Audio('./music/cheater.mp3');
	myAudio.play(); 
	myAudio.loop = true;
}







