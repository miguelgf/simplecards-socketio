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

	this.addPlayer = function(playerName, socket) {
		this.players.push(new Player(playerName, socket));
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

			this.players[pn].emit("dealt", {cards: this.players[pn].cards});
		}

		this.emitPlayers('startGame', {'players': this.players.map(function(p) { return p.username; })});

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

	this.emitPlayers = function(eventName, payload) {
		// console.log("Emit:", eventName, payload);

		for (var pn = 0; pn < this.getNumPlayers(); pn++) {
			// console.log("Emit p" + pn + " (Socket: " + this.players[pn].socket.id + "):", eventName, payload);
			this.players[pn].emit(eventName, payload);
		}
	}

}

module.exports = Game;