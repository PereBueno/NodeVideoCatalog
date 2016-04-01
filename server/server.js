// server.js

// SetUp - external
var express = require('express');
var app = express(); 							// Creating express application
//var mongoose = require ('mongoose');			// Including mongoose to create mongo objects
var morgan = require('morgan');					// Morgan to send messages to log console
var bodyParser = require ('body-parser');		// BodyParser, to pull info from HTML POST
var methodOverride = require('method-override');	// To simulate DELETE and PUT

var request = require("request");
var $ = require('jquery');

require("jsdom").env("", function(err, window) {
	if (err) {
		console.error(err);
		return;
	}
 
	$ = require("jquery")(window);
});

// Config

//mongoose.connect('mongodb://localhost:27017'); 	//Connect to mongo in localhost 
app.use(express.static(__dirname + '/client'));	// set the statics location
app.use(morgan('dev'));							// Set log level to dev, better to change it
app.use(bodyParser.urlencoded({'extended':'true'}));	// parse application/x-www-form-urlencoded
app.use(bodyParser.json());						// parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());						// to use our own DELETE & PUT


//API definition
//app.get('/api/todos', db.getAll);
//app.post('/api/todos', db.createTodo);
//app.delete('/api/todos/:todo_id', db.deleteTodo);

var controller = require('./dbCalls.js');

var options = {
  index: "index.html"
};
app.use('/', express.static('client', options));

var router = require('./routes.js');

// Base webs routing
app.use('/girls', express.static('client', {index:"girls.html"}));
app.use('/clips', express.static('client', {index:"clips.html"}));

// API definitions
app.get('/API/get/clips', function(req, res){router.getAllClips(req,res);});
app.get('/API/get/tags/clips', function(req, res){router.getAllClipTags(req,res);});
app.get('/API/get/tags/girls', function(req, res){router.getAllGirlTags(req,res);});
app.get('/API/get/girls', function(req, res){router.getAllGirls(req,res);});
app.get('/API/get/sites', function(req, res){router.getAllSites(req,res);});

app.get('/API/get/clip/:clip_id', function(req, res){router.getClipDetails(req,res);});
app.get('/API/get/girl/:girl_id', function(req, res){router.getGirlDetails(req,res);});

app.post('/API/set/girl', function(req, res){router.setNewGirl(req,res);});
app.post('/API/set/girl/tags', function(req, res){router.setNewGirlTags(req,res);});
app.post('/API/set/clip', function(req, res){router.setNewClip(req,res);});
app.post('/API/set/clip/tags', function(req, res){router.setNewClipTags(req,res);});
app.post('/API/set/clip/girls', function(req, res){router.setNewClipGirls(req,res);});
app.post('/API/set/tags/clip', function(req, res){router.setNewClipTag(req,res);});
app.post('/API/set/tags/girl', function(req, res){router.setNewGirlTag(req,res);});
app.post('/API/set/girl/update', function(req, res){router.updateGirl(req,res);});

//app.get('/', controller.allClipTags);

// Start the server, listen in port 8080
app.listen(8080);
console.log("[START] VideoCatalog application listening on port 8080");
//console.log(db);
var queries = {};

//console.log(controller.allClipTags);
//$.each(controller.allClipTags, function(item, i){console.log(JSON.stringify(i.row))});
//