var tableBl = require('./bl/table_bl');
var gameBl = require('./bl/game_bl');
var api = require('./bl/nga_api_bl');

function setup(app) {

  app.get('/rest/table', tableBl.getTables);
  app.get('/rest/table/:id', tableBl.getTableById);
  app.post('/rest/table', tableBl.addTable);

  app.get('/rest/game', gameBl.getGames);
  app.get('/rest/game/:id', gameBl.getGameById);
  app.post('/rest/game', gameBl.addGame);

  app.get('/rest/connect', api.connect);
  app.get('/rest/releases', api.getReleases);
  app.get('/rest/sprints', api.getSprints);
  app.get('/rest/teams', api.getTeams);
  app.get('/rest/stories', api.getStories);


}
exports.setup = setup;