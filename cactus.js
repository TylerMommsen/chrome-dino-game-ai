class Cactus extends Obstacle {
	constructor() {
		let cactusProperties = Cactus.initCactus();
		super(cactusProperties.x, cactusProperties.y, cactusProperties.width, cactusProperties.height);

		this.cactusImg = cactusProperties.cactusImg;
	}

	static initCactus() {
		let randomCactusIndex = floor(random(0, 6));
		let cactusImg = allCactiImgs[randomCactusIndex];
		let cactusWidth = cactusImg.width;
		let cactusHeight = cactusImg.height;
		let x = width + 225;
		let y = height - 206 - cactusHeight;
		return {
			x: x,
			y: y,
			width: cactusWidth,
			height: cactusHeight,
			cactusImg: cactusImg,
		};
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
