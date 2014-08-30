
'use strict';

// Lists controller
angular.module('admin').controller('AdminController', ['$scope', '$http', 'Authentication', '$stateParams', '$location',
  function($scope, $http, Authentication, $stateParams, $location) {

    $scope.user = Authentication.user;

    $scope.choiceOne = [{id: 'choice1'},{id: 'choice2'}]; //answer to question one
    $scope.choiceTwo = [{id: 'choice1'},{id: 'choice2'}]; //answer to question two
    $scope.optionOne=[];  //options for question one
    $scope.optionTwo=[]; //oprions for question two
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
      console.log($scope.data);
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
        $scope.appt = response;
        console.log('Success - Done', response);
        
      }).error(function(response) {
        $scope.error = response.message;
        console.log('Error - can not');
      });
    };

    $scope.createTest = function() {
      console.log();
      $http.post('/admin/test', {questions: $scope.questions, optionOne: $scope.optionOne, optionTwo: $scope.optionTwo, 
                                  testName: $scope.testName, answerOne: $scope.test.answerOne, 
                                  answerTwo: $scope.test.answerTwo}).success(function(response) {
        // If successful show success message and clear form
        $scope.success = true;
        console.log('Success - Done', response);
        $location.path('/admin/test');
        
      }).error(function(response) {
        $scope.error = response.message;
        console.log('Error - can not');
      });
    };

    $scope.viewTests = function() {
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

    $scope.viewTest = function() {
      $http.get('/admin/test/' + $stateParams.testId).success(function(response) {
        $scope.test = response;

        $scope.testNameEditorEnabled = false;
        $scope.questionEditorEnabled = [];
        $scope.editableQuestion = [];
        $scope.optionEditorEnabled = [];
        $scope.editableOption = [];
        $scope.displayerrmsg = [];

        for (var i in $scope.test.questions){
          $scope.questionEditorEnabled[i] = false;
          $scope.optionEditorEnabled[i] = [];
          $scope.editableOption[i] = [];
          for (var j in $scope.test.questions[i].questOptions) {
            $scope.optionEditorEnabled[i][j] = false;
            $scope.editableOption[i][j] = {};
          }
        }
        
        $scope.enableEditor = function(field, index, optionIndex) {
          if (field === 'testName'){
            $scope.testNameEditorEnabled = true; 
            $scope.editabletestName = $scope.test.testName; 
          }
          if (field === 'question'){
            $scope.questionEditorEnabled[index] = true; 
            $scope.editableQuestion[index] = $scope.test.questions[index].question; 
          }

          if (field === 'option'){
            $scope.optionEditorEnabled[index][optionIndex] = true; 
            $scope.editableOption[index][optionIndex].option = 
                                  $scope.test.questions[index].questOptions[optionIndex].option;
          }
        };
        
        $scope.disableEditor = function(field, index, optionIndex) {
          if (field === 'testName'){
            $scope.testNameEditorEnabled = false;
          }
          if (field === 'question'){
            $scope.questionEditorEnabled[index] = false;
          }
          if (field === 'option'){
            $scope.optionEditorEnabled[index][optionIndex] = false;
          }
        };
        // Checks to see if all answers are set to same (false/true). 
        // Returns true if all are the same
        var checkAllanswers = function (questOptions) {
          var firstOption = questOptions[0].answer
          for (var i in questOptions) {
            if (firstOption !== questOptions[i].answer){
              return false
            }
          }
          return true;
        }

        $scope.save = function(field, index, optionIndex) {
          if (field === 'testName'){
            $scope.test.testName = $scope.editabletestName;
            $scope.changeTestName($scope.test);
          }
          if (field === 'question'){
            $scope.test.questions[index].question = $scope.editableQuestion[index];
            $scope.updateQuestion($scope.test, index);
          }
          if (field === 'option'){
            $scope.test.questions[index].questOptions[optionIndex].option = 
                                                    $scope.editableOption[index][optionIndex].option;
            if ($scope.editableOption[index][optionIndex].answer === undefined ||
                              $scope.editableOption[index][optionIndex].answer === 'undefined') {
              $scope.editableOption[index][optionIndex].answer = false;
            }

            // if the option's answer field changes, then change others to it's oppossite
            if ($scope.editableOption[index][optionIndex].answer === true){
              for (var i in $scope.test.questions[index].questOptions) {
                if (i === optionIndex) {continue;}
                $scope.test.questions[index].questOptions[i].answer = false;
              }
            }
            $scope.test.questions[index].questOptions[optionIndex].answer = 
                                                    $scope.editableOption[index][optionIndex].answer;
            
            // Set error message if no answer is selected
            if (checkAllanswers ($scope.test.questions[index].questOptions)){
              $scope.displayerrmsg[index] = true;
            }
            else{
              $scope.displayerrmsg[index] = false;
            }
            
            
            $scope.updateQuestion($scope.test, index);
          }

          $scope.disableEditor(field, index, optionIndex);
        };

        console.log('Success - Done', response);        
      }).error(function(response) {
        $scope.error = response.message;
        console.log('Error - can not');
      });
    };

    $scope.changeTestName = function(test) {
      $http.put('/admin/test/' + test._id, test).success(function(response) {
        console.log('Success - Done', response);        
      }).error(function(response) {
        $scope.error = response.message;
        console.log('Error - can not');
      });
    };

    $scope.updateQuestion = function(test, quesIndex) {
      $http.put('/admin/test/' + test._id + '/' + test.questions[quesIndex]._id, test.questions[quesIndex]).success(function(response) {
        console.log('Success - Done', response);        
      }).error(function(response) {
        $scope.error = response.message;
        console.log('Error - can not');
      });
    };

  }

]);