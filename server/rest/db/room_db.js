
var schemas = require('./schemas/init_schema');

function getRoomsFromDB(req,response) {
   return schemas.RoomModel.find(function(err, items) {
       if (!err) {
           //console.log("rooms: "+JSON.stringify(items));
           return items;
       } else {
           console.log(err);
           response.status(500).send({"error":err.message});
       }
   });
}

function getRoomByIdFromDB(id, response) {
    return schemas.RoomModel.findOne({'id':id}, function(err, item) {
        if (!err) {
            //console.log("room: "+JSON.stringify(item));
            return item;
        } else {
            response.status(500).send({"error":err.message});
        }
    });
}

function addRoomToDB(newRoom, response) {
	var newDocument = new schemas.RoomModel(newRoom);
	return newDocument.save(function (err) {
		if (!err) {
			//console.log('added');
			return true;
		} else {
			console.log('not added');
			console.log(err);
			response.status(500).send({"error":err.message});
		}
	});
}

function updateRoomToDB(roomDocument, response) {
	return roomDocument.save(function (err) {
		if (!err) {
			//console.log('updated');
			return true;
		} else {
			console.log('not updated');
			console.log(err);
			response.status(500).send({"error":err.message});
		}
	});
}


exports.getRooms = getRoomsFromDB;
exports.getRoomById = getRoomByIdFromDB;
exports.addRoom = addRoomToDB;
exports.updateRoom = updateRoomToDB;

