var roomBl = require('./bl/room_bl');
var gameBl = require('./bl/game_bl');

function setup(app) {

    app.get('/rest/room', roomBl.getRooms);
	app.get('/rest/room/:id', roomBl.getRoomById);
	app.post('/rest/room', roomBl.addRoom);

  	app.get('/rest/game', gameBl.getGames);
  	app.get('/rest/game/:id', gameBl.getGameById);
  	app.post('/rest/game', gameBl.addGame);

}
exports.setup = setup;