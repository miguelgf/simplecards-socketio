var Player = function(playerName, socket) {
	this.username = playerName;
	this.cards = [];
	this.socket = socket;

	var __construct = function() {
		// ...
	}(this); // Called

	this.addCard = function(c) {
		this.cards.push(c);
	}

	this.emit = function(eventName, payload) {
		this.socket.emit(eventName, payload);
	}

	this.printPretty = function() {
		var cardsMsg = 'Cards: ';
		for(i=0; i<this.cards.length; i++){
			cardsMsg += this.cards[i].getValue() + ', ';
		}
	
		console.log('----------------- PLAYER');
		console.log('Username:', this.username);
		console.log(cardsMsg);
		console.log('SocketID: ', this.socket.id);
		console.log('----------------- PLAYER');
	}

}

module.exports = Player;