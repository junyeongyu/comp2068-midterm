"use strict";
var express = require('express');
var router = express.Router();

let Player = require('../models/player')

router.get('/', function(req, res, next) {
	// use mongoose model to query mongodb for all players
	Player.find(function(err, players) {
		console.log('find');
		if (err) {
			console.log(err);
			res.end(err);
			return;
		}
		
		// no error so send the players to the index view
		res.render('players/players', {
			players: players
		});
	});
});

module.exports = router; 