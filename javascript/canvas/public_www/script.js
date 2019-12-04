var canvas;
var ctx;
var running = 0;
var interval;

window.onload = function() {
	canvas = document.getElementById("mycanvas");
	ctx = canvas.getContext("2d");
}

function createRect() {
	let x = 0;
	let y = 0;
	let side = 0;
	let color = "#";
	const colorpicker = "0123456789abcdef"
	y = Math.floor((Math.random()*400)+1);
	x = Math.floor((Math.random()*400)+1);
	side = Math.floor((Math.random()*80)+20);
	for(let i=0;i<6;i++) {
		let temp = Math.floor(Math.random()*16);
		color = color + colorpicker[temp];
	}
	ctx.fillStyle = color;
	ctx.fillRect(x,y,side,side);
}

function startCanvas() {
	if(running) {
		clearInterval(interval);
		document.getElementById("startbutton").innerText="Start"
		running = 0;
	} else {
		interval = setInterval(createRect,200);
		document.getElementById("startbutton").innerText="Stop"
		running = 1;
	}
}

function clearCanvas() {
	ctx.clearRect(0,0,500,500);
}

function getMousePosition(e) {
	let rect = canvas.getBoundingClientRect();
	let tempX = Math.floor(e.clientX - rect.left);
	let tempY = Math.floor(e.clientY - rect.top);
	return {
		x:tempX,
		y:tempY
	}
}

function writeMessage(message) {
	ctx.clearRect(0,0,300,30);
	ctx.font = "18pt Arial";
	ctx.fillStyle = "black";
	ctx.fillText(message,10,20);
}


function canvasMouseMove(evt) {
	let mousePos = getMousePosition(evt);
	let message = "Mouse position:"+mousePos.x+","+mousePos.y;
	writeMessage(message);
	
}











