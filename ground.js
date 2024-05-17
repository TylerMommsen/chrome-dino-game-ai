class Ground {
	constructor() {
		this.y = height - 335;
		this.width = 2400;
		this.height = 144;

		this.ground1X = 0;
		this.ground2X = 2400;
	}

	move() {
		this.ground1X -= gameSpeed;
		this.ground2X -= gameSpeed;
		if (this.ground1X === -2400) {
			this.ground1X = 0;
			this.ground2X = 2400;
		}
	}

	update() {
		this.move();
	}

	show() {
		image(groundImg, this.ground1X, this.y, this.width, this.height);
		image(groundImg, this.ground2X, this.y, this.width, this.height);
	}
}
