var dbHelper = require('../db/table_db');
var Guid = require('guid');

var listOfTables = [];

function getTables(req, res) {
  /*dbHelper.getTables(req, res).then(function (data) {
   res.send(data);


  });*/
  console.log('tables '+JSON.stringify(listOfTables));
  var data = {};
  data['tables'] = listOfTables;
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

  var newTableObj = {
    id: guid.value,
    name: req.body.name,
    numberOfPlayers: req.body.numberOfPlayers,
    status: req.body.status,
    ownerName: req.body.ownerName,
    linkToGame: 'http://' + req.headers.host + '/#/game/' + guid.value
  };

  var ownerPlayer = {
    name: req.body.ownerName,
    voteValue: null,
    isOwner: true
  };

  var newGameObj = {
    id: guid.value,
    name: req.body.name,
    cardsType: req.body.cardsType,
    players: [ownerPlayer],
    linkToGame: 'http://' + req.headers.host + '/#/game/' + guid.value,
    releaseId: req.body.releaseId,
    releaseName: req.body.releaseName
  };

  // todo: need to save this 2 new objects to db

  listOfTables.push(newTableObj);

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

exports.getTables = getTables;
exports.getTableById = getTableById;
exports.addTable = addTable;
