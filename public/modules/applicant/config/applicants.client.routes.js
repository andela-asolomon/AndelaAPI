'use strict';

//Setting up route
angular.module('applicant').config(['$stateProvider',
	function($stateProvider) {
		// Applicant state routing
		$stateProvider.
		state('applicantsprofile', {
			url: '/profile/applicant',
			templateUrl: 'modules/applicant/views/applicantion.client.view.html'
		}).
		state('fellowsprofile', {
			url: '/profile/fellows',
			templateUrl: 'modules/applicant/views/list.fellow.client.view.html'
		}).
		state('traineesprofile', {
			url: '/profile/trainee',
			templateUrl: 'modules/applicant/views/trainee.client.view.html'
		}).
		state('fellow-profile', {
			url: '/profile/:applicantId',
			templateUrl: 'modules/applicant/views/fellow.client.view.html'
		});
		
	}
]);