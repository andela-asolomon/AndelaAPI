'use strict';

// Bootcamps controller
angular.module('bootcamps').controller('BootcampsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Bootcamps',
	function($scope, $stateParams, $location, Authentication, Bootcamps ) {
		$scope.authentication = Authentication;

		// Create new Bootcamp
		$scope.create = function() {
			// Create new Bootcamp object
			var bootcamp = new Bootcamps ({
				name: this.name
			});

			// Redirect after save
			bootcamp.$save(function(response) {
				$location.path('bootcamps/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.name = '';
		};

		// Remove existing Bootcamp
		$scope.remove = function( bootcamp ) {
			if ( bootcamp ) { bootcamp.$remove();

				for (var i in $scope.bootcamps ) {
					if ($scope.bootcamps [i] === bootcamp ) {
						$scope.bootcamps.splice(i, 1);
					}
				}
			} else {
				$scope.bootcamp.$remove(function() {
					$location.path('bootcamps');
				});
			}
		};

		// Update existing Bootcamp
		$scope.update = function() {
			var bootcamp = $scope.bootcamp ;

			bootcamp.$update(function() {
				$location.path('bootcamps/' + bootcamp._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Bootcamps
		$scope.find = function() {
			$scope.bootcamps = Bootcamps.query();
		};

		// Find existing Bootcamp
		$scope.findOne = function() {
			$scope.bootcamp = Bootcamps.get({ 
				bootcampId: $stateParams.bootcampId
			});
		};
	}
]);