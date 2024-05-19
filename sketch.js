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

let allObstacleImgs = [];
let obstacleSpawnTimer = 50;

let allObstacles = [];

let dino;

let gameSpeed = 10;
let speedIncrement = 0.5;
let score = 0;
let lastScoreMilestone = 0;

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

	birdImg1 = loadImage("./assets/bird1.png");
	birdImg2 = loadImage("./assets/bird2.png");

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

	if (gameOver) {
		console.log("game over");
		return;
	}

	// spawn new cactus
	if (obstacleSpawnTimer >= 110 - gameSpeed) {
		if (random(1) < 0.9) {
			allObstacles.push(new Cactus());
		} else {
			allObstacles.push(new Bird());
		}
		obstacleSpawnTimer = getRandomInterval();
	}
	obstacleSpawnTimer++;

	// if the letter 's' is held down then make the dino duck
	if (keyIsDown(83)) {
		dino.duck();
	}

	ground.update();
	dino.update();
	score += gameSpeed / 60;
	if (floor(score) - lastScoreMilestone >= 100) {
		lastScoreMilestone = floor(score);
		gameSpeed += speedIncrement;
	}

	// update all obstacle logic
	for (let i = 0; i < allObstacles.length; i++) {
		allObstacles[i].update();

		if (allObstacles[i].isBird) {
			if (allObstacles[i].collidedWithPlayer(true)) {
				gameOver = true;
			}
		} else {
			if (allObstacles[i].collidedWithPlayer(false)) {
				gameOver = true;
			}
		}

		if (allObstacles[i].offScreen()) {
			allObstacles.splice(i, 1);
			i--;
		}
	}

	// ---- visuals ----

	background(247);
	ground.show();
	// show all obstacles
	for (let i = 0; i < allObstacles.length; i++) {
		allObstacles[i].show();
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
	if (dino.isDucking) {
		rect(dino.x + 30, dino.y + 60, dino.width - 60, dino.height - 60);
	} else {
		rect(dino.x + 30, dino.y + 30, dino.width - 60, dino.height - 60);
	}

	// visualize obstacles
	for (let i = 0; i < allObstacles.length; i++) {
		let obstacle = allObstacles[i];

		rect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
	}
}

function keyPressed() {
	if (key === "w") {
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
