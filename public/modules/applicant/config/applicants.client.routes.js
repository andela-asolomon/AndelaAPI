'use strict';

// Setting up route
angular.module('applicant').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('listCamps', {
			url:'/camps',
			templateUrl:'modules/applicant/views/applicant.client.view.html'
		}).

		state('signup', {
			url: '/123/signup',
			templateUrl: 'modules/applicant/views/applicant.client.view.html'
		});
	}
]);