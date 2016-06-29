var tableBl = require('./bl/table_bl');
var gameBl = require('./bl/game_bl');
var api = require('./bl/nga_api_bl');

function setup(app) {

    app.get('/rest/table', tableBl.getTables);
	app.get('/rest/table/:id', tableBl.getTableById);
	app.post('/rest/table', tableBl.addTable);
	app.put('/rest/table/join', tableBl.joinTable);

  app.post('/rest/game/vote', gameBl.voteUserStory);

	app.get('/rest/connect', api.connect);
	app.get('/rest/releases', api.getReleases);
	app.get('/rest/sprints', api.getSprints);
	app.get('/rest/teams', api.getTeams);
	app.put('/rest/updateSP', api.updateStory);


}
exports.setup = setup;