let ground;
let dinoRun1Img;
let dino;

function preload() {
	groundImg = loadImage("./assets/ground.png");
	dinoRun1Img = loadImage("./assets/dinorun1.png");
	dinoRun2Img = loadImage("./assets/dinorun2.png");
}

function setup() {
	createCanvas(2400, 1280);
	frameRate(60);

	ground = new Ground();
	dino = new Player();
}

function draw() {
	// logic
	ground.update();
	dino.update();

	// visuals
	background(247);
	ground.show(groundImg);
	dino.show(dinoRun1Img, dinoRun2Img);
}
