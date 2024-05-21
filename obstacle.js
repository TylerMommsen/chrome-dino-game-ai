class Obstacle {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		// for ai
		this.passed = false;
	}

	offScreen() {
		return this.x < -300;
	}

	collidedWithPlayer(player, isBird) {
		if (player.x + 30 + player.width - 60 > this.x && player.x + 30 < this.x + this.width) {
			if (player.isDucking) {
				if (player.y + 60 > this.y && player.y + 60 < this.y + this.height) {
					return true;
				}
			} else {
				if (isBird) {
					if (
						(player.y + 30 > this.y && player.y + 30 < this.y + this.height) ||
						(player.y + player.height - 30 < this.y + this.height &&
							player.y + player.height - 30 > this.y)
					) {
						return true;
					}
				} else {
					if (player.y + 30 + player.height - 60 > this.y) {
						return true;
					}
				}
			}
		}
		return false;
	}

	playerPassed(player) {
		if (player.x > this.x + this.width) {
			return true;
		}
		return false;
	}

	playerPassedForAI(player) {
		if (this.passed) return;

		if (player.x > this.x + this.width) {
			this.passed = true;
		}
	}
}
