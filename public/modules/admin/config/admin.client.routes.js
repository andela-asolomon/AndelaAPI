'use strict';

//Setting up route
angular.module('admin').config(['$stateProvider',
  function($stateProvider) {
    // Lists state routing
    $stateProvider.
    state('signInUser', {
      url: '/admin',
      templateUrl: 'modules/admin/views/admin.signin.view.html'
    }).
    state('createUser', {
      url: '/admin/create',
      templateUrl: 'modules/admin/views/admin.create.users.html'
    }).
    state('adminWelcome', {
      url: '/admin/welcome',
      templateUrl: 'modules/admin/views/admin.welcome.html'
    }).
    state('listAppts', {
      url: '/admin/appts',
      templateUrl: 'modules/admin/views/list.applicants.admin.html'
    }).
    state('viewcamp', {
      url: '/admin/camps/:campId',
      templateUrl: 'modules/admin/views/view.bootcamp.admin.html'
    }).
    state('viewAppt', {
      url: '/admin/appt/:apptId',
      templateUrl: 'modules/admin/views/view.applicant.admin.html'
    }).
    state('editAppt', {
      url: '/admin/editappt/:apptId',
      templateUrl: 'modules/admin/views/edit.appt.form.admin.html'
    }).
    state('listTrainees', {
      url: '/admin/trainees',
      templateUrl: 'modules/admin/views/list.trainees.admin.html'
    }).
    state('listFellows', {
      url: '/admin/fellows',
      templateUrl: 'modules/admin/views/list.fellows.admin.html'
    }).
    state('rateFellow', {
      url: '/fellows/:apptId/rate',
      templateUrl: 'modules/admin/views/rate.fellows.admin.html'
    }).
    state('createTest', {
      url: '/admin/test/create',
      templateUrl: 'modules/admin/views/admin.create.test.html'
    }).
    state('listcamps', {
      url: '/admin/camps',
      templateUrl: 'modules/admin/views/list.bootcamps.admin.html'
    }).
    state('listadmins', {
      url: '/admins',
      templateUrl: 'modules/admin/views/list.admins.admin.html'
    }).
    state('viewTest', {
      url: '/admin/test',
      templateUrl: 'modules/admin/views/view.tests.admin.html'
    }).
    state('createCamp', {
      url: '/admin/create/camp',
      templateUrl: 'modules/admin/views/admin.create.camp.html'
    }).
    state('editTest', {
      url: '/admin/test/:testId',
      templateUrl: 'modules/admin/views/view.test.admin.html'
    }).
    state('addQueTest', {
      url: '/admin/test/add/:testId',
      templateUrl: 'modules/admin/views/admin.add-question.test.html'
    });
  }
]);

