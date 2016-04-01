var request = require("request");
var neo4j = require("node-neo4j");

var host="192.168.1.9"
var port="7474"
var url="/db/data/transaction/commit"
//var url="/db/data/transaction"

var neoURL="http://"+host+":"+port+url;

var db = new neo4j(neoURL); 

var queries = {};

queries["getAllClips"] = {
	      "statement": "MATCH (c:clip) return c, id(c) as id order by c.name",
	      "parameters": {},
	      "resultDataContents": ["row"]
	      //"includeStats": false
	};
queries["getAllClipTags"] = {
	      "statement": "MATCH (c:clipTag) return c order by c.name",
	      "parameters": {},
	      "resultDataContents": ["row"]
	      //"includeStats": false	    
	};
queries["getAllGirlTags"] = {
	      "statement": "MATCH (c:girlTag) return c order by c.name",
	      "parameters": {},
	      "resultDataContents": ["row"]
	      //"includeStats": false
	};
queries["getAllGirls"] = {
	      "statement": "MATCH (c:actress) return c, id(c) order by c.name",
	      "parameters": {},
	      "resultDataContents": ["row"]
	      //"includeStats": false
	};
queries["getAllSites"] = {
	      "statement": "MATCH (c:clip)-[]->(s:sites) return s, count(c) as cuantos",
	      "parameters": {},
	      "resultDataContents": ["row"]
	      //"includeStats": false
	    };
queries["getClipDetails"] = {
	      "statement": "match (a:actress)-[:APPEARS]->(c:clip)-[:CONTAINS]->(t1:clipTag) " 
	      	+ "where id(c)=toInt({clip_id}) "
	      	+ "return DISTINCT {clip:c, id:id(c)} as clip, collect(DISTINCT {girl:a, id:id(a)}) as girls, "
	      	+ "collect( distinct t1) as tags, id(c) as clipId",
	      //"parameters": {},
	      "resultDataContents": ["row"]
	      //"includeStats": false	    
	};
queries["getGirlDetails"] = {
	      "statement": "match (t:girlTag)<-[:IS]-(a:actress)-[:APPEARS]->(c:clip)-[:CONTAINS]->(t1:clipTag) "
	      + "where id(a)=toInt({girl_id}) return collect(DISTINCT {clip:c, id:id(c)}), a, collect(distinct t1), "
	      + "collect(distinct t),  id(a) as girlId",
	      //"parameters": {},
	      "resultDataContents": ["row"]
	      //"includeStats": false	    
	};

queries["setNewGirl"] = {
	      "statement": "CREATE (a:actress{name:{girlName}, born:{girlBorn}, rating:{girlRating}}) return {girl:a, id:id(a)}",
	      //"parameters": {},
	      "resultDataContents": ["row"]
	      //"includeStats": false	    
	};

queries["setNewClip"] = {
	      "statement": "CREATE (c:clip{title:{clipTitle}, file:{clipFile}, length:{clipLength}, rating:{clipRating}, "
	      	+ "location:{clipLocation}}) return {clip:c, id:id(c)}",
	      //"parameters": {},
	      "resultDataContents": ["row"]
	      //"includeStats": false	    
	};

queries["setNewGirlTags"] = {
	      "statement": "MATCH (a:actress{name:{girlName}}), (t:girlTag{name:{tag}}) CREATE UNIQUE (a)-[:IS]->(t)",
	      //"parameters": {},
	      "resultDataContents": ["row"]
	      //"includeStats": false	    
	};

queries["setNewClipTags"] = {
	      "statement": "MATCH (c:clip{title:{clipTitle}}), (t:clipTag{name:{tag}}) CREATE UNIQUE (c)-[:CONTAINS]->(t)",
	      //"parameters": {},
	      "resultDataContents": ["row"]
	      //"includeStats": false	    
	};

queries["setNewClipGirls"] = {
	      "statement": "MATCH (c:clip{title:{clipTitle}}), (a:actress{name:{girlName}}) CREATE UNIQUE (a)-[:APPEARS]->(c)",
	      //"parameters": {},
	      "resultDataContents": ["row"]
	      //"includeStats": false	    
	};

queries["setNewGirlTag"] = {
	      "statement": "CREATE (t:girlTag{name:{tagName}}) return id(t)",
	      //"parameters": {},
	      "resultDataContents": ["row"]
	      //"includeStats": false	    
	};

queries["setNewClipTag"] = {
	      "statement": "CREATE (t:clipTag{name:{tagName}}) return id(t)",
	      //"parameters": {},
	      "resultDataContents": ["row"]
	      //"includeStats": false	    
	};

queries["updateGirl"] = {
	      "statement": "MATCH (a:actress)-[r:IS]->(tags:girlTag), newTags=(t:girlTag) where t.name in {girlTags} "
	      + "and id(a)={girlId} set a.name={girlName}, a.born={girlBorn}, a.rating={girlRating} "
	      + "delete r FOREACH (t1 in nodes(newTags) | CREATE UNIQUE (a)-[:IS]->(t1))",
	      //"parameters": {},
	      "resultDataContents": ["row"]
	      //"includeStats": false	    
	};

module.exports = {
	getAllSites: function (req, res){	
				runCypherQuery(queries['getAllSites'], {}, function (err, resp){
					if (err)
						console.error(err);
					else{			
						console.log("[OK] Got response from Neo: getAllSites");									
						res.end(JSON.stringify(resp.results[0].data));	
					}
				});
			},
	getAllClips: function (req, res){	
				runCypherQuery(queries['getAllClips'], {}, function (err, resp){
					if (err)
						console.error(err);
					else{			
						console.log("[OK] Got response from Neo: getAllClips");									
						res.end(JSON.stringify(resp.results[0].data));	
					}
				});
			},
	getAllGirls: function (req, res){	
				runCypherQuery(queries['getAllGirls'], {}, function (err, resp){
					if (err)
						console.error(err);
					else{			
						console.log("[OK] Got response from Neo: getAllGirls");									
						res.end(JSON.stringify(resp.results[0].data));	
					}
				});
			},
	getAllGirlTags: function (req, res){	
				runCypherQuery(queries['getAllGirlTags'], {}, function (err, resp){
					if (err)
						console.error(err);
					else{			
						console.log("[OK] Got response from Neo: getAllGirlTags");									
						res.end(JSON.stringify(resp.results[0].data));	
					}
				});
			},
	getAllClipTags: function (req, res){	
				runCypherQuery(queries['getAllClipTags'], {}, function (err, resp){
					if (err)
						console.error(err);
					else{			
						console.log("[OK] Got response from Neo: getAllClipTags");									
						res.end(JSON.stringify(resp.results[0].data));	
					}
				});
			},
	getClipDetails: function (req, res){	
				runCypherQuery( queries['getClipDetails'], {"clip_id":req.params.clip_id}, function (err, result){
					if (err)
						console.error(err);
					else{			
						console.log("[OK] Got response from Neo: getClipDetails ");											
						res.end(JSON.stringify(result.results[0]));	
					}
				});
			},
	getGirlDetails: function (req, res){	
				runCypherQuery( queries['getGirlDetails'], {"girl_id":req.params.girl_id}, function (err, result){
					if (err)
						console.error(err);
					else{			
						console.log("[OK] Got response from Neo: getGirlDetails " + JSON.stringify(result, null, "  "));											
						res.end(JSON.stringify(result.results[0]));	
					}
				});
			},
	setNewGirl: function (req, res){	
		console.log(req.body);
				runCypherQuery( queries['setNewGirl'], {"girlName":req.body.name, "girlBorn": req.body.born,
					"girlRating": req.body.rating}, function (err, result){
					if (err)
						console.error(err);
					else{			
						//console.log("[OK] Got response from Neo: setNewGirl " + JSON.stringify(result, null, "  "));											
						res.end(JSON.stringify(result.results[0]));	
					}
				});
			},
	setNewGirlTags: function (req, res){	
		console.log(req.body);
		
		for (i=0; i < req.body.tags.length; i++){
				runCypherQuery( queries['setNewGirlTags'], {"girlName":req.body.name, "tag": req.body.tags[i]}, 
					function (err, result){
					if (err)
						console.error(err);
					else{			
						console.log("[OK] Got response from Neo: setNewGirlTags " + JSON.stringify(result, null, "  "));											
						res.end(JSON.stringify(result.results[0]));	
					}
				});
			}
		},

	setNewClip: function (req, res){	
		console.log(req.body);
				runCypherQuery( queries['setNewClip'], 
					{"clipTitle":req.body.title, "clipFile": req.body.file, "clipLength": req.body.length,
					 "clipRating": req.body.rating, "clipLocation": req.body.location}, function (err, result){
					if (err)
						console.error(err);
					else{			
						//console.log("[OK] Got response from Neo: setNewGirl " + JSON.stringify(result, null, "  "));											
						res.end(JSON.stringify(result.results[0]));	
					}
				});
			},

	setNewClipTags: function (req, res){	
		console.log(req.body);
		
		for (i=0; i < req.body.tags.length; i++){
				runCypherQuery( queries['setNewClipTags'], {"clipTitle":req.body.title, "tag": req.body.tags[i]}, 
					function (err, result){
					if (err)
						console.error(err);
					else{			
						console.log("[OK] Got response from Neo: setNewClipTags " + JSON.stringify(result, null, "  "));											
						res.end(JSON.stringify(result.results[0]));	
					}
				});
			}
		},

	setNewClipGirls: function (req, res){	
		console.log(req.body);
		
		for (i=0; i < req.body.actresses.length; i++){
				runCypherQuery( queries['setNewClipGirls'], {"clipTitle":req.body.title, "girlName": req.body.actresses[i]}, 
					function (err, result){
					if (err)
						console.error(err);
					else{			
						console.log("[OK] Got response from Neo: setNewClipGirls " + JSON.stringify(result, null, "  "));											
						res.end(JSON.stringify(result.results[0]));	
					}
				});
			}
		},

	setNewGirlTag: function (req, res){	
		console.log(req.body);
				runCypherQuery( queries['setNewGirlTag'], {"tagName":req.body.name}, function (err, result){
					if (err)
						console.error(err);
					else{			
						console.log("[OK] Got response from Neo: setNewGirlTag " + JSON.stringify(result, null, "  "));											
						res.end(JSON.stringify(result.results[0]));	
					}
				});
			},

	setNewClipTag: function (req, res){	
		console.log(req.body);
				runCypherQuery( queries['setNewClipTag'], {"tagName":req.body.name}, function (err, result){
					if (err)
						console.error(err);
					else{			
						console.log("[OK] Got response from Neo: setNewClipTag " + JSON.stringify(result, null, "  "));											
						res.end(JSON.stringify(result.results[0]));	
					}
				});
			},

	updateGirl: function (req, res){	
		console.log(req.body);
				runCypherQuery( queries['updateGirl'], {"girlTags":req.body.girlTags, "girlId": req.body.girlId,
					"girlName":req.body.girlName, "girlBorn": req.body.girlBorn, "girlRating": req.body.girlRating}, 
					function (err, result){
						if (err)
							console.error(err);
						else{			
							console.log("[OK] Got response from Neo: setNewClipTag " + JSON.stringify(result, null, "  "));											
							res.end(JSON.stringify(result.results[0]));	
						}
					});
			}

}

function runCypherQuery(query, params, callback) {	
		query.parameters = params;	
		console.log("QUERY ----- " + JSON.stringify(query));
	  request.post({
	      uri: neoURL,//+"/commit",
	      //params:params,
	      accept: 'application/json, text/plain, */*',
	      'content-type': 'application/json;charset=utf-8',
	      'X-stream': true,
	      json: {statements:[query]}
	    },
	    function (err, resp, body) {
	    	callback(err, body);
	    });
	};
