var tableBl = require('./bl/table_bl');
var gameBl = require('./bl/game_bl');

function setup(app) {

    app.get('/rest/table', tableBl.getTables);
	app.get('/rest/table/:id', tableBl.getTableById);
	app.post('/rest/table', tableBl.addTable);

  	app.get('/rest/game', gameBl.getGames);
  	app.get('/rest/game/:id', gameBl.getGameById);
  	app.post('/rest/game', gameBl.addGame);

}
exports.setup = setup;