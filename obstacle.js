class Obstacle {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	offScreen() {
		return this.x < -300;
	}

	collidedWithPlayer(isBird) {
		if (dino.x + 30 + dino.width - 60 > this.x && dino.x + 30 < this.x + this.width) {
			if (dino.isDucking) {
				if (dino.y + 60 > this.y && dino.y + 60 < this.y + this.height) {
					return true;
				}
			} else {
				if (isBird) {
					if (dino.y + 30 > this.y && dino.y + 30 < this.y + this.height) {
						return true;
					}
				} else {
					if (dino.y + 30 + dino.height - 60 > this.y) {
						return true;
					}
				}
			}
		}
		return false;
	}
}
