class Ground {
	constructor() {
		this.y = height - 335;
		this.width = 2400;
		this.height = 144;
		this.xOffset = 0;

		// this.grounds = [{ x: 0 }, { x: this.width }, { x: this.width * 2 }];
	}

	move() {
		this.xOffset -= gameSpeed;

		if (this.xOffset <= -this.width) {
			this.xOffset += this.width;
		}
	}

	update() {
		this.move();
	}

	show() {
		for (let i = 0; i <= width / this.width + 1; i++) {
			let x = i * this.width + this.xOffset;
			image(groundImg, x, this.y, this.width, this.height);
		}
	}
}
