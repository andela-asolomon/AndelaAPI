'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.choiceOne = [{id: 'choice1'},{id: 'choice2'}];
		$scope.choiceTwo = [{id: 'choice1'},{id: 'choice2'}];
		$scope.optionOne=[];
		$scope.optionTwo=[];
		$scope.questions=[];
		$scope.selected = "";

		$scope.setShow = function(val) {
			$scope.selected = val;
		}

		$scope.isSelected = function(val) {
			return val === $scope.selected;
		}

		$scope.addNewChoice = function(num) {
			var newItemNo;
			if (num === 1) {
                newItemNo = $scope.choiceOne.length+1;
			    $scope.choiceOne.push({id: 'choice'+newItemNo});
			} else {
				 newItemNo = $scope.choiceTwo.length+1;
			     $scope.choiceTwo.push({id: 'choice'+newItemNo});
			}
		};

		$scope.deleteChoice = function(index, num) {
			if (num === 1) {
				if ($scope.choiceOne.length === 2) {
					alert("sorry u can't touch this");
				} else {
			        $scope.choiceOne.splice(index, 1);
			        $scope.optionOne.splice(index, 1);
			        changeIds($scope.choiceOne);
				}
			} else {
				 if ($scope.choiceTwo.length === 2) {
					alert("sorry u can't touch this");
				 } else {
			        $scope.choiceTwo.splice(index, 1);
			        $scope.optionTwo.splice(index, 1);
			        changeIds($scope.choiceTwo);
				 }
			}
		};

		var changeIds = function(array) {
            for (var i in array) {
            	array[i].id = 'choice' + i;
            }
		};

		$scope.showAddChoice = function(choice, num) {
			if (num === 1)
			   return choice.id === $scope.choiceOne[$scope.choiceOne.length-1].id;
			else
				return choice.id === $scope.choiceTwo[$scope.choiceTwo.length-1].id;
		};

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				//If successful we assign the response to the global user model
				$scope.authentication.user = response;

				//And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				//If successful we assign the response to the global user model
				$scope.authentication.user = response;

				//And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);