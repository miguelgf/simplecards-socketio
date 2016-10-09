// APP NodeJS on server-side
var express = require('express');
var http = require('http');
var socketio = require('socket.io');
var Game = require('./classes/game.js');

var app = express();
var server = http.createServer(app);
var io = socketio(server);


const numCards = 10;

game = new Game(numCards);

io.on('connection', function(socket) {

	console.log('onConnection ---');

	socket.on('ready', function(data) {
		console.log(data.username);
		game.addPlayer(data.username);

		if (game.getNumPlayers() == 2) {
			console.log("ready to play");
			game.startGame();

			socket.emit('startGame', {'players': game.getNumPlayers()});
		}

		socket.emit('playerCount', {'players': game.getNumPlayers()});
	})

	socket.on('hola', function(data){
		console.log('hola');
	})

	socket.on('disconnect', function(){
		console.log('disconnect');

	});

});



app.get('/', function(req, res) {
	res.send('Endpoint express working.');
});


server.listen(4002);