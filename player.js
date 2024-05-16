class Player {
	constructor() {
		this.x = width / 6;
		this.y = height - 350;
		this.width = 132;
		this.height = 144;
		this.isGrounded = true;
		this.velocityY = 0;
		this.gravity = 1;

		this.animTimer = 0;
		this.displayRun1 = true;
	}

	move() {
		this.y -= this.velocityY;
		if (!this.isGrounded) {
			this.velocityY -= this.gravity;

			if (this.y > height - 350) {
				this.velocityY = 0;
				this.y = height - 350;
				this.isGrounded = true;
			}
		}
	}

	jump(isBigJump) {
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

	duck() {}

	update() {
		this.move();
		this.animTimer++;
		if (this.animTimer === 5) {
			this.animTimer = 0;
			this.displayRun1 = !this.displayRun1;
		}
	}

	show(runImg1, runImg2) {
		if (this.displayRun1) {
			image(runImg1, this.x, this.y, this.width, this.height);
		} else {
			image(runImg2, this.x, this.y, this.width, this.height);
		}
	}
}
