//square sizes
let x, y, size;
x = 30;
y = 30;
size = 55;

//for the full screen
let windowWidthb, windowHeightb;


let playings = false, button;

//clicked = while in run, clickedpb = pb in session, clikedprs =  previous record, alltimere = alltime record
let clicked = 0, clickedpb = 0, clickedprs = 0, alltimere;
if(alltimere == undefined){
	alltimere = 0;
}else{
	getCookie("record");
}

//cheater function, maxlimittime = maxtimer, timeleft = timeleft while counting, cheaterr = if cheating, previoustime = maxlimittime(for cheating reasons)
let maxlimittime = 15;
let timeleft = maxlimittime;
let cheaterr = false;
let previoustime = maxlimittime;


//getting cookies, good = https://plainjs.com/javascript/utilities/set-cookie-get-cookie-and-delete-cookie-5/
//original src = https://stackoverflow.com/questions/10730362/get-cookie-by-name
function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
}
//windowsheightb and widhtb = so it doesnt forget the previous screen
//button create start button
function setup() {
	windowHeightb = windowHeight;
	windowWidthb = windowWidth;
	createCanvas(windowWidth, windowHeight);
	
	rectMode(CENTER);
	button = createButton("click me to start the new game");button.position(640, 640);button.mousePressed(starts);
	
}

//backround so clears backround every second
//playings, true, "deletes" all text, hides button, sets the square
//cheater == true, exposes the cheater, hides button, sets text = to cheater
//playings = false, "puts text back", resets square vars, shows button
//window thing, if past windows is not new window, create a new canvas, and reset the previous var to be again the same
function draw() {
	background(255);
	if (playings == true && cheaterr == false) {playing()}else if (playings == false && cheaterr == false) {notplaying()}
	if (windowHeightb != windowHeight || windowWidthb != windowWidth) {changescreen()}
}
//when mouseclicked on the square adds the new clicked, and calls the changeposition function
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
//changes position of the variables of the square
function changeposition() {
	x = Math.floor(Math.random() * windowWidth);
	y = Math.floor(Math.random() * windowHeight);
}
//just the function for the button to work
function starts() {playings = true;}

var timergame = setInterval(function () {
	//if not playing, dont count, if so count
	if(!playings){return;}else{timeleft -= 1; previoustime -= 1};
	//just to know
	console.log(timeleft);
	//just so previous time is always one behind time left
	if(timeleft == previoustime && playings == true){
		previoustime = timeleft + 1
		console.log(previoustime)
	}
	if (timeleft <= 0) {
		//stops playing
		playings = false;
		//se if its current session pb, and if so changes the var
		if (clicked > clickedpb) {
			clickedpb = clicked;
		}
		//se if its all time pb, and if so changes the cookie
		if(clicked > alltimere){
			alltimere = clicked
			document.cookie = "record=" + alltimere + "; expires=Tues, 18 Dec 3068 12:00:00 UTC"; 
			console.log(document.cookie)
			
		}
		//reset some stuff
		//put previous run correct
		clickedprs = clicked;
		//resets clicked
		clicked = 0;
		//resets so its back to original value
		timeleft = maxlimittime;
		previoustime = maxlimittime;
	}
	//if timeleft is more than maxlimittime then cheat, timeleft bigger or same = cheatter, and verifys we are playing
	if(timeleft > maxlimittime || timeleft > previoustime && playings == true){cheaterrr()}
		
}, 1000);

//puts playing false, cheatter as true, and plays rick roll
function cheaterrr(){
	let once = false;
	playings = false;
	cheaterr = true;
	if(once == false){
		myAudio = new Audio('./music/cheater.mp3');
		myAudio.play(); 
		myAudio.loop = true;
		once = true;
	}
	document.getElementById("recordsession").innerHTML ="CHEATER";
	document.getElementById("alltime").innerHTML = "CHEATER";
	document.getElementById("beforesss").innerHTML = "CHEATER";
	button.hide;
	
}



function playing(){
	square(x, y, size);
	console.log("x is " + x + " y is " + y);
	button.hide();
	document.getElementById("recordsession").innerHTML = "";
	document.getElementById("alltime").innerHTML = "";
	document.getElementById("beforesss").innerHTML = "";
}

function notplaying(){
	document.getElementById("recordsession").innerHTML =
		"The record in this session is " + clickedpb;
	document.getElementById("alltime").innerHTML = "Your all time record is " + getCookie("record");
	document.getElementById("beforesss").innerHTML = "The previous run you clicked  " + clickedprs + " times";
	button.show();
	x = 30;
	y = 30;
}

function changescreen(){
	console.log("new screen widht is " + windowWidth + " and height is " + windowHeight);
	createCanvas(windowWidth, windowHeight);
	windowHeightb = windowHeight;
	windowWidthb = windowWidth;
}