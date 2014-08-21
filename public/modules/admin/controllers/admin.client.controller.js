'use strict';

// Lists controller
angular.module('admin').controller('AdminController', ['$scope', '$http',
  function($scope, $http) {
    
    // Create new user
    $scope.create = function() {
      console.log('createInstructor called');
      $http.post('/admin/create', $scope.credentials).success(function(response) {
        // If successful show success message and clear form
        $scope.success = true;
        console.log('Success - Done');
        $scope.passwordDetails = null;
      }).error(function(response) {
        $scope.error = response.message;
        console.log('Error - can not');
      });
    };
  
  }
]);