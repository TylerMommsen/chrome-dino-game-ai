class Connection {
	constructor(fromNode, toNode, weight, innovationNumber) {
		this.fromNode = fromNode;
		this.toNode = toNode;
		this.weight = weight;
		this.enabled = true;
		this.innovationNumber = innovationNumber;
	}

	// 10% chance of a large mutation and 90% chance of a small mutation
	mutateWeight() {
		if (random(1) < 0.1) {
			this.weight = random(-1, 1);
		} else {
			this.weight += randomGaussian() / 50;

			if (this.weight > 1) this.weight = 1;
			if (this.weight < -1) this.weight = -1;
		}
	}

	// create copy of the connection
	clone(fromNode, toNode) {
		let clone = new Connection(fromNode, toNode, this.weight, this.innovationNumber);
		clone.enabled = this.enabled;
		return clone;
	}
}
