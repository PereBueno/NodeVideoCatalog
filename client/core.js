// core.js

var NodeVideoCatalog = angular.module('NodeVideoCatalog',  []);

NodeVideoCatalog.config(['$locationProvider', function($locationProvider) {
  // Configure existing providers
  $locationProvider.hashPrefix('!');
  $locationProvider.html5Mode(true);
  
}]);

/*
NodeVideoCatalog.directive("select2",function(){
    return {
        restrict: 'AC',
        scope: {"ngModel": "="},
        select2: [{tags:true}],
        link: function(scope, element, attrs) {
            console.log("\nElement " + JSON.stringify(element, null, "    ") + "\nAttrs " + JSON.stringify(attrs, null, "    "));
        }
    };
});
*/
function mainController ($scope, $http, $location, $route){	

	$scope.newGirl = {}
/*	$scope.formData = {};

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
	*/
	//$scope.allClipTags=  ["hola1", "hola2"];
	// Get all todos and show them
	var getAllClipTags = function(){
		console.log("Starting query");
		$http.get('/API/get/tags/clips')			// API returns the list when GET
			.success( function (data){				
				$scope.allClipTags=  data;
				return data;				
			})
			.error(function (data){
				console.log('Error: ' + data);
			});	
		};
	$scope.allClipTags = getAllClipTags();

	var getAllGirlTags = function(){
		console.log("Starting query");
		$http.get('/API/get/tags/girls')			// API returns the list when GET
			.success( function (data){				
				$scope.allGirlTags=  data;
				return data;
			})
			.error(function (data){
				console.log('Error: ' + data);
			});	
		};
	$scope.allGirlTags = getAllGirlTags();

	var getAllGirls = function(){
		console.log("Starting query");
		$http.get('/API/get/girls')			// API returns the list when GET
			.success( function (data){
				$scope.allGirls=  data;
				return data;
			})
			.error(function (data){
				console.log('Error: ' + data);
			});	
		};
	$scope.allGirls = getAllGirls();

	var getAllSites = function(){
		console.log("Starting query");
		$http.get('/API/get/sites')			// API returns the list when GET
			.success( function (data){
				$scope.allSites=  data;
				return data;
			})
			.error(function (data){
				console.log('Error: ' + data);
			});	
		};
	$scope.allSites = getAllSites();

	var getAllClips = function(){
		console.log("Starting query");
		$http.get('/API/get/clips')			// API returns the list when GET
			.success( function (data){				
				$scope.allClips=  data;
				return data;
			})
			.error(function (data){
				console.log('Error: ' + data);
			});	
		};
	$scope.allClips = getAllClips();

	var getClipDetails = function(){		
		$http.get('/API/get/clip/' + $location.search().clip)
			.success( function (data){							
				$scope.clipDetails=  data.data[0];				
				//return data.data[0];
			})
			.error(function (data){
				console.log('Error: ' + data);
			});	
		};
	$scope.clipDetails = getClipDetails();

	
	var getGirlDetails = function(){		
		$http.get('/API/get/girl/' + $location.search().girl)
			.success( function (data){						
				window.MY_DATA = data;
				$scope.girlDetails=  data.data[0];
				$scope.girlEdited = data.data[0];
				/*$scope.girlEditedTags = data.data[0].row[3];
				$scope.girlEdited.tags = data.data[0].row[3];*/
				$scope.editingTags = [];
				data.data[0].row[3].forEach(function(value){$scope.editingTags.push(value.name)});

				console.log($scope.editingTags);
				return data.data[0];
			})
			.error(function (data){
				console.log('Error: ' + data);
			});	
		};

	$scope.girlDetails = getGirlDetails();

	// Data manipulation section
	$scope.saveClip = function(clip){
		console.log(clip);
		$http.post('/API/set/clip/', clip)
			.success(function (data){				
				$scope.newClip.changed=true;				
				$scope.newClip.saved=true;
				$http.post('/API/set/clip/girls', clip)
				.success(function (data){
					$scope.newClip.changed=false;
					$scope.newClip.saved=false;
					$http.post('/API/set/clip/tags', clip)
						.success(function (data){
							$scope.newClip.changed=false;
							$scope.newClip.saved=true;
							return true;
						})
						.error(function (error){
							console.log(error);
							$scope.newClip.changed=true;
							$scope.newClip.saved=false;
							return false;
						});	
				})
				.error(function (error){
					console.log(error);
					$scope.newClip.changed=true;
					$scope.newClip.saved=false;
					return false;
				});	
			})
			.error(function (error){
				console.log(error);
				$scope.newClip.changed=true;
				$scope.newClip.saved=false;
				return false;
			});
	};

	$scope.saveGirl = function(girl){
		//console.log(girl);		
		$http.post('/API/set/girl/', girl)
			.success(function (data){				
				$scope.newGirl.changed=true;				
				$scope.newGirl.saved=true;
				$http.post('/API/set/girl/tags', girl)
				.success(function (data){
					$scope.newGirl.changed=false;
					$scope.newGirl.saved=true;
					// Update girls list
					$http.get('/API/get/girls')			// API returns the list when GET
					.success( function (data){						
						$scope.allGirls=  data;
						return data;						
					})
					.error(function (data){
						console.log('Error: ' + data);
					});				
					
				})
				.error(function (error){
					console.log(error);
					$scope.newGirl.changed=true;
					$scope.newGirl.saved=false;
					return false;
				});	
			})
			.error(function (error){
				console.log(error);
				$scope.newGirl.changed=true;
				$scope.newGirl.saved=false;
				return false;
			});					
	};
	 
	$scope.saveGirlTag = function(tag){
		$scope.girlTag.changed=true;
		$scope.girlTag.saved=false;		
		$http.post('/API/set/tags/girl', tag)
			.success(function (data){				
				$scope.girlTag.changed=true;				
				$scope.girlTag.saved=true;	
				// Update tags
				$http.get('/API/get/tags/girls')			// API returns the list when GET
					.success( function (data){						
						$scope.allGirlTags=  data;
						return data;						
					})
					.error(function (data){
						console.log('Error: ' + data);
					});				
			})
			.error(function (error){
				console.log(error);
				$scope.girlTag.changed=true;
				$scope.girlTag.saved=false;
				return false;
			});					
	};

	$scope.saveClipTag = function(tag){
		$scope.clipTag.changed=true;
		$scope.clipTag.saved=false;
		console.log(tag);
		$http.post('/API/set/tags/clip', tag)
			.success(function (data){				
				$scope.clipTag.changed=true;				
				$scope.clipTag.saved=true;	
				// update tags list			
				$http.get('/API/get/tags/clips')			// API returns the list when GET
					.success( function (data){						
						$scope.allClipTags=  data;
						return data;						
					})
					.error(function (data){
						console.log('Error: ' + data);
					});				
			})
			.error(function (error){
				console.log(error);
				$scope.clipTag.changed=true;
				$scope.clipTag.saved=false;
				return false;
			});					
	};

	$scope.updateGirl = function(girl, tags){
		$scope.girlDetails.changed=true;
		$scope.girlDetails.saved=false;
		var data = {};		
		data.girlTags=tags;
		data.girlName=girl.row[1].name;
		data.girlBorn=girl.row[1].born;
		data.girlRating=girl.row[1].rating;
		data.girlId=girl.row[4];
		window.MY_GIRL=$scope.girlDetails;
		$http.post('/API/set/girl/update', data)
			.success(function (data){										
				$scope.girlDetails.row[1].born=girlBorn;
				$scope.girlDetails.row[1].name=girlName;
				$scope.girlDetails.row[1].rating=girlRating;
				for (i = 0; i < $scope.girlDetails.row[3].length; i++){
					$scope.girlDetails.row[3][i].name=tags[i];
				}
				$scope.girlDetails.changed=true;
				$scope.girlDetails.saved=true;
				return data;						
			})
			.error(function (data){
				console.log('Error: ' + data);
			});			
	}

//Debugging
	window.MY_SCOPE = $scope;
	window.MY_REQUEST = $http;
	window.MY_LOCATION = $location;
	window.MY_ROUTE = $route;

};
