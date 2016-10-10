var tableBl = require('./bl/table_bl');
var gameBl = require('./bl/game_bl');
var api = require('./bl/nga_api_bl');

function setup(app) {

  app.get('/rest/tables/:user', tableBl.getTables);
	app.get('/rest/table/:id', tableBl.getTableById);
	app.post('/rest/table', tableBl.addTable);
	app.put('/rest/table/join', tableBl.joinTable);
	app.delete('/rest/table/delete/:id', tableBl.deleteTable);

  app.post('/rest/game/vote', gameBl.voteWorkItem);
	app.put('/rest/game/skip', gameBl.skipWorkItem);

	//app.get('/rest/connect/:apiKey/:apiSecret/:serverURL', api.connect);
	//app.get('/rest/connect', api.connect);
	app.post('/rest/connect', api.connect);
	app.get('/rest/workSpaces', api.getWorkspaces);
	app.get('/rest/users/:workspaceID', api.getUser);

	app.get('/rest/workSpaces/connect/:workSpaceId/:userId', api.connectWorkspaces);

	app.get('/rest/releases', api.getReleases);
	app.get('/rest/sprints', api.getSprints);
	app.get('/rest/teams', api.getTeams);
	app.put('/rest/updateSP', gameBl.updateWorkItem);


}
exports.setup = setup;