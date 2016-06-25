
var schemas = require('./schemas/init_schema');

function getGamesFromDB(req,response) {
   return schemas.GameModel.find(function(err, items) {
       if (!err) {
           return items;
       } else {
           console.log(err);
           response.status(500).send({"error":err.message});
       }
   });
}

function getGameByIdFromDB(id, response) {
    return schemas.GameModel.findOne({'id':id}, function(err, item) {
        if (!err) {
            return item;
        } else {
            response.status(500).send({"error":err.message});
        }
    });
}

function addGameToDB(newGame, response) {
	var newDocument = new schemas.GameModel(newGame);
	return newDocument.save(function (err) {
		if (!err) {
			//console.log('added');
			return true;
		} else {
			console.log('not added');
			console.log(err);
			response.status(500).send({"error":err.message});
		}
	});
}

function updateGameToDB(gameDocument, response) {
	return gameDocument.save(function (err) {
		if (!err) {
			//console.log('updated');
			return true;
		} else {
			console.log('not updated');
			console.log(err);
			response.status(500).send({"error":err.message});
		}
	});
}


exports.getGames = getGamesFromDB;
exports.getGameById = getGameByIdFromDB;
exports.addGame = addGameToDB;
exports.updateGame = updateGameToDB;

