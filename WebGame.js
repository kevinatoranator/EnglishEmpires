console.log("Testing connection");

var startButton;
var mouseX, mouseY;

function startGame(){
	gameScreen.start();
	startButton = new component(90, 30, "blue", 300, 120);
	gameScreen.canvas.addEventListener('mousemove', (event) =>{
		const mousePos = getMousePos(gameScreen, event);
		mouseX = mousePos.x;
		mouseY = mousePos.y;
		startButton.inside = isInside(mouseX, mouseY, startButton.x, startButton.y, startButton.width, startButton.height);
		console.log(startButton.inside);
	});
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
		if(this.inside){
			color = "green";
		}else{
			color = "blue";
		}
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
	startButton.update();
}
	

startGame();