var Player = function(playerName) {
	this.username = playerName;
	this.cards = [];

	var __construct = function() {
		// ...
	}(this); // Called

	this.addCard = function(c) {
		this.cards.push(c);
	}

	this.printPretty = function() {
		console.log(this);
	}

}

module.exports = Player;