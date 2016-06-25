var dbHelper = require('../db/game_db');

function getGames(req,res) {
    dbHelper.getGames(req,res).then(function(data) {
		res.send(data);
		//res.send('aaaaaaa');
	});
};

function getGameById(req, res) {
	var id = req.params.id;
	dbHelper.getGameById(id, res).then(function(data) {
		if (data === null) {
			res.status(500).send('not found');
		}
		res.send(data);
	});
	
};

function addGame(req, res) {
	var obj = {
		id: req.body.id,
	  	name: req.body.name
	};

	// try to find this object in DB - if exist update, if not add new
	dbHelper.getGameById(obj.id, res).then(function(game) {
		console.log(game);
		if (game !== null) {

			game.name = obj.name;

			dbHelper.updateGame(game, res).then(function(updated) {
				if (updated) {
					res.send('updated successfully');
				}
			});
		} else {
			// create new entity (document)
			dbHelper.addGame(obj, res).then(function(added) {
				if (added) {
					res.send('added successfully');
				}
			});
		}
	});


};

exports.getGames = getGames;
exports.getGameById = getGameById;
exports.addGame = addGame;
