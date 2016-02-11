// Database calls to mongo

var mongoose = require ('mongoose');	// Including mongoose to create mongo objects

mongoose.connect('mongodb://localhost:27017'); 	//Connect to mongo in localhost 

var dataModel = require('./dataModel.js');
var Todo = mongoose.model(dataModel.TODO.name, dataModel.TODO.value);

exports.getAll = function (req, res){
	// use mongoose to get all todos in the database
	Todo.find(function (err, todos){
		// if there is an error retrieving, send the error. nothing after res.send(err) will execute
		if (err){
			res.send(err);
		}
		// Return all Todos in JSON
		res.json(todos);
	});
};

exports.createTodo = function (req, res){
	// Create a Todo, comes in an AJAX request, format (what, callback)
	Todo.create({
		text : req.body.text,
		done : false
	}, function (err, todo){
		if (err){
			res.send(err);
		}
		Todo.find(function(err,todos){
			if (err){
				res.send(err);
			}
			// Return all Todos in JSON
			res.json(todos);
		})
	});
};

exports.deleteTodo = function (req, res){
	Todo.remove({
		_id : req.params.todo_id
	}, function (err, todo){
		if (err){
			res.send(err);
		}
		Todo.find(function (err, todos){
			if (err){
				res.send(err);
			}
			res.json(todos);
		})
	});
};