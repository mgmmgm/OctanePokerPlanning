var dbHelper = require('../db/table_db');
var Guid = require('guid');

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
  dbHelper.getTableById(id, res).then(function (data) {
    if (data === null) {
      res.status(500).send('not found');
    }
    res.send(data);
  });

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
    releaseId: req.body.releaseId,
    releaseName: req.body.releaseName
  };


  // todo: need to save this 2 new objects to db

  tablesMap[newTableObj.id] = newTableObj;

  res.send(newTableObj);

  //// try to find this object in DB - if exist update, if not add new
  //dbHelper.getTableById(newTableObj.id, res).then(function (table) {
  //  console.log(table);
  //  if (table !== null) {
  //
  //    table.name = newTableObj.name;
  //    table.numberOfPlayers = newTableObj.numberOfPlayers;
  //    table.status = newTableObj.status;
  //
  //    dbHelper.updateTable(table, res).then(function (updated) {
  //      if (updated) {
  //        res.send('updated successfully');
  //      }
  //    });
  //  } else {
  //    // create new entity (document)
  //    dbHelper.addTable(newTableObj, res).then(function (added) {
  //      if (added) {
  //        res.send('added successfully');
  //      }
  //    });
  //  }
  //});


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
