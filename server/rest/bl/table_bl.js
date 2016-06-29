var dbHelper = require('../db/table_db');
var Guid = require('guid');
var ngaBridge = require('./nga_api_bl');

var tablesMap = {};

function getTables(req, res) {
  /*dbHelper.getTables(req, res).then(function (data) {
   res.send(data);


  });*/
  console.log('tables '+JSON.stringify(tablesMap));
  var data = {};
  data['tables'] = tablesMap;
  res.send(data);
};

function getTableById(req, res) {
  var id = req.params.id;
  var data = tablesMap[id];
  if (data === null) {
    res.status(500).send('not found');
  }
  res.send(data);

};

function addTable(req, res) {
  var guid = Guid.create();

  var ownerPlayer = {
    name: req.body.ownerName,
    isOwner: true
  };

  var newTableObj = {
    id: guid.value,
    name: req.body.name,
    numberOfPlayers: req.body.numberOfPlayers,
    status: req.body.status,
    ownerName: req.body.ownerName,
    linkToGame: 'http://' + req.headers.host + '/#/game/' + guid.value,
    cardsType: req.body.cardsType,
    players: [ownerPlayer],
    release: req.body.release,
    sprint: req.body.sprint,
    team: req.body.team
  };
  var getStoriesPromise = ngaBridge.innerGetStories(req.body.release.id, req.body.sprint.id, req.body.team.id);
  getStoriesPromise.then(function(storyList) {
    console.log('************');
    console.log(storyList);
    console.log('~~~~~~~~~~~~~~~~~');
    console.log(newTableObj);
    newTableObj.userStories = storyList;
    tablesMap[newTableObj.id] = newTableObj;
    res.send(newTableObj);
  });

};

function joinTable(req, res) {
  var tableId = req.body.id;
  var displayNAme = req.body.displayName;
  tableData = tablesMap[tableId];
  if (tableData === null) {
    res.status(500).send('not found');
  }

  var ownerPlayer = {
    name: displayNAme,
    isOwner: false
  };

  tableData.players.push(ownerPlayer);
  tableData.numberOfPlayers = tableData.numberOfPlayers + 1;
  res.send(tableData);
};

exports.getTables = getTables;
exports.getTableById = getTableById;
exports.addTable = addTable;
exports.joinTable = joinTable;
