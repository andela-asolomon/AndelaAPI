'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
	}
])


// .directive('scrollOnclick', function(){
// 	return {
// 		restrict: 'A',
// 		link: function($scope, $elm){
// 			$elm.on('click', function(){
// 				$('html,body').animate({
//                         scrollTop: target.offset().top
//                     }, 1000);
//                     return false;
// 			});
// 		};
// 	}
// });

