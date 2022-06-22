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
let timeleft = 15;
// let timers;
let clickedprs = 0;
let alwaystrue = true;
let record;
let alltimere

function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
}

function setup() {
	windowHeightb = windowHeight;
	windowWidthb = windowWidth;
	createCanvas(windowWidth, windowHeight);
	// square(x, y, size);
	rectMode(CENTER);
	button = createButton("click me to start the new game");
	button.position(640, 640);
	button.mousePressed(starts);
	// textSize(32);
	// text("pb is", 10, 30);
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
		
	} else if (playings == false) {
		timeleft = 15;
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
		
	timeleft -= 1;
	
	console.log(timeleft);
	if (timeleft <= 0) {
		playings = false;
		if (clicked > clickedpb) {
			clickedpb = clicked;
		}
		if(clicked > alltimere){
			alltimere = clicked
			
			record = getCookie("record");//"bobthegreat@gmail.com"
			
			document.cookie = "record=" + alltimere + "; expires=Thu, 18 Dec 2013 12:00:00 UTC"; 
			
		}
		clickedprs = clicked;
		clicked = 0;
	}
		
}, 1000);






