'use strict';

angular.module('applicant-test').controller('ApplicantTestController', ['$scope', '$stateParams', '$location', 'Authentication', 'Questions', '$http',
    function($scope, $stateParams, $location, Authentication, Questions, $http ) {
        
        $scope.authentication =Authentication;



        $scope.find = function(){
    	var url = '/test/';
                $http.get(url).success(function(response) {
                    $scope.questions = response;
                    console.log('Questions init');
                    console.log($scope.questions);
                });

        };

		// $scope.findOne = function() {
  //           var url = '/test/' + $stateParams.testId;
  //           console.log('Getting stateParams');
  //           console.log($stateParams);
  //           $http.get(url).success(function(response) {
  //                   $scope.questions = response;
  //                   console.log('Questions init');
  //                   console.log($scope.questions);
  //               });
  //  //      	$scope.test = Questions.get({
		// 	// 	testId: $stateParams.testId
		// 	// });  
  //       };



    }]);