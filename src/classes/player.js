var Player = function(playerName, socket) {
	this.username = playerName;
	this.cards = [];
	this.socket = socket;
	this.currentCard = null;

	var __construct = function() {
		// ...
	}(this); // Called

	this.addCard = function(card) {
		this.cards.push(card);
	};

	// Receive Object card, not card value
	this.removeCard = function (card) {
		for (i = 0; i < this.cards.length; i++) {
			if (this.cards[i].compare(card) === 0) {
				this.cards.splice(i, 1);
				break;
			}
		}
	};

	this.getNumCards =function() {
		return this.cards.length;
	};

	this.emit = function(eventName, payload) {
		this.socket.emit(eventName, payload);
	};

	this.printPretty = function() {
		var cardsMsg = 'Cards: ';
		for (i = 0; i < this.cards.length; i++) {
			cardsMsg += this.cards[i].getValue() + ', ';
		}
	
		console.log('----------------- PLAYER');
		console.log('Username:', this.username);
		console.log(cardsMsg);
		console.log('SocketID: ', this.socket.id);
		console.log('----------------- PLAYER');
	};

};

module.exports = Player;