'use strict';

// Instructors controller
angular.module('instructors').controller('InstructorsController', ['$scope', '$rootScope', '$stateParams', '$location', 'Authentication', '$http',
	function($scope, $rootScope, $stateParams, $location, Authentication, $http) {
		$scope.user = Authentication.user;

		$scope.instructor_signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				//If successful we assign the response to the global user model
				$scope.user = response;
				console.log('signed');

				//And redirect to the right page
				console.log($scope.user);
				console.log($scope.credentials);

				if ($scope.user.role === 'instructor') {
					$location.path('/instructors/home');
				}
				else{
					console.log('instructorsigin');
					$location.path('/');

				}
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.listTrainees = function() {
			console.log('inside listcontroller');
		  	$http.get('/instr').success(function(response) {
		    // If successful show success message and clear form
		    // $scope.user;
		    console.log('working list');
		    	$scope.success = true;

		    	$scope.trainees = response;
		    	console.log($scope.trainees);
																																																				    	// $location.path('instructors/applicants');
		  }).error(function(response) {
		    $scope.error = response.message;

		  	});
		};

		$scope.listFellows = function() {
		  	$http.get('/instr/fellows').success(function(response) {
		    // If successful show success message and clear form
		    	$scope.success = true;
		    	$scope.fellows = response;
		    	console.log($scope.fellows);
		    	// $location.path('instructors'...);
		  }).error(function(response) {
		    $scope.error = response.message;

		  });
		};

		// $scope.viewFellow = function() {
		//   	$http.get('/instr/trainee/:traineeId').success(function(response) {
		//     // If successful show success message and clear form
		//     	$scope.success = true;
		//     	$scope.fellow = response;
		//     	// $location.path('instructors' + applicant._id);
		//   	}).error(function(response) {
		//     $scope.error = response.message;

		//   	});
		// };

		$rootScope.viewTrainee = function() {
			
			$rootScope.traineeId = $stateParams.applicantId;
			$http.get('/instr/trainee/' + $rootScope.traineeId).success(function(response) {
		    // If successful show success message and clear form
		    	$scope.success = true;
		    	$rootScope.trainee = response;
	
		    	$rootScope.assessments = $rootScope.trainee.assessments;   	    	
		    	angular.forEach($rootScope.trainee.assessments, function(assessment, key){
		    		$rootScope.assessment = assessment;
		    		console.log($rootScope.assessment);
		   
		    	});

		    	// $location.path('instructors' + applicant._id);
		  	}).error(function(response) {
		    $scope.error = response.message;

		  	});

		  	


		};


		$scope.createAssessment = function() {
			// create new assessment for trainee 
			$scope.assessment = ({
				assessment_name: this.assessment_name,
				assessment_date: this.assessment_date,
				score: this.score
			});

			console.log($scope.assessment);
			console.log($stateParams);
			console.log($scope.assessment.assessment_name);
			
				// $scope.enterNew = false;
			$http.post('/instr/trainee/'+ $stateParams.applicantId, $scope.assessment).success(function(response) {
				
				$location.path('/instructors/trainees/' + $stateParams.applicantId);
				
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			this.assessment_name = '';
			this.assessment_date = '';
			this.score = '';
		};

		$scope.editAssessment = function() {
			$scope.assessment_id = $stateParams.assessmentId;
		};

		$scope.updateAssessment = function() {

		  	$http.put('/instr/trainee/$stateParams.applicantId/$stateParams.assessmentId').success(function(response) {
		    // If successful show success message and clear form
		   
		    	$scope.success = true;
		    	// $location.path('/instructors/trainees/' + $stateParams.applicantId);
		  
		  	}).error(function(response) {
	    		$scope.error = response.message;

	  		});
		};


		$scope.deleteAssessment = function() {
			// $scope.success = $scope.error = null;
			    console.log($scope.trainee.assessments);
			angular.forEach($scope.trainee.assessments, function(assessment, key){
		    	$scope.assessment = assessment;
		    });
		    console.log($scope.assessment);
			// for (var i in $scope.assessment) {
			// 	if ($scope.assessments[i] === $scope.assessment) {
			// 		$scope.assessments.splice(i, 1);
		 //  			$http.delete('/instr/trainee/:traineeId/:assmtId').success(function(response) {
		 //    // If successful show success message and clear form
		 //    	// $scope._type = 'fellow';
			//     	console.log($scope.assessment);
			//     	$scope.success = true;
			//     	// $location.path('instructors'...);
			//   		}).error(function(response) {
			//     	$scope.error = response.message;

			//   		});
			//   	}
			// }
		};
 

		$scope.selectFellow = function() {
			console.log($scope.trainee.role);
			$scope.trainee.role = "fellow";
			console.log($scope.trainee);
			
		  	$http.put('/instr/trainee/' + $stateParams.applicantId, $scope.trainee).success(function(response) {
		    // If successful show success message and clear form
		    
		    	$scope.success = true;
		    	$location.path('instructors/fellow_selected/' + $scope.traineeId);
		  }).error(function(response) {
		    $scope.error = response.message;

		  });
		};
		$scope.listBootcamps = function() {
			$scope.appl_length= 0;
		  	$http.get('/instr/bootcamps').success(function(response) {
		    // If successful show success message and clear form
		    	$scope.success = true;
		    	$scope.bootcamps = response;
		  }).error(function(response) {
		    $scope.error = response.message;

		  });
		};


		$scope.viewBootcamp = function() {
			
		  	$http.get('/instr/camp/' + $stateParams.bootcampId).success(function(response) {
		    // If successful show success message and clear form
		    	$scope.success = true;
		    	$scope.bootcamp = response;
		    	console.log($scope.bootcamp);
			}).error(function(response) {
			    $scope.error = response.message;

			}); 

		};

		// $scope.rateTrainee = function(){
		// 	$scope.val='';
		// 	var url = '/instr/trainee/' + $stateParams.applicantId + '/rate';
		// 	$http.post(url).success(function(response) {
		//     // If successful show success message and clear form
		//     	$scope.success = true;
		// console.log( $stateParams.applicantId);
		//  console.log("value change");
		//     	// $location.path('instructors'...);
		//   	}).error(function(response) {
		//     $scope.error = response.message;


		//   	});

		// };

		// $scope.editRating = function(){
		// 	$http.put('/instr/skill/:userId/:skillId').success(function(response) {
		//     // If successful show success message and clear form
		//     	$scope.success = true;
		//     	// $location.path('instructors'...);
		//   	}).error(function(response) {
		//     $scope.error = response.message;

		//   	});

		// };

		// $scope.deleteRating = function(){
		// 	$scope.success = $scope.error = null;

		// 	$http.delete('/instr/skill/:userId/:skillId').success(function(response) {
		//     // If successful show success message and clear form
		//     	$scope.success = true;
		//     	// $location.path('instructors'...);
		//   	}).error(function(response) {
		//     $scope.error = response.message;

		//   	});

		// };

		// $scope.newAssessment = function() {
		// 	$scope.enterNew = true;
		// 	console.log($scope.assessment);
		// 	$scope.assessment = {
		// 		assessment_name: this.assessment_name,
		// 		assessment_date: this.assessment_date,
		// 		score: this.score
		// 	};

		// };
		
		

		
		

	}
		
	
]);

