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
			}
		}
	}

	jump(isBigJump) {
		if (this.isDucking) return;

		if (this.isGrounded) {
			this.isGrounded = false;

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
		this.isDucking = true;
		this.gravity = 5;

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
		if (!this.isDucking || !this.isGrounded) {
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
}
