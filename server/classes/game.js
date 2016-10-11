var Deck = require('./deck.js');
var Player = require('./player.js');
var Card = require('./card.js');

var Game = function(numCards) {
	this.deck = new Deck();
	this.players = [];
	this.status = 0;
	this.cardsPerPlayer = numCards;
	this.currentlyPlayed = 0;

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

		this.dealCards();
		this.emitPlayers('startGame', {'players': this.players.map(function(p) { return p.username; })});
		this.printPretty();
	}

	this.dealCards = function() {
		// Deal the cards
		for (var pn = 0; pn < this.getNumPlayers(); pn++) {
			for (var i = 0; i < this.cardsPerPlayer; i++) {
				this.players[pn].addCard(this.deck.subtractRandomCard());
			}	
		}

		this.refreshCards();
	}

	this.endTurn = function() {
		var result = this.players[0].currentCard.compare(this.players[1].currentCard);

		/*console.log('Compare card P1: ');
		this.players[0].currentCard.prettyPrint();
		console.log('Against card P2: ');
		this.players[1].currentCard.prettyPrint();

		console.log('Result' + result);
		*/
		var winner;

		if (result == 1) {
			this.players[1].removeCard(this.players[1].currentCard);
			this.players[0].addCard(this.players[1].currentCard);
			winner = this.players[0].username;
		} else if (result == -1) {
			this.players[0].removeCard(this.players[0].currentCard);
			this.players[1].addCard(this.players[0].currentCard);

			winner = this.players[1].username;
		} else {
			// Draw (in theory impossible, we don't have two cards equals :-P )
			winner = 'draw';
		}

		// console.log('Winner: ' + winner);

		this.players[0].currentCard = null;
		this.players[1].currentCard = null;
		game.currentlyPlayed = 0;

		// game.printPretty();

		// Emit dealt to each player their cards
		this.refreshCards();

		// Emit turnResult all players
		this.emitPlayers('turnResult', {winner: winner})
	}

	this.refreshCards = function() {
		for (var pn = 0; pn < this.getNumPlayers(); pn++) {
			this.players[pn].cards.sort(function(a, b) {
				return a.compare(b);
			});

			this.players[pn].emit("dealt", {cards: this.players[pn].cards});
		}
	}

	this.emitPlayers = function(eventName, payload) {
		// console.log("Emit:", eventName, payload);

		for (var pn = 0; pn < this.getNumPlayers(); pn++) {
			// console.log("Emit p" + pn + " (Socket: " + this.players[pn].socket.id + "):", eventName, payload);
			this.players[pn].emit(eventName, payload);
		}
	}

	this.findPlayer = function(socketId) {
		for (var pn = 0; pn < this.getNumPlayers(); pn++) {
			if (this.players[pn].socket.id == socketId) {
				return this.players[pn];
			}
		}
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