'use strict';

//Setting up route
angular.module('bootcamps').config(['$stateProvider',
	function($stateProvider) {
		// Bootcamps state routing
		$stateProvider.
		state('listBootcamps', {
			url: '/bootcamps',
			templateUrl: 'modules/bootcamps/views/list-bootcamps.client.view.html'
		}).
		state('createBootcamp', {
			url: '/bootcamps/create',
			templateUrl: 'modules/bootcamps/views/create-bootcamp.client.view.html'
		}).
		state('viewBootcamp', {
			url: '/bootcamps/:bootcampId',
			templateUrl: 'modules/bootcamps/views/view-bootcamp.client.view.html'
		}).
		state('editBootcamp', {
			url: '/bootcamps/:bootcampId/edit',
			templateUrl: 'modules/bootcamps/views/edit-bootcamp.client.view.html'
		});
	}
]);