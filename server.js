// server.js

// SetUp
var express = require('express');
var app = express(); 							// Creating express application
var mongoose = require ('mongoose');			// Including mongoose to create mongo objects
var morgan = require('morgan');					// Morgan to send messages to log console
var bodyParser = require ('body-parser');		// BodyParser, to pull info from HTML POST
var methodOverride = require('method-override');	// To simulate DELETE and PUT

// Config

mongoose.connect('mongodb://localhost:27017'); 	//Connect to mongo in localhost 
app.use(express.static(__dirname + '/public'));	// set the statics location
app.use(morgan('dev'));							// Set log level to dev, better to change it
app.use(bodyParser.urlencoded({'extended':'true'}));	// parse application/x-www-form-urlencoded
app.use(bodyParser.json());						// parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());						// to use our own DELETE & PUT

// Start the server, listen in port 8080
app.listen(8080);
console.log("[START] VideoCatalog application listening on port 8080");
