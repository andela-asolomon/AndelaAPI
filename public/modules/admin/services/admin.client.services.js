'use strict';

// Admin service for admin variables
angular.module('admin').factory('Users', ['$resource',
	function($resource) {
		return $resource('admin', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);