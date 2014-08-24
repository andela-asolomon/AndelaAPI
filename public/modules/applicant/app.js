var app = angular.module('multiform', [])
app.controller('multiformCtrl', function($scope){
	$scope.field = 1;
	$scope.prog_bar = 0;
	var color_class = ['progress', 'progress1', 'progress2', 'progress3'];
	$scope.classess = color_class[0];
	$scope.username = '';
	$scope.password1 = '';
	$scope.cpassword1 = '';
	$scope.state = false;
	$scope.show_next = function(value){
		console.log(value);
		if (value <4){
			$scope.field++;
			$scope.prog_bar = $scope.prog_bar + 33.33;
			$scope.classess = color_class[value];
			$scope.result = [$scope.username, $scope.password1, $scope.cpassword1,$scope.gender];	
		}
	};
	$scope.show_prev = function(value){
		console.log(value);
		if(value>1){
			$scope.field--;
			$scope.prog_bar = $scope.prog_bar - 33.33;
			$scope.classess = color_class[(value -2)];
		}
	};
	// $scope.confirm_password(
	// 	if ($scope.password1 === $scope.cpassword1){
	// 		$scope.state = true;
	// 	}
});