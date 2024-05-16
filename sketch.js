let ground;
let groundImg;
let dinoRun1Img;
let dinoRun2Img;
let dinoDuck1Img;
let dinoDuck2Img;
let dino;

function preload() {
	groundImg = loadImage("./assets/ground.png");
	dinoRun1Img = loadImage("./assets/dinorun1.png");
	dinoRun2Img = loadImage("./assets/dinorun2.png");
	dinoDuck1Img = loadImage("./assets/dinoduck1.png");
	dinoDuck2Img = loadImage("./assets/dinoduck2.png");
}

function setup() {
	createCanvas(2400, 1280);
	frameRate(60);

	ground = new Ground();
	dino = new Player();
}

function draw() {
	// logic

	// if the letter 's' is held down
	if (keyIsDown(83)) {
		dino.duck();
	}

	ground.update();
	dino.update();

	// visuals
	background(247);
	ground.show();
	dino.show();
}

function keyPressed() {
	if (key === "w") {
		dino.jump(true);
	}
	if (key === "e") {
		dino.jump(false);
	}
}

function keyReleased() {
	if (key === "s") {
		dino.stopDucking();
	}
}
