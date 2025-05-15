var startButton;
var mouseX, mouseY;
var questionTest, questionTest2;
var currentQuestion = -1;
var correctAnswers = 0;
var questions = new Array(new Question("Pick a choice", [ "a", "b", "c", "d*", "e"], 3), new Question("Pick another choice", [ "a", "b", "e*", "f"], 2));
var components = new Array();

function loadGame(){
	gameScreen.start();
	startButton = new component(90, 30, "blue", 300, 120, "Start");
	components.push(startButton);
	gameScreen.canvas.addEventListener('mousemove', MouseMove);
	gameScreen.canvas.addEventListener('click', MouseClick);
}

function startGame(){
	currentQuestion = 0;
	components.forEach(function(item, index){
		if(item == startButton){
			components.splice(index);
		}
	});
	gameScreen.canvas.removeEventListener("mousemove", MouseMove);
	nextQuestion(currentQuestion);
}
function nextQuestion(currentQuestion){
	components = [];
	components.push(questions[currentQuestion]);
	questions[currentQuestion].answers.forEach(function(item, index){
			answer = new component(90, 30, "red", 300, 120 + ((index + 1) * 40), item);
			components.push(answer);
	});
}

function Question(question, answers, correct){
	this.question = question;
	this.answers = answers;
	this.correct = correct;
	this.update = function(){
		ctx = gameScreen.context;
		ctx.font = "40px serif";
		ctx.fillStyle = "black";
		ctx.textAlign = "center";
		ctx.fillText(this.question, ctx.canvas.width/2, 50);
	}
}

function MouseMove(event){
	const mousePos = getMousePos(gameScreen, event);
	mouseX = mousePos.x;
	mouseY = mousePos.y;
	startButton.inside = isInside(mouseX, mouseY, startButton.x, startButton.y, startButton.width, startButton.height);
	if(startButton.inside){
		startButton.color = "green";
	}else{
		startButton.color = "blue";
	}
}
function MouseClick(event){
	const mousePos = getMousePos(gameScreen, event);
		mouseX = mousePos.x;
		mouseY = mousePos.y;
		
		if(isInside(mouseX, mouseY, startButton.x, startButton.y, startButton.width, startButton.height)){
			startGame();
		}
		components.forEach(function(item){
			if(isInside(mouseX, mouseY, item.x, item.y, item.width, item.height)){
				console.log(item.text);
				if(questions[currentQuestion].answers.indexOf(item.text) == questions[currentQuestion].correct){
					correctAnswers++;
				}
				currentQuestion++;
				if(currentQuestion < questions.length){
					if(currentQuestion == -1){
						startGame();
					}else{
						nextQuestion(currentQuestion);
					}
				}else{
					console.log("Correct answers: " + correctAnswers);
					components = [];
				}
			}
		});
}

function getMousePos(canvas, event){
	const rect = gameScreen.canvas.getBoundingClientRect();
	return{x: event.clientX - rect.left,
	y: event.clientY - rect.top};
}

function component(width, height, color, x, y, text){
	this.width = width;
	this.height = height;
	this.color = color;
	this.x = x;
	this.y = y;
	this.text = text;
	this.inside = isInside(mouseX, mouseY, this.x, this.y, this.width, this.height);
	this.update = function(){
		ctx = gameScreen.context;
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.font = "20px serif";
		ctx.fillStyle = "white";
		ctx.textAlign = "center";
		ctx.fillText(this.text, this.x + this.width/2, this.y + this.height*2/3);
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
	components.forEach(function(item){
			item.update();
		});
}
	
loadGame();