'use strict';

// Setting up route
angular.module('applicant').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('listCamps', {
			url:'/camps',
			templateUrl:'modules/applicant/views/applicant.client.view.html'
		});
	}
]);