// APP NodeJS on server-side
var express = require('express');
var http = require('http');
var socketio = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socketio(server);


var players = 0;

io.on('connection', function(socket) {

	console.log('onConnection');


	socket.on('ready', function(data) {
		players++;

		if (players == 2) {
			console.log("ready to play");
		}

		socket.emit('playerCount', {'players': players});
	})

	socket.on('hola', function(data){
		console.log('hola');
	})

	socket.on('disconnect', function(){
		console.log('disconnect');

		players--;
	})

});




const numCards = 10;

var Deck = function() {
	this.cards = [];

	var __construct = function(d) {
		// Create deck
		for (var i = 1; i <= 100; i++) {
			d.cards.push(i);
		}

	}(this); // Called


	this.getRandomCard = function() {
		var index = Math.floor(Math.random() * this.cards.length);

		console.log("index", index);

		value = this.cards[index];

		this.cards.splice(index, 1);

		return value;
	}

}

deck = new Deck();

app.get('/getcards', function(req, res) {
	console.log("Getting " + numCards + " cards for this user");

	var myCards = [];
	for (var i = 0; i < numCards; i++) {
		myCards.push(deck.getRandomCard());
	}

	console.log(deck);
	res.send('fuera');
});

app.get('/', function(req, res) {
	res.send('index 123');


	// console.log(deck);
});


app.get('/test', function(req, res) {
	res.send('index test');
});

server.listen(4003);