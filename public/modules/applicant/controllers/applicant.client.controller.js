'use strict'

angular.module('applicant').controller('CampsController', ['$scope', '$stateParams', '$location', 'Applicants',
        function($scope, $stateParams, $location, Camps){

        	$scope.find = function(){
        		$scope.camps = Camps.query();
        		console.log($scope.camps)
        	}
            
        }]);