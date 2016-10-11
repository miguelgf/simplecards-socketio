// APP NodeJS on server-side
var express = require('express');
var http = require('http');
var socketio = require('socket.io');
var Game = require('./classes/game.js');
var Card = require('./classes/card.js');

var app = express();
var server = http.createServer(app);
var io = socketio(server);

const numCards = 10;
game = new Game(numCards);

io.on('connection', function(socket) {

	console.log('new connection ', socket.id);

	socket.on('join', function(data) {
		console.log(data.username);
		game.addPlayer(data.username, socket);

		game.emitPlayers('playerCount', {'players': game.getNumPlayers()});

		if (game.getNumPlayers() == 2) {
			game.startGame();	
		}

	})

	socket.on('cardSelected', function(cardValue) {
		var player = game.findPlayer(socket.id);

		console.log("Player " + player.username + " has selected: " + cardValue);

		player.currentCard = new Card(cardValue); // TODO: Improve lookup Card
		game.currentlyPlayed++;

		if (game.currentlyPlayed == game.getNumPlayers()) {
			game.endTurn();
		}

	});

	socket.on('disconnect', function(){
		console.log('disconnect');
	});

});


app.get('/', function(req, res) {
	res.send('Endpoint express working.');
});


server.listen(4002);