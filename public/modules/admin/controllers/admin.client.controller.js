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

    $scope.viewTrainees = function() {
      console.log('viewTrainees called');
      $http.get('/admin/trainees').success(function(response) {
        // If successful show success message and clear form
        $scope.success = true;
        console.log('Success - Done', response);
        $scope.passwordDetails = null;
      }).error(function(response) {
        $scope.error = response.message;
        console.log('Error - can not');
      });
    };

    $scope.listApplicants = function() {
      $http.get('/admin/applicants').success(function(response) {
        // If successful show success message and clear form
        $scope.success = true;
        console.log('Success - Done', response);
        $scope.passwordDetails = null;
      }).error(function(response) {
        $scope.error = response.message;
        console.log('Error - can not');
      });
    };

    $scope.listApplicants = function() {
      $http.get('/admin/fellows').success(function(response) {
        // If successful show success message and clear form
        $scope.success = true;
        console.log('Success - Done', response);
        $scope.passwordDetails = null;
      }).error(function(response) {
        $scope.error = response.message;
        console.log('Error - can not');
      });
    };

    $scope.listFellows = function() {
      $http.get('/admin/fellows').success(function(response) {
        // If successful show success message and clear form
        $scope.success = true;
        console.log('Success - Done', response);
        $scope.passwordDetails = null;
      }).error(function(response) {
        $scope.error = response.message;
        console.log('Error - can not');
      });
    };

    $scope.listInstructors = function() {
      $http.get('/admin/instructors').success(function(response) {
        // If successful show success message and clear form
        $scope.success = true;
        console.log('Success - Done', response);
        $scope.passwordDetails = null;
      }).error(function(response) {
        $scope.error = response.message;
        console.log('Error - can not');
      });
    };

    $scope.listAdmins = function() {
      $http.get('/admin/admins').success(function(response) {
        // If successful show success message and clear form
        $scope.success = true;
        console.log('Success - Done', response);
        $scope.passwordDetails = null;
      }).error(function(response) {
        $scope.error = response.message;
        console.log('Error - can not');
      });
    };

    $scope.viewApplicant = function(apptId) {
      $http.get('/admin/appt/' + apptId).success(function(response) {
        // If successful show success message and clear form
        $scope.success = true;
        console.log('Success - Done', response);
        $scope.passwordDetails = null;
      }).error(function(response) {
        $scope.error = response.message;
        console.log('Error - can not');
      });
    };

    
  
  }
]);