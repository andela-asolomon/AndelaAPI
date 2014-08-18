'use strict';

//Bootcamps service used to communicate Bootcamps REST endpoints
angular.module('bootcamps').factory('Bootcamps', ['$resource',
	function($resource) {
		return $resource('bootcamps/:bootcampId', { bootcampId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);