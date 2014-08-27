'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.choiceOne = [{id: 'choice1'},{id: 'choice2'}];
		$scope.choiceTwo = [{id: 'choice1'},{id: 'choice2'}];
		$scope.optionOne=[], $scope.optionTwo=[], $scope.questions=[];
		$scope.selected = '', $scope.answered = { bool: false, index: -1 };
		$scope.answeredTwo = { bool: false, index: -1 };

		$scope.setShow = function(val) {
			$scope.selected = val;
		};

		$scope.isSelected = function(val) {
			return val === $scope.selected;
		};

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
		        //$scope.choiceOne.splice(index, 1);
                doDelete($scope.choiceOne, $scope.optionOne, index);
		        if ($scope.answered.index === index) {
		        	$scope.answered.bool = false;
		        }
		        // $scope.optionOne.splice(index, 1);
		        // changeIds($scope.choiceOne);
			} else {
				doDelete($scope.choiceTwo, $scope.optionTwo, index);
				if ($scope.answeredTwo.index === index) {
		        	$scope.answeredTwo.bool = false;
		        }
		        // $scope.choiceTwo.splice(index, 1);
		        // $scope.optionTwo.splice(index, 1);
		        // changeIds($scope.choiceTwo);
			}
		};

		var doDelete = function(choiceArr, optionArr, index) {
            choiceArr.splice(index, 1);
            optionArr.splice(index, 1);

            for (var i in choiceArr) {
            	choiceArr[i].id = 'choice' + i;
            }
		};

		$scope.showAddChoice = function(choice, num) {
			if (num === 1)
			   return choice.id === $scope.choiceOne[$scope.choiceOne.length-1].id;
			else
				return choice.id === $scope.choiceTwo[$scope.choiceTwo.length-1].id;
		};

		$scope.changeAnsVal = function(index, num) { console.log("y");
			if (num === 1) { 
				doChange($scope.optionOne, index); console.log($scope.optionOne.length);
				$scope.answered.bool = true;
				$scope.answered.index = index;
			} else {
				doChange($scope.optionTwo, index);
				$scope.answeredTwo.bool = true;
				$scope.answeredTwo.index = index;
			}
		};

		var doChange = function (array, index) {
			for (var i in array) {
            	if (parseInt(i,10) !== index) {
            		array[i].answer = 'false';
            		console.log("yea");
            	} else {
            		array[i].answer= 'true';
            	}
                
            }
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
				console.log($scope.authentication.user._id);
				console.log(response);
				

				//And redirect to the right page
				if ($scope.authentication.user.role === 'admin'){
					$location.path('/admin/welcome');

				}
				else if ($scope.authentication.user.role === 'instructor')
				{
					$location.path('/instructors/home');
				}

				else if ($scope.authentication.user.role === 'fellow' || 'trainee' || 'applicant'){
					$location.path('/logged_in_user/' + $scope.authentication.user._id);

				}
				 else{
					$location.path('/');
				 }
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);