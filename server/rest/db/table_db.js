
var schemas = require('./schemas/init_schema');

function getTablesFromDB(req,response) {
   return schemas.TableModel.find(function(err, items) {
       if (!err) {
           //console.log("tables: "+JSON.stringify(items));
           return items;
       } else {
           console.log(err);
           response.status(500).send({"error":err.message});
       }
   });
}

function getTableByIdFromDB(id, response) {
    return schemas.TableModel.findOne({'id':id}, function(err, item) {
        if (!err) {
            //console.log("table: "+JSON.stringify(item));
            return item;
        } else {
            response.status(500).send({"error":err.message});
        }
    });
}

function addTableToDB(newTable, response) {
	var newDocument = new schemas.TableModel(newTable);
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

function updateTableToDB(tableDocument, response) {
	return tablemDocument.save(function (err) {
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


exports.getTables = getTablesFromDB;
exports.getTableById = getTableByIdFromDB;
exports.addTable = addTableToDB;
exports.updateTable = updateTableToDB;

