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

angular.module('admin').filter('range', function() {
    return function(input, total, start){
        total = parseInt(total);
        for (var i=start; i<total; i++)
            input.push(i);
        return input;
    };
});