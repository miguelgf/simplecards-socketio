var Card = require('./card');

var Deck = function() {
	this.cards = [];

	var __construct = function(that) {
		// Create deck
		for (var i = 1; i <= 100; i++) {
			that.cards.push(new Card(i));
		}

	}(this); // Called

	this.subtractRandomCard = function() {
		var index = Math.floor(Math.random() * this.cards.length);

		value = this.cards[index];

		this.cards.splice(index, 1);

		return value;
	};

};

module.exports = Deck;