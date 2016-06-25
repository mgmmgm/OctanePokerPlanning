var dbHelper = require('../db/room_db');

function getRooms(req, res) {
  dbHelper.getRooms(req, res).then(function (data) {
    res.send(data);
    //res.send('aaaaaaa');
  });
};

function getRoomById(req, res) {
  var id = req.params.id;
  dbHelper.getRoomById(id, res).then(function (data) {
    if (data === null) {
      res.status(500).send('not found');
    }
    res.send(data);
  });

};

function addRoom(req, res) {
  var obj = {
    id: req.body.id,
    name: req.body.name,
    numberOfParticipates: req.body.numberOfParticipates,
    status: req.body.status
  };

  // try to find this object in DB - if exist update, if not add new
  dbHelper.getRoomById(obj.id, res).then(function (room) {
    console.log(room);
    if (room !== null) {

      room.name = obj.name;
      room.numberOfParticipates = obj.numberOfParticipates;
      room.status = obj.status;

      dbHelper.updateRoom(room, res).then(function (updated) {
        if (updated) {
          res.send('updated successfully');
        }
      });
    } else {
      // create new entity (document)
      dbHelper.addRoom(obj, res).then(function (added) {
        if (added) {
          res.send('added successfully');
        }
      });
    }
  });


};

exports.getRooms = getRooms;
exports.getRoomById = getRoomById;
exports.addRoom = addRoom;
