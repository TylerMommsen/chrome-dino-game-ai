let ground;
let groundImg;
let dinoRun1Img;
let dinoRun2Img;
let dinoDuck1Img;
let dinoDuck2Img;

let largeTripleCactusImg;
let largeDoubleCactusImg;
let largeSingleCactusImg;
let smallTripleCactusImg;
let smallDoubleCactusImg;
let smallSingleCactusImg;

let allCactiImgs = [];
let cactusSpawnTimer = 0;

let allCacti = [];

let dino;

let gameSpeed = 10;

function preload() {
	groundImg = loadImage("./assets/ground.png");
	dinoRun1Img = loadImage("./assets/dinorun1.png");
	dinoRun2Img = loadImage("./assets/dinorun2.png");
	dinoDuck1Img = loadImage("./assets/dinoduck1.png");
	dinoDuck2Img = loadImage("./assets/dinoduck2.png");

	largeTripleCactusImg = loadImage("./assets/cactuslargetriple.png");
	largeDoubleCactusImg = loadImage("./assets/cactuslargedouble.png");
	largeSingleCactusImg = loadImage("./assets/cactuslargesingle.png");
	smallTripleCactusImg = loadImage("./assets/cactussmalltriple.png");
	smallDoubleCactusImg = loadImage("./assets/cactussmalldouble.png");
	smallSingleCactusImg = loadImage("./assets/cactussmallsingle.png");
}

function setup() {
	createCanvas(2400, 1280);
	frameRate(60);

	allCactiImgs = [
		largeTripleCactusImg,
		largeDoubleCactusImg,
		largeSingleCactusImg,
		smallTripleCactusImg,
		smallDoubleCactusImg,
		smallSingleCactusImg,
	];

	ground = new Ground();
	dino = new Player();
}

function draw() {
	// ---- logic ----

	// spawn new cactus
	if (cactusSpawnTimer >= 100) {
		allCacti.push(new Cactus());
		cactusSpawnTimer = 0;
	}
	cactusSpawnTimer++;

	// if the letter 's' is held down then make the dino duck
	if (keyIsDown(83)) {
		dino.duck();
	}

	ground.update();
	dino.update();

	// update all cacti logic
	for (let i = 0; i < allCacti.length; i++) {
		allCacti[i].update();
	}

	// ---- visuals ----

	background(247);
	ground.show();
	// show all cacti
	for (let i = 0; i < allCacti.length; i++) {
		allCacti[i].show();
	}
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
