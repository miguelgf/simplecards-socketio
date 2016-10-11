// APP NodeJS on server-side
var express = require('express');
var http = require('http');
var socketio = require('socket.io');
var Game = require('./classes/game.js');
var Card = require('./classes/card.js');

var app = express();
var server = http.createServer(app);
var io = socketio(server);

const numCards = 3;
game = new Game(numCards);

io.on('connection', function(socket) {

	console.log('new connection ', socket.id);

	socket.on('join', function(data) {
		console.log(data.username);
		game.addPlayer(data.username, socket);

		// game.updateGame();

		game.emitPlayers('playerCount', {'players': game.getNumPlayers()});

		if (game.getNumPlayers() == 2) {
			game.startGame();	
		}

	})

	socket.on('sendCard', function(cardValue) {
		var player = game.findPlayer(socket.id);

		console.log("Player " + player.username + " has selected: " + cardValue);

		player.currentCard = new Card(cardValue); // TODO: Improve lookup Card
		game.currentlyPlayed++;

		if (game.currentlyPlayed == game.getNumPlayers()) {
			game.endTurn();
		}

		game.updateGame();
		game.printPretty();

		// If somebody has no cards left, end game.
		if (game.hasGameEnded()) {
			console.log('Game ended');
			game.emitPlayers('gameEnded', {'winner': game.gameWinner.username});
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