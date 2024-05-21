class Node {
	constructor(idNumber) {
		this.id = idNumber;
		this.layer = 0; // what layer the node is on, input layer is 0, output layer is 1
		this.inputValue = 0; // current sum before activation
		this.outputValue = 0; // after activation is applied
		this.outputConnections = []; // stores all outgoing connections from a node
	}

	// processes the node's input value using an activation function
	// and then propagates the result to the connected nodes
	engage() {
		// if the layer is not the input layer, i.e hidden or output, then use the activation function, sigmoid
		if (this.layer !== 0) {
			this.outputValue = this.sigmoid(this.inputValue);
		}

		// loop over all output connections from this node and propogate the values to the connected node's input
		for (let i = 0; i < this.outputConnections.length; i++) {
			if (this.outputConnections[i].enabled) {
				this.outputConnections[i].toNode.inputValue +=
					this.outputConnections[i].weight * this.outputValue;
			}
		}
	}

	sigmoid(x) {
		return 1.0 / (1.0 + pow(Math.E, -4.9 * x));
	}

	clone() {
		let clone = new Node(this.id);
		clone.layer = this.layer;
		return clone;
	}

	// checks if there is a connection between this node and another specified node.
	// this function is particularly useful when trying to add a new connection
	// to ensure that redundant or cyclic connections are not created.
	isConnectedTo(node) {
		// nodes on the same layer will not be connected
		if (node.layer === this.layer) {
			return false;
		}

		// if the other node is on a lower layer, we check its output connections to see if it connects to this node
		if (node.layer < this.layer) {
			for (let i = 0; i < node.outputConnections.length; i++) {
				if (node.outputConnections[i].toNode === this) {
					return true;
				}
			}
		} else {
			// if this node is on a lower layer, then check this nodes connections to see if it connects to the other node
			for (let i = 0; i < this.outputConnections.length; i++) {
				if (this.outputConnections[i].toNode === node) {
					return true;
				}
			}
		}

		return false;
	}
}
