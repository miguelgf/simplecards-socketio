var Deck = require('./deck.js');
var Player = require('./player.js');

var Game = function(numCards) {
	this.deck = new Deck();
	this.players = [];
	this.status = 0;
	this.cardsPerPlayer = numCards;

	var __construct = function() {
		// ...
	}(this); // Called

	this.setCardsPerPlayer = function(numCards) {
		this.cardsPerPlayer = numCards;
	}

	this.addPlayer = function(playerName) {
		console.log(playerName);

		this.players.push(new Player(playerName));
	}

	this.getNumPlayers = function() {
		return this.players.length;
	}

	this.startGame = function() {
		this.status = 1;

		// Deal the cards
		for (var pn = 0; pn < this.getNumPlayers(); pn++) {
			for (var i = 0; i < this.cardsPerPlayer; i++) {
				this.players[pn].addCard(this.deck.subtractRandomCard());
			}
		}

		this.printPretty();

	}

	this.printPretty = function() {
		
		console.log('----------------- GAME');
		console.log('Status', this.status);
		console.log('Players:');
		this.players[0].printPretty();
		this.players[1].printPretty();
		console.log('----------------- GAME');
	}

}

module.exports = Game;