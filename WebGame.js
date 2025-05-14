console.log("Testing connection");

var startButton;
var mouseX, mouseY;
var player;
var gameStart = false;

function loadGame(){
	gameScreen.start();
	startButton = new component(90, 30, "blue", 300, 120);
	startButton.update = function(){
		if(this.inside){
			color = "green";
		}else{
			color = "blue";
		}
		ctx = gameScreen.context;
		ctx.fillStyle = color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
	gameScreen.canvas.addEventListener('mousemove', MouseMoveStart);
	gameScreen.canvas.addEventListener('click', MouseClickStart);
}

function MouseMoveStart(event){
	const mousePos = getMousePos(gameScreen, event);
	mouseX = mousePos.x;
	mouseY = mousePos.y;
	startButton.inside = isInside(mouseX, mouseY, startButton.x, startButton.y, startButton.width, startButton.height);
	
}
function MouseClickStart(event){
	const mousePos = getMousePos(gameScreen, event);
		mouseX = mousePos.x;
		mouseY = mousePos.y;
		if(isInside(mouseX, mouseY, startButton.x, startButton.y, startButton.width, startButton.height)){
			startGame();
		}
}

function startGame(){
	gameStart = true;
	gameScreen.canvas.removeEventListener("mousemove", MouseMoveStart);
	gameScreen.canvas.removeEventListener("click", MouseClickStart);
	startButton = {};
	player = new component(10, 10, "red", 30, 30);
}

function getMousePos(canvas, event){
	const rect = gameScreen.canvas.getBoundingClientRect();
	return{x: event.clientX - rect.left,
	y: event.clientY - rect.top};
}

function component(width, height, color, x, y){
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.inside = isInside(mouseX, mouseY, this.x, this.y, this.width, this.height);
	this.update = function(){
		ctx = gameScreen.context;
		ctx.fillStyle = color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}

var gameScreen = {
	canvas : document.createElement("canvas"),
	start : function(){
		this.canvas.width = 720;
		this.canvas.height = 480;
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[2]);
		this.interval = setInterval(updateGameArea, 20);
	},
	clear : function(){
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}

function isInside(x, y, rectX, rectY, rectWidth, rectHeight){
	return x >= rectX && x <= rectX + rectWidth && y >= rectY && y <= rectY + rectHeight;
}

function updateGameArea(){
	gameScreen.clear();
	if(gameStart){
		player.update();
	}else{
		startButton.update();
	}
}
	

loadGame();