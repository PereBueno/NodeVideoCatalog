var request = require("request");
var $ = require('jquery');

require("jsdom").env("", function(err, window) {
	if (err) {
		console.error(err);
		return;
	}
 
	$ = require("jquery")(window);	
});

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
	      "parameters": {},
	      "resultDataContents": ["row"]
	      //"includeStats": false
	    }
	  ]
	};

	var getEverything = {
	  "statements": [
	    {
	      "statement": "MATCH (c) return c",
	      "resultDataContents": [
	        "row", "graph"
	        ],
	      "includeStats": false
	    }
	  ]
	};

	// ******* ENDOF Neo4j queries

	// Base function that allows us to launch cypher queries

	function runCypherQuery(query, params, callback) {	
	  request.post({
	      uri: neoURL,
	      accept: 'application/json, text/plain, */*',
	      'content-type': 'application/json;charset=utf-8',
	      'X-stream': true,
	      json: query
	    },
	    function (err, resp, body) {
	    	console.log("Callback: \nError: " + err + "\nresp: " + resp + "\nBody: " + body);
	      callback(err, body);
	    });
	}

	// Launching initial queries
exports.allClipTags= function(){runCypherQuery(getAllClipTags, {}, function (err, resp){
		if (err)
			console.error(err);
		else{			
			console.log("[OK] Got response from Neo: getAllClipTags");		
			console.log("Fields " + resp.results[0].data);
			resp = resp.results[0].data;	
			return resp;		
			//$.each(allClipTags, function(item, i){console.log(JSON.stringify(i.row))});
			console.log("Exiting from handler with response size " + resp.length);
			//resp.write(resp);
		}
	})};