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
let cactusSpawnTimer = 50;

let allCacti = [];

let dino;

let gameSpeed = 10;
let score = 0;
let font;

let gameOver = false;

let visualizationMode = false;

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

	font = loadFont("./assets/PublicPixel.ttf");
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

	if (gameOver) return;

	// spawn new cactus
	if (cactusSpawnTimer >= 100) {
		allCacti.push(new Cactus());
		cactusSpawnTimer = getRandomInterval();
	}
	cactusSpawnTimer++;

	// if the letter 's' is held down then make the dino duck
	if (keyIsDown(83)) {
		dino.duck();
	}

	ground.update();
	dino.update();
	score += gameSpeed / 60;

	// update all cacti logic
	for (let i = 0; i < allCacti.length; i++) {
		allCacti[i].update();

		if (allCacti[i].collidedWithPlayer()) gameOver = true;

		if (allCacti[i].offScreen()) {
			allCacti.splice(i, 1);
			i--;
		}
	}

	// ---- visuals ----

	background(247);
	ground.show();
	// show all cacti
	for (let i = 0; i < allCacti.length; i++) {
		allCacti[i].show();
	}
	dino.show();

	if (visualizationMode) {
		visualizeHitBoxes();
	}

	textFont(font);
	fill(53);
	noStroke();
	textSize(40);
	let paddedScore = padScore(floor(score));
	let scoreText = "Score: " + paddedScore;
	let scoreWidth = textWidth(scoreText);
	text(scoreText, width - scoreWidth - 100, 100);
}

// add 0's to the score display
function padScore(score) {
	let scoreStr = score.toString();
	while (scoreStr.length < 5) {
		scoreStr = "0" + scoreStr;
	}
	return scoreStr;
}

// add some randomness to the cactus spawns by changing the interval every time
function getRandomInterval() {
	return int(random(-30, 30));
}

function visualizeHitBoxes() {
	// visualize dino hitbox
	stroke(255, 0, 0);
	noFill();
	rect(dino.x + 30, dino.y + 30, dino.width - 60, dino.height - 60);

	// visualize obstacles
	for (let i = 0; i < allCacti.length; i++) {
		let obstacle = allCacti[i];

		rect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
	}
}

function keyPressed() {
	if (key === "w" || " ") {
		dino.jump(true);
	}
	if (key === "e") {
		dino.jump(false);
	}
	if (key === "v") {
		visualizationMode = !visualizationMode;
	}
}

function keyReleased() {
	if (key === "s") {
		dino.stopDucking();
	}
}
