class Player {
	constructor() {
		this.x = width / 6;
		this.y = height - 300;
		this.width = 88;
		this.height = 96;

		this.animTimer = 0;
		this.displayRun1 = true;
	}

	move() {}

	update() {
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
