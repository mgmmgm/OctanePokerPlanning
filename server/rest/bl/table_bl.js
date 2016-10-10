var dbHelper = require('../db/table_db');
var Guid = require('guid');
var ngaBridge = require('./nga_api_bl');

var tablesMap = {};

function getTables(req, res) {
  /*dbHelper.getTables(req, res).then(function (data) {
   res.send(data);


  });*/
  //console.log('tables '+JSON.stringify(tablesMap));
  var username = req.params.user;
  var data = {};
  var userTables = [];
  for (var tableId in tablesMap) {
    if (tablesMap.hasOwnProperty(tableId)) {
      var table = tablesMap[tableId];
      if (table.ownerName === username) {
        userTables.push(table);
      }
    }
  }
  data['tables'] = userTables;
  res.send(data);
};

function getTableById(req, res) {
  var id = req.params.id;
  var data = tablesMap[id];
  console.log(data);
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
    itemsType: req.body.itemsType,
    release: req.body.release,
    sprint: req.body.sprint,
    team: req.body.team,
    workItemVotes: {},
    selectedWorkItemIndex: 0,
    creationTime: new Date()
  };
  newTableObj.workItemVotes.summary = {};
  var getWorkItemsPromise = ngaBridge.innerGetWorkItems(req.body.itemsType, req.body.release.id, req.body.sprint.id, req.body.team.id);
  getWorkItemsPromise.then(function(workItemsList) {
    newTableObj.workItems = workItemsList;
    tablesMap[newTableObj.id] = newTableObj;
    ngaBridge.setTablePerSession(newTableObj.id);
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

function deleteTable(req, res) {
  var tableId = req.params.id;
  var tableData = tablesMap[tableId];
  if (tableData === null) {
    res.status(500).send('not found');
  }
  delete tablesMap[tableId];
  ngaBridge.deleteTableSession(tableId);
  res.send(tableId);
};

exports.getTables = getTables;
exports.getTableById = getTableById;
exports.addTable = addTable;
exports.joinTable = joinTable;
exports.deleteTable = deleteTable;
exports.tablesMap = tablesMap;
