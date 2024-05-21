class Species {
	constructor(player) {
		this.players = []; // players in this species
		this.bestFitness = 0;
		this.champion; // the best player of this species
		this.averageFitness = 0; // average fitness of this species
		this.staleness = 0; // how many generation with no improvement
		this.benchmarkBrain;

		// coefficients for testing compatibility on whether to add to species or not
		this.excessCoeff = 1;
		this.weightDiffCoeff = 0.5;
		this.compatibilityThreshold = 3;

		if (player) {
			this.players.push(player);
			this.bestFitness = player.fitness;
			this.benchmarkBrain = player.brain.clone();
			this.champion = player.clone();
		}
	}

	// checks how similar a player is to the players of this species by comparing weights
	isSameSpecies(genome) {
		let compatibility;
		let excessAndDisjoint = this.getExcessAndDisjoint(genome, this.benchmarkBrain); // get the number of excess and disjoint genes between this player and the current species rep
		let averageWeightDiff = this.averageWeightDiff(genome, this.benchmarkBrain); // get the average weight difference between matching genes

		let largeGenomerNormalizer = genome.connections.length - 20;
		if (largeGenomerNormalizer < 1) {
			largeGenomerNormalizer = 1;
		}

		// compatibility formula
		compatibility =
			(this.excessCoeff * excessAndDisjoint) / largeGenomerNormalizer +
			this.weightDiffCoeff * averageWeightDiff;

		return this.compatibilityThreshold > compatibility;
	}

	// returns the number of excess and disjoint connections between the 2 brains
	// (returns the number of connections which dont match)
	getExcessAndDisjoint(brain1, brain2) {
		let matching = 0.0;
		for (let i = 0; i < brain1.connections.length; i++) {
			for (let j = 0; j < brain2.connections.length; j++) {
				if (brain1.connections[i].innovationNumber === brain2.connections[j].innovationNumber) {
					matching++;
					break;
				}
			}
		}
		return brain1.connections.length + brain2.connections.length - 2 * matching;
	}

	// returns the average weight difference between matching connections in the input brains
	averageWeightDiff(brain1, brain2) {
		if (brain1.connections.length === 0 || brain2.connections.length === 0) {
			return 0;
		}

		let matching = 0;
		let totalDifference = 0;

		for (let i = 0; i < brain1.connections.length; i++) {
			for (let j = 0; j < brain2.connections.length; j++) {
				if (brain1.connections[i].innovationNumber === brain2.connections[j].innovationNumber) {
					matching++;
					totalDifference += abs(brain1.connections[i].weight - brain2.connections[j].weight);
					break;
				}
			}
		}

		if (matching === 0) {
			return 100;
		}
		return totalDifference / matching;
	}

	// pretty understandable
	addToSpecies(player) {
		this.players.push(player);
	}

	// sort players from highest to lowest fitness in the species
	sortSpecies() {
		let temp = [];

		for (let i = 0; i < this.players.length; i++) {
			let max = 0;
			let maxIndex = 0;
			for (let j = 0; j < this.players.length; j++) {
				if (this.players[j].fitness > max) {
					max = this.players[j].fitness;
					maxIndex = j;
				}
			}
			temp.push(this.players[maxIndex]);

			this.players.splice(maxIndex, 1);
			i--;
		}

		arrayCopy(temp, this.players);

		if (this.players.length === 0) {
			this.staleness = 200;
			return;
		}

		if (this.players[0].fitness > this.bestFitness) {
			this.staleness = 0;
			this.bestFitness = this.players[0].fitness;
			this.benchmarkBrain = this.players[0].brain.clone();
			this.champion = this.players[0].clone();
		} else {
			this.staleness++;
		}
	}

	// ruthlessly kill the weakest 50% of the species
	killWeakest() {
		if (this.players.length > 2) {
			for (let i = this.players.length / 2; i < this.players.length; i++) {
				this.players.splice(i, 1);
				i--;
			}
		}
	}

	// in order to protect unique players, the fitnesses of each player is divided by the number of players in the species that the player belongs to
	fitnessSharing() {
		for (let i = 0; i < this.players.length; i++) {
			this.players[i].fitness /= this.players.length;
		}
	}

	// calculate the average fitness of a species
	setAverageFitness() {
		let totalFitness = 0;

		for (let i = 0; i < this.players.length; i++) {
			totalFitness += this.players[i].fitness;
		}

		this.averageFitness = totalFitness / this.players.length;
	}

	// selects a player based on it's fitness
	selectPlayer() {
		let fitnessSum = 0;
		for (let i = 0; i < this.players.length; i++) {
			fitnessSum += this.players[i].fitness;
		}

		let rand = random(fitnessSum);
		let runningSum = 0;

		for (let i = 0; i < this.players.length; i++) {
			runningSum += this.players[i].fitness;
			if (runningSum > rand) {
				return this.players[i];
			}
		}

		// unreachable code
		return this.players[0];
	}

	// create a new child (clone the player)
	reproduce(innovationHistory) {
		let child;

		// 25% of the time there is no crossover and the child is just a clone
		if (random(1) < 0.25) {
			child = this.selectPlayer().clone();
		} else {
			// get 2 parents
			let parent1 = this.selectPlayer();
			let parent2 = this.selectPlayer();

			// the crossover function expects the highest fitness parent to be the object and the lowest as the argument
			if (parent1.fitness < parent2.fitness) {
				child = parent2.crossover(parent1);
			} else {
				child = parent1.crossover(parent2);
			}
		}

		child.brain.mutate(innovationHistory);
		return child;
	}
}
