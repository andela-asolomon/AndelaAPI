'use strict';

// Instructors controller
angular.module('instructors').controller('InstructorsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Instructors',
	function($scope, $stateParams, $location, Authentication, Instructors ) {
		$scope.authentication = Authentication;
		// $scope.listFellows = function(){

		// var url = '/instr/fellows';

		// $http({method: 'GET', url: url}).
		//     success(function(data, status, headers, config) {
		//     		$location.path('instructors'...);
		//     }).
		//     error(function(data, status, headers, config) {
		//       console.log('failed to list');
		//     });
		// };

		// or this one

		$scope.listFellows = function() {
		  	$http.get('/instr/fellows').success(function(response) {
		    // If successful show success message and clear form
		    	$scope.success = true;
		    	// $location.path('instructors'...);
		  }).error(function(response) {
		    $scope.error = response.message;

		  });
		};


		// $scope.viewTrainee = function(){

		// 	var url = '/instr/trainee/:traineeId';

		// 	$http({method: 'GET', url: url}).
		// 	    success(function(data, status, headers, config) {
		// 	       $location.path('instructors'...);
		// 	    }).
		// 	    error(function(data, status, headers, config) {
		// 	      console.log('failed');
		// 	    });
		// };

		// or this one

		$scope.viewTrainee = function() {
		  	$http.get('/instr/trainee/:traineeId').success(function(response) {
		    // If successful show success message and clear form
		    	$scope.success = true;
		    	// $location.path('instructors'...);
		  }).error(function(response) {
		    $scope.error = response.message;

		  });
		};


		scope.selectFellow = function(){

			var url = '/instr/trainee/:traineeId';
			// var traineeType = $scope.trainee._type;

			$http({method: 'PUT', url: url}).
			    success(function(data, status, headers, config) {
			      // $location.path('instructors'...);
			    }).
			    error(function(data, status, headers, config) {
			      console.log('failed');
			    });
		};

		// or this one

		$scope.selectFellow = function() {
		  	$http.put('/instr/trainee/:traineeId').success(function(response) {
		    // If successful show success message and clear form
		    	// $scope._type = fellow;
		    	$scope.success = true;
		    	// $location.path('instructors'...);
		  }).error(function(response) {
		    $scope.error = response.message;

		  });
		};








		// // Create new Instructor
		// $scope.create = function() {
		// 	// Create new Instructor object
		// 	var instructor = new Instructors ({
		// 		name: this.name
		// 	});

		// 	// Redirect after save
		// 	instructor.$save(function(response) {
		// 		$location.path('instructors/' + response._id);
		// 	}, function(errorResponse) {
		// 		$scope.error = errorResponse.data.message;
		// 	});

		// 	// Clear form fields
		// 	this.name = '';
		// };

		// // Remove existing Instructor
		// $scope.remove = function( instructor ) {
		// 	if ( instructor ) { instructor.$remove();

		// 		for (var i in $scope.instructors ) {
		// 			if ($scope.instructors [i] === instructor ) {
		// 				$scope.instructors.splice(i, 1);
		// 			}
		// 		}
		// 	} else {
		// 		$scope.instructor.$remove(function() {
		// 			$location.path('instructors');
		// 		});
		// 	}
		// };

		// // Update existing Instructor
		// $scope.update = function() {
		// 	var instructor = $scope.instructor ;

		// 	instructor.$update(function() {
		// 		$location.path('instructors/' + instructor._id);
		// 	}, function(errorResponse) {
		// 		$scope.error = errorResponse.data.message;
		// 	});
		// };

		// // Find a list of Instructors
		// $scope.find = function() {
		// 	$scope.instructors = Instructors.query();
		// };

		// // Find existing Instructor
		// $scope.findOne = function() {
		// 	$scope.instructor = Instructors.get({ 
		// 		instructorId: $stateParams.instructorId
		// 	});
		// };
	}
]);