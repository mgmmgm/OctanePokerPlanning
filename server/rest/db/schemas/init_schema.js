var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TableSchema = new Schema({
   id:{type: String, required: true},
   name: {type: String, required: true},
   numberOfPlayers: {type: Number},
   status: {type: String},
   active: Boolean
});

var GameSchema = new Schema({
   id:{type: String, required:true},
   name: {type: String},
   active: Boolean
});

var TableModel = mongoose.model('tableModel', TableSchema,'Table' );
var GameModel = mongoose.model('gameModel', GameSchema,'Game' );

exports.TableModel = TableModel;
exports.GameModel = GameModel;