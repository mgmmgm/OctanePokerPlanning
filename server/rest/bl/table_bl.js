var dbHelper = require('../db/table_db');

function getTables(req, res) {
  dbHelper.getTables(req, res).then(function (data) {
    res.send(data);
    //res.send('aaaaaaa');
  });
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
  var obj = {
    id: req.body.id,
    name: req.body.name,
    numberOfParticipates: req.body.numberOfParticipates,
    status: req.body.status
  };

  // try to find this object in DB - if exist update, if not add new
  dbHelper.getTableById(obj.id, res).then(function (table) {
    console.log(table);
    if (table !== null) {

      table.name = obj.name;
      table.numberOfParticipates = obj.numberOfParticipates;
      table.status = obj.status;

      dbHelper.updateTable(table, res).then(function (updated) {
        if (updated) {
          res.send('updated successfully');
        }
      });
    } else {
      // create new entity (document)
      dbHelper.addTable(obj, res).then(function (added) {
        if (added) {
          res.send('added successfully');
        }
      });
    }
  });


};

exports.getTables = getTables;
exports.getTableById = getTableById;
exports.addTable = addTable;
