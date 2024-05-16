class Ground {
	constructor() {
		this.y = height - 335;
		this.width = 2400;
		this.height = 144;
		this.speed = 10;

		this.ground1X = 0;
		this.ground2X = 2400;
	}

	move() {
		this.ground1X -= this.speed;
		this.ground2X -= this.speed;
		if (this.ground1X === -2400) {
			this.ground1X = 0;
			this.ground2X = 2400;
		}
	}

	update() {
		this.move();
	}

	show(img) {
		image(img, this.ground1X, this.y, this.width, this.height);
		image(img, this.ground2X, this.y, this.width, this.height);
	}
}
