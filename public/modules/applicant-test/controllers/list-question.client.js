'use strict';

angular.module('applicant-test').controller('ApplicantTestController', ['$scope', '$stateParams', '$location', 'Authentication', 'Questions',
    function($scope, $stateParams, $location, Authentication, Questions) {
        $scope.authentication =Authentication;

        $scope.find = function(){
            $scope.questions = Questions.query();
        };

    }]);