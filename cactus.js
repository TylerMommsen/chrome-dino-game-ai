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

	offScreen() {
		if (this.x < -300) {
			return true;
		}

		return false;
	}

	collidedWithPlayer() {
		if (dino.x + 30 + dino.width - 60 > this.x && dino.x + 30 < this.x + this.width) {
			if (dino.isDucking) {
				if (dino.y + dino.height / 2 > this.y) {
					return true;
				}
			} else {
				if (dino.y + 30 + dino.height - 60 > this.y) {
					return true;
				}
			}
		}
		return false;
	}
}
