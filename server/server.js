// server.js

// SetUp - external
var express = require('express');
var app = express(); 							// Creating express application
//var mongoose = require ('mongoose');			// Including mongoose to create mongo objects
var morgan = require('morgan');					// Morgan to send messages to log console
var bodyParser = require ('body-parser');		// BodyParser, to pull info from HTML POST
var methodOverride = require('method-override');	// To simulate DELETE and PUT

// Config

//mongoose.connect('mongodb://localhost:27017'); 	//Connect to mongo in localhost 
app.use(express.static(__dirname + '/public'));	// set the statics location
app.use(morgan('dev'));							// Set log level to dev, better to change it
app.use(bodyParser.urlencoded({'extended':'true'}));	// parse application/x-www-form-urlencoded
app.use(bodyParser.json());						// parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());						// to use our own DELETE & PUT

// App preparation
//var dataModel = require('./private/dataModel.js');
//var Todo = mongoose.model(dataModel.TODO.name, dataModel.TODO.value);

var db = require('./private/dbCalls.js');

//API definition
app.get('/api/todos', db.getAll);
app.post('/api/todos', db.createTodo);
app.delete('/api/todos/:todo_id', db.deleteTodo);

/**
 * Definition of Neo4j REST API, urls & queries
 */

 var host="192.168.1.9"
 var port="7474"
 var url="/db/data/transaction"

 var neoURL="http://"+host+":"+port+url;

// ******* Neo4j queries
var getAllClipTags = {
  "statements": [
    {
      "statement": "MATCH (c:clipTag) return c",
      "resultDataContents": [
        "row"
        ],
      "includeStats": false
    }
  ]
}

// ******* ENDOF Neo4j queries

// Base function that allows us to launch cypher queries
function runCypherQuery(query, params, callback) {
  request.post({
      uri: neoURL,
      json: {statements: [{statement: query, parameters: params}]}
    },
    function (err, res, body) {
      callback(err, body);
    })
}

// Launching initial queries

runCypherQuery(getAllClips, {}, function (err, resp){
	if (err)
		console.error(err);
	else
		console.log("Got response from Neo: " + resp);
});

// Start the server, listen in port 8080
app.listen(8080);
console.log("[START] VideoCatalog application listening on port 8080");
console.log(db);