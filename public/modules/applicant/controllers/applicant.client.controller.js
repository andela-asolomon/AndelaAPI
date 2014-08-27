'use strict';

angular.module('applicant').controller('ApplicantController', ['$scope',  '$http', '$stateParams', '$location', 'Applicants', 'Users',
        function($scope, $http, $stateParams, $location, Applicants, Users){
        	
                // $scope.find = function() {
                //         $http.get('/users').success(function(response) {
                //                 $scope.applicants = response;
                //                 console.log($scope.applicants);
                //                  // $location.path('/');
                //         }).error(function(response) {
                //                 $scope.error = response.message;
                //         });
                // };
                $scope.find = function() {
                    $scope.applicants = Users.query();
                    console.log($scope.applicants);
                };

                 $scope.findOne = function() {
                    var url = '/users/' + $stateParams.applicantId;
                    $http.get(url).success(function(response) {
                            $scope.applicant = response;
                            console.log($scope.applicant);
                    });
                };
                // $scope.find_bootcamp = function() {
                //     $scope.camp = Bootcamps.query();
                //     console.log($scope.camp);
                // };
              
}]);