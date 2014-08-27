'use strict';

angular.module('applicant').controller('ApplicantController', ['$scope',  '$http', '$stateParams', '$location', 'Applicants', 'Users',
        function($scope, $http, $stateParams, $location, Applicants, Users){
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
            $scope.show_profile = function(){
                 var url = '/users/' + $stateParams.logged_inId;
                $http.get(url).success(function(response) {
                        $scope.user_profile = response;
                        console.log($scope.user_profile);
                });
            };
              
}]);