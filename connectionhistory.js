class ConnectionHistory {
	constructor(fromNode, toNode, innovationNum, innovationNumbers) {
		this.fromNode = fromNode;
		this.toNode = toNode;
		this.innovationNumber = innovationNum;
		this.innovationNumbers = []; // the innovation numbers from the connections of the genome which first has this mutation
		// this represents the genome and allows us to test if another genome is the same
		// thisis before this connection was added

		arrayCopy(innovationNumbers, this.innovationNumbers);
	}

	// returns whether the genome matches the original genome and the connection is between the same nodes
	matches(genome, fromNode, toNode) {
		if (genome.connections.length === this.innovationNumbers.length) {
			if (fromNode.id === this.fromNode && toNode.id === this.toNode) {
				// next check if all the innovation numbers match from the genome
				for (let i = 0; i < genome.connections.length; i++) {
					if (!this.innovationNumbers.includes(genome.connections[i].innovationNumber)) {
						return false;
					}
				}

				// if reached this far then the innovation numbers match the connections innovation numbers and the connection is between the same nodes so it does match
				return true;
			}
		}
		return false;
	}
}
