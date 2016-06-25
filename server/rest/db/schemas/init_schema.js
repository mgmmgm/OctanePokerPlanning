var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RoomSchema = new Schema({
   id:{type: String, required: true},
   name: {type: String, required: true},
   numberOfParticipates: {type: Number},
   status: {type: String},
   active: Boolean
});

var GameSchema = new Schema({
   id:{type: String, required:true},
   name: {type: String},
   active: Boolean
});

var RoomModel = mongoose.model('roomModel', RoomSchema,'Room' );
var GameModel = mongoose.model('gameModel', GameSchema,'Game' );

exports.RoomModel = RoomModel;
exports.GameModel = GameModel;