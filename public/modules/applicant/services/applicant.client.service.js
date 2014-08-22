'use strict'

//Camps service used for communicating with the camp REST endpoints
angular.module('applicant', ['ngResource'])
    .factory('applicant', ['$resource', 
        function($resource){
            return $resource('/camps', {campId: '@_Id'}, {
                update: {
                    method: 'PUT'
                }

            });
        }]);