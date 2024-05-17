class Cactus {
	constructor() {
		this.x = width + 250;
		this.y;
		this.width;
		this.height;
		this.cactusImg;

		this.cactusType = this.initCactus();
	}

	initCactus() {
		let randomCactusIndex = floor(random(0, 6));
		console.log(randomCactusIndex);
		this.cactusImg = allCactiImgs[randomCactusIndex];
		this.width = this.cactusImg.width;
		this.height = this.cactusImg.height;
		this.y = height - 206 - this.height;
	}

	move() {
		this.x -= gameSpeed;
	}

	update() {
		this.move();
	}

	show() {
		image(this.cactusImg, this.x, this.y, this.width, this.height);
	}
}
