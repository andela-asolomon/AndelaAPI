'use strict';

// Lists controller
angular.module('admin').controller('AdminController', ['$scope', '$http', 'Authentication', '$stateParams', '$location',
  function($scope, $http, Authentication, $stateParams, $location) {

    $scope.user = Authentication.user;


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
        $scope.trainees = response;
        console.log('Success - Done', response);
        
      }).error(function(response) {
        $scope.error = response.message;
        console.log('Error - can not');
      });
    };

    $scope.listApplicants = function() {
      $http.get('/admin/applicants').success(function(response) {
        // If successful show success message and clear form
        $scope.success = true;
        $scope.applicants = response;
        console.log('Success - Done', response);
        
      }).error(function(response) {
        $scope.error = response.message;
        console.log('Error - can not');
      });
    };

    $scope.viewApplicant = function() {
      $http.get('/admin/appt/' + $stateParams.apptId).success(function(response) {
        // If successful show success message and clear form
        $scope.success = true;
        $scope.appt = response;
        console.log('Success - Done', response);
        
      }).error(function(response) {
        $scope.error = response.message;
        console.log('Error - can not');
      });
    };

    $scope.deleteUser = function(userId) {
      $http.delete('/admin/user/' + userId).success(function(response) {
        // If successful show success message and clear form
        $scope.success = true;
        // $scope.appt = response;
        console.log('Success - Done', response);
        
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
        
      }).error(function(response) {
        $scope.error = response.message;
        console.log('Error - can not');
      });
    };

    $scope.changeStatus = function() {
      console.log('hahaha');
      console.log('$scope.appt', $scope.appt);
      $http.put('/admin/appt/' + $stateParams.apptId, $scope.data).success(function(response) {
        // If successful show success message and clear form
        $scope.success = true;
        // $location.path('admin/appt/' + response._id);
        console.log('Success - Done', response);
        
      }).error(function(response) {
        $scope.error = response.message;
        console.log('Error - can not');
      });
    }; 

    $scope.changeRole = function() {
      console.log($scope.apptId);
      // console.log(typeof $scope.credentials.role);
      $http.put('/admin/appt/' + $scope.apptId + '/role', $scope.appt).success(function(response) {
        // If successful show success message and clear form
        $scope.success = true;
        
      }).error(function(response) {
        $scope.error = response.message;
        console.log('Error - can not');
      });
    }; 

    $scope.viewInstructor = function(instrId) {
      $http.get('/admin/appt/' + instrId).success(function(response) {
        // If successful show success message and clear form
        $scope.success = true;
        console.log('Success - Done', response);
        
      }).error(function(response) {
        $scope.error = response.message;
        console.log('Error - can not');
      });
    };

    // $scope.changeInstrRole = function() {
    //   console.log($scope.apptId);
    //   // console.log(typeof $scope.credentials.role);
    //   $http.put('/admin/appt/' + $scope.apptId + '/role', $scope.appt).success(function(response) {
    //     // If successful show success message and clear form
    //     $scope.success = true;
        
    //   }).error(function(response) {
    //     $scope.error = response.message;
    //     console.log('Error - can not');
    //   });
    // }; 
  }
]);