class Player {
	constructor() {
		this.x = width / 6;
		this.y = height - 350;
		this.width = 132;
		this.height = 144;

		this.isGrounded = true;
		this.isDucking = false;
		this.velocityY = 0;
		this.gravity = 1;
		this.maxFallSpeed = 30;

		this.animTimer = 0;
		this.displayRun1 = true;
		this.displayDuck1 = false;

		this.obstacles = [];
		this.obstacleSpawnTimer = 50;
		this.obstacleIndex = 0;
		this.obstaclesPassed = new Set();

		// ai stuff

		this.isAlive = true;

		this.fitness = 0; // how good the dino performed as a combination of the below
		this.score = 0; // how long the dino survived
		this.totalJumps = 0; // screw em
		this.totalDucks = 0; // screw em
		this.birdsPassedWhileDucking = 0; // give them princess treatment if they duck under a bird
		this.birdsPassedWhileJumping = 0; // absolutely demolish their fitness if they jump over a STUPID BIRD

		this.decision = []; // what output the dino gives
		this.vision = [0, 0, 0, 0, 0, 0]; // what the dino sees

		this.inputs = 6;
		this.outputs = 3; // big jump, little jump, duck
		this.brain = new Genome(this.inputs, this.outputs);
	}

	move() {
		this.y -= this.velocityY;
		if (!this.isGrounded) {
			this.velocityY -= this.gravity;

			// check if dino is on the ground
			if (this.y > height - 350) {
				this.velocityY = 0;
				this.y = height - 350;
				this.isGrounded = true;
				if (this.isDucking) {
					this.width = 177;
				}
			}
		}
	}

	jump(isBigJump) {
		if (this.isDucking) {
			this.stopDucking();
		}

		if (this.isGrounded) {
			this.isGrounded = false;
			this.totalJumps++;

			if (isBigJump) {
				this.velocityY = 22;
				this.gravity = 1;
			} else {
				this.velocityY = 18;
				this.gravity = 1.2;
			}
		}
	}

	duck() {
		if (this.isDucking) return;

		this.isDucking = true;
		this.gravity = 5;
		this.totalDucks++;

		if (this.isGrounded) {
			this.width = 177;
		}
	}

	stopDucking() {
		this.isDucking = false;
		this.width = 132;
	}

	update() {
		this.move();

		this.animTimer++;
		if (this.animTimer === 5) {
			this.animTimer = 0;
			this.displayRun1 = !this.displayRun1;

			if (this.isDucking) {
				this.displayDuck1 = !this.displayDuck1;
			}
		}
	}

	show() {
		if (!this.isGrounded) {
			image(dinoRun2Img, this.x, this.y, this.width, this.height);
			return;
		}

		if (!this.isDucking) {
			if (this.displayRun1) {
				image(dinoRun1Img, this.x, this.y, this.width, this.height);
			} else {
				image(dinoRun2Img, this.x, this.y, this.width, this.height);
			}
		} else {
			if (this.isGrounded) {
				if (this.displayDuck1) {
					image(dinoDuck1Img, this.x, this.y, this.width, this.height);
				} else {
					image(dinoDuck2Img, this.x, this.y, this.width, this.height);
				}
			}
		}
	}

	// ai stuff

	closestObstacle() {
		for (let i = 0; i < allObstacles.length; i++) {
			if (allObstacles[i].passed === false) {
				return i;
			}
		}
	}

	look() {
		this.vision = [0, 0, 0, 0, 0, 0];

		// find closest obstacle
		let closestObstacleIndex = this.closestObstacle();
		let closestObstacle = allObstacles[closestObstacleIndex];

		if (!closestObstacle) {
			return;
		}

		// get distance to closest obstacle
		let distanceToObstacle = abs(
			closestObstacle.x + closestObstacle.width / 2 - this.x + this.width / 2
		);

		// get the gap between the next two obstacles
		let gapBetweenObstacles = 0;
		if (allObstacles[closestObstacleIndex + 1]) {
			let nextObstacle = allObstacles[closestObstacleIndex + 1];
			gapBetweenObstacles = nextObstacle.x - (closestObstacle.x + closestObstacle.width);
		}

		this.vision[0] = map(this.y, 930, 677, 0, 1);
		this.vision[1] = map(distanceToObstacle, 0, 2400, 1, 0);
		this.vision[2] = map(closestObstacle.width, 0, 225, 0, 1);
		this.vision[3] = map(closestObstacle.height, 0, 144, 0, 1);

		if (closestObstacle.isBird) {
			this.vision[4] = map(abs(closestObstacle.y + closestObstacle.height - this.y), 0, 62, 0, 1);
		} else {
			this.vision[4] = 0;
		}

		this.vision[5] = map(gameSpeed, 10, 40, 0, 1);
	}

	think() {
		this.decision = this.brain.feedForward(this.vision);

		// find out which decision had the highest value
		let maxDecisionValue = Math.max(...this.decision);
		let actionIndex = this.decision.indexOf(maxDecisionValue);

		if (maxDecisionValue < 0.7) {
			this.stopDucking();
			return;
		}

		switch (actionIndex) {
			case 0:
				this.jump(true);
				break;
			case 1:
				this.jump(false);
				break;
			case 2:
				this.duck();
				break;
		}
	}

	calculateFitness() {
		this.fitness = this.score;
		this.fitness -= this.totalJumps * 5; // JUMP = BADDD
		this.fitness -= this.birdsPassedWhileJumping * 50; // JUMPING OVER BIRD = BADDD
		this.fitness += this.birdsPassedWhileDucking * 100; // DUCKING UNDER BIRD = YES PLEASE

		if (this.fitness > 0) {
			this.fitness = this.fitness * this.fitness;
		} else {
			this.fitness = 0;
		}
	}

	clone() {
		let clone = new Player();
		clone.brain = this.brain.clone();
		// clone.fitness = this.fitness;
		clone.brain.generateNetwork();
		return clone;
	}

	crossover(parent2) {
		let child = new Player();
		child.brain = this.brain.crossover(parent2.brain);
		child.brain.generateNetwork();
		return child;
	}

	visualizeClosestObstacle() {
		let closestObstacleIndex = this.closestObstacle();
		if (allObstacles[closestObstacleIndex]) {
			let closestObstacle = allObstacles[closestObstacleIndex];
			stroke(255, 0, 0);
			line(this.x + this.width / 2, this.y, closestObstacle.x + closestObstacle.width / 2, this.y);
		}
	}
}
