// core.js

var VideoCatalog = angular.module('NodeVideoCatalog', []);

VideoCatalog.controller ("mainController", [$scope, 
function mainController ($scope, $http){
	$scope.formData = {};

	// Get all todos and show them
	$http.get('/api/todos')			// API returns the list when GET
		.success( function (data){
			$scope.todos = data;
			console.log(data);
		})
		.error(function (data){
			console.log('Error: ' + data);
		});

	// When submitting the add form send the text to the API
	$scope.createTodo = function(){
		$http.post('/api/todos', $scope.formData)	// API adds a todo with POST data when post
			.success (function (data){
				$scope.formData = {}; 	// Clearing the form
				$scope.todos = data;	// Adding data to the scope
				console.log (data);
			})
			.error(function(data){
				console.log('Error: ' + data);
			});
	};

	// Delete a ToDo after done
	$scope.deleteTodo = function (id){
		$http.delete('/api/todos/' + id)	// API deletes /api/todos/:todo_id
			.success(function (data){
				$scope.todos = data;
			})
			.error (function(data){
				console.log('Error: ' + data);
			});
	};
};

);