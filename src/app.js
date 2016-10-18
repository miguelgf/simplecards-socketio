// APP NodeJS on server-side
var express = require('express');
var http = require('http');
var socketio = require('socket.io');
var Game = require('./classes/game.js');
var Card = require('./classes/card.js');

var app = express();
var server = http.createServer(app);
var io = socketio(server);

var PORT = 4002;

app.use('/', express.static(__dirname + '/client'));


/*
TODO (before public):
- Object Card more complex
- Don't allow to select a card and then change it
*/
var rooms = [];

io.on('connection', function(socket) {

	console.log('new connection ', socket.id);

	socket.on('join', function(data) {
		var game;

		if (rooms.length === 0 || !rooms[rooms.length - 1].isWaiting()) {
			game = new Game();
			rooms.push(game);
		} else {
			game = rooms[rooms.length - 1];
		}

		game.addPlayer(data.username, socket);

		// game.updateGame();

		game.emitPlayers('gameInfo', {'roomIndex': rooms.length - 1, 'players': game.getNumPlayers()});

		if (game.getNumPlayers() == 2) {
			game.startGame();	
		}

	});

	socket.on('sendCard', function(payload) {
		console.log(payload);
		var game = rooms[payload.gameInfo.roomIndex];
		var player = game.findPlayer(socket.id);

		player.currentCard = new Card(payload.cardValue); // TODO: Improve lookup Card
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



app.get('/rooms', function(req, res) {
	var content = '';
	content += '<h1>Latest Rooms</h1>';
	content += '<ul>';

	for (var i = rooms.length - 1; i >= 0; i--) {
		content += '<li>Num. players: ' + rooms[i].getNumPlayers() + '; Status: ' + rooms[i].status + '</li>';
	}
	content += '</ul>';

	res.send(content);
});


app.get('/rooms/:id', function(req, res) {
	if (typeof rooms[req.params.id] != 'undefined') {
		var game = rooms[req.params.id];

		res.send('Num. players: ' + game.getNumPlayers() + '; Status: ' + game.status);
	} else {
		res.send('The game doesn\'t exists');
	}

});

server.listen(PORT);