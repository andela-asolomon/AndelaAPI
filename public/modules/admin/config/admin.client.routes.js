'use strict';

//Setting up route
angular.module('admin').config(['$stateProvider',
  function($stateProvider) {
    // Lists state routing
    $stateProvider.
    state('createAdmin', {
      url: '/admin/create',
      templateUrl: 'modules/admin/views/admin.create.users.html'
    });
  }
]);