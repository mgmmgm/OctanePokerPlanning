var express = require('express');
var routes = require('./rest/rest_routes');
var bodyParser = require('body-parser')

var app = express();
var port = process.env.PORT || 4000;

// Configuration
app.use(express.static('../client'));		// set the static files location /client/img will be /img for users
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

routes.setup(app);

app.listen(port, function() {
    console.log("Server is up and listening on port %d", port);
});


// DB Connection
var mongo = {
    hostname: "localhost",
    port: 27017,
    username: "",
    password: "",
    name: "",
    db: "OctanePokerPlanning"
}

var generate_mongo_url = function(obj){
    obj.hostname = (obj.hostname || 'localhost');
    obj.port = (obj.port || 27017);
    obj.db = (obj.db || 'OctanePokerPlanning');

    if(obj.username && obj.password){
        return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
    }
    else{
        return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
    }
}

var mongourl = generate_mongo_url(mongo);
var mongoose = require('mongoose');

/**
 * connect to database
 */
var conn = mongoose.connect(mongourl,function(err) {
    if (err) {
        console.log(err);
        throw err;
    }
    console.log("Connected to " + mongourl + " successfully");
});
