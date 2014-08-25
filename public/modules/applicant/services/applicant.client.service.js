'use strict';

//Applicants service used for communicating with the camp REST endpoints
angular.module('applicant').factory('Applicants', ['$resource',
	function($resource) {
		return $resource('applicants/:applicantId', { applicantId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

angular.module('applicant').factory('Users', ['$resource',
	function($resource) {
		return $resource('users/:userId', { userId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);