
var Deck = function() {
	this.cards = [];

	var __construct = function(that) {
		// Create deck
		for (var i = 1; i <= 100; i++) {
			that.cards.push(i);
		}

	}(this); // Called

	this.subtractRandomCard = function() {
		var index = Math.floor(Math.random() * this.cards.length);

		console.log("index", index);

		value = this.cards[index];

		this.cards.splice(index, 1);

		return value;
	}

}

module.exports = Deck;