
'use strict';

// Lists controller
angular.module('admin').controller('AdminController', ['$scope', '$http', 'Authentication', '$stateParams', '$location',
  function($scope, $http, Authentication, $stateParams, $location) {

    $scope.choiceOne = [{id: 'choice1'},{id: 'choice2'}];
    $scope.choiceTwo = [{id: 'choice1'},{id: 'choice2'}];
    $scope.optionOne=[];  
    $scope.optionTwo=[];
    $scope.questions=[];
    $scope.selected = '', $scope.testName = '',$scope.answered = false;
    $scope.answeredTwo = false;

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
            if (parseInt($scope.test.answerOne, 10) === $scope.choiceOne.length - 1) {
              $scope.test.answerOne = $scope.test.answerOne-1;
              console.log('yea');
            }
            doDelete($scope.choiceOne, $scope.optionOne, index);
            console.log($scope.test.answerOne); console.log(index);
            // if (parseInt($scope.test.answerOne, 10) === index) {
            //   $scope.answered.bool = false;
               console.log($scope.answered);
            // }
            // $scope.optionOne.splice(index, 1);
            // changeIds($scope.choiceOne);
      } else {
        if (parseInt($scope.test.answerTwo, 10) === $scope.choiceTwo.length - 1) {
              $scope.test.answerTwo = $scope.test.answerTwo-1;
         }
        doDelete($scope.choiceTwo, $scope.optionTwo, index);
        console.log($scope.test.answerTwo);
        // if ($scope.test.answerTwo === index) {
        //       $scope.answeredTwo.bool = false;
              console.log($scope.answeredTwo);
        // }
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
        //doChange($scope.optionOne,  index); console.log($scope.optionOne.length);
        //$scope.test.answerOne = index;
        console.log('answerOne: ' + $scope.test.answerOne);
        $scope.answered = true;
       // console.log($scope.answered.bool);
        //$scope.answered.index = index;
        //console.log('answerIndex: ' + $scope.answered.index);
      } else {
        //doChange($scope.optionTwo,  index);
        console.log('answerTwo: ' + $scope.test.answerTwo);
        $scope.answeredTwo = true;
        //$scope.answeredTwo.index = index;
        //console.log('answerIndex: ' + $scope.answeredTwo.index);
      }
    };


    // Create new user
    $scope.create = function() {
      console.log('createInstructor called');
      $http.post('/admin/create', $scope.credentials).success(function(response) {
        // If successful show success message and clear form
        $scope.success = true;
        console.log('Success - Done');
        $scope.passwordDetails = null;
      }).error(function(response) {
        $scope.error = response.message;
        console.log('Error - can not');
      });
    };

    $scope.viewTrainees = function() {
      console.log('viewTrainees called');
      $http.get('/admin/trainees').success(function(response) {
        // If successful show success message and clear form
        $scope.role = [];
        $scope.success = true;
        $scope.trainees = response;
        console.log('Success - Done', response);
        
      }).error(function(response) {
        $scope.error = response.message;
        console.log('Error - can not');
      });
    };

    $scope.listApplicants = function() {
      $scope.statusInit = 'pending';
      $http.get('/admin/applicants').success(function(response) {
        // If successful show success message and clear form
        $scope.success = true;
        $scope.applicants = response;
        console.log('Success - Done', $scope.applicants);
        
      }).error(function(response) {
        $scope.error = response.message;
        console.log('Error - can not');
      });
    };

    $scope.viewApplicant = function() {
      $http.get('/admin/appt/' + $stateParams.apptId).success(function(response) {
        // If successful show success message and clear form
        $scope.data = {};
        $scope.success = true;
        $scope.appt = response;
        console.log('Success - Done', response);
        
      }).error(function(response) {
        $scope.error = response.message;
        console.log('Error - can not');
      });
    };


    $scope.deleteUser = function(userId, index) {
      $scope.applicants.splice(index, 1);
    
      $http.delete('/admin/user/' + userId).success(function(response) {
        // If successful show success message and clear form
        $scope.success = true;

        // $scope.appt = response;
        console.log('Success - Done', response);
        
      }).error(function(response) {
        $scope.error = response.message;
        console.log($scope.error);
        // console.log('Error - can not');
      });
    };

    $scope.deleteFellow = function(userId, index) {
      $scope.fellows.splice(index, 1);
    
      $http.delete('/admin/user/' + userId).success(function(response) {
        // If successful show success message and clear form
        $scope.success = true;

        // $scope.appt = response;
        console.log('Success - Done', response);
        
      }).error(function(response) {
        $scope.error = response.message;
        console.log($scope.error);
        
      });
    };

    $scope.listFellows = function() {
      $http.get('/admin/fellows').success(function(response) {
        // If successful show success message and clear form
        $scope.fellows = response;
        $scope.success = true;
        console.log('Success - Done', response);
        
      }).error(function(response) {
        $scope.error = response.message;
        console.log('Error - can not');
      });
    };

    $scope.listInstructors = function() {
      $http.get('/admin/instructors').success(function(response) {
        // If successful show success message and clear form
        $scope.success = true;
        console.log('Success - Done', response);
        
      }).error(function(response) {
        $scope.error = response.message;
        console.log('Error - can not');
      });
    };

    $scope.listAdmins = function() {
      $http.get('/admin/admins').success(function(response) {
        // If successful show success message and clear form
        $scope.success = true;
        console.log('Success - Done', response);
        
      }).error(function(response) {
        $scope.error = response.message;
        console.log('Error - can not');
      });
    };

    $scope.changeStatus = function() {

      $http.put('/admin/appt/' + $stateParams.apptId, $scope.data).success(function(response) {

        // If successful show success message and clear form
        $scope.success = true;
        // $location.path('admin/appt/' + response._id);
        console.log('Success - Done', response);
        $location.path('/admin/appts');

      }).error(function(response) {
        $scope.error = response.message;
        console.log('Error - can not');
      });
    }; 

    $scope.changeRoleToFellow = function(trainee_id, index) {
      
      console.log(trainee_id);
      console.log($scope.role[index]);
      $scope.trainees.splice(index, 1);
      
      $http.put('/admin/appt/' + trainee_id + '/role', {role: $scope.role[index]}).success(function(response) {
        // If successful show success message and clear form
        $scope.success = true;
        
      }).error(function(response) {
        $scope.error = response.message;
        console.log('Error - can not');
      });
    }; 

    $scope.viewInstructor = function(instrId) {
      $http.get('/admin/appt/' + instrId).success(function(response) {
        // If successful show success message and clear form
        $scope.success = true;
        console.log('Success - Done', response);
        
      }).error(function(response) {
        $scope.error = response.message;
        console.log('Error - can not');
      });
    };

    $scope.rateFellow = function() {
      $http.post('/admin/trainee/' + $stateParams.apptId + '/rate', $scope.data).success(function(response) {
        // If successful show success message and clear form
        $scope.success = true;
        console.log('Success - Done', response);
        $location.path('/admin/fellows');
        
      }).error(function(response) {
        $scope.error = response.message;
        console.log('Error - can not');
      });
    };


    // $scope.changeInstrRole = function() {
    //   console.log($scope.apptId);
    //   // console.log(typeof $scope.credentials.role);
    //   $http.put('/admin/appt/' + $scope.apptId + '/role', $scope.appt).success(function(response) {
    //     // If successful show success message and clear form
    //     $scope.success = true;
        
    //   }).error(function(response) {
    //     $scope.error = response.message;
    //     console.log('Error - can not');
    //   });
    // }; 


    $scope.createTest = function() {
      console.log();
      $http.post('/admin/test', {questions: $scope.questions, optionOne: $scope.optionOne, optionTwo: $scope.optionTwo, testName: $scope.testName}).success(function(response) {
        // If successful show success message and clear form
        $scope.success = true;
        console.log('Success - Done', response);
        $location.path('/admin/test');
        
      }).error(function(response) {
        $scope.error = response.message;
        console.log('Error - can not');
      });
    };

    $scope.viewTest = function() {
      $http.get('/admin/test').success(function(response) {
        // If successful show success message and clear form
        $scope.success = true;
        $scope.tests = response;
        console.log('Success - Done', response);        
      }).error(function(response) {
        $scope.error = response.message;
        console.log('Error - can not');
      });
    };

  }

]);