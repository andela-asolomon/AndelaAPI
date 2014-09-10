
'use strict';

// Lists controller
angular.module('admin').controller('AdminController', ['$scope', '$http', 'Authentication', '$stateParams', '$location', '$modal', '$log',
  function($scope, $http, Authentication, $stateParams, $location, $modal, $log) {

    $scope.user = Authentication.user;

    $scope.weeks = 0;

    $scope.choiceOne = [{id: 'choice1'},{id: 'choice2'}]; //answer to question one
    $scope.choiceTwo = [{id: 'choice1'},{id: 'choice2'}]; //answer to question two
    $scope.optionOne=[];  //options for question one
    $scope.optionTwo=[]; //oprions for question two
    $scope.questions=[];
    $scope.selected = '';
    $scope.testName = '';
    $scope.answered = false;
    $scope.answeredTwo = false;
    $scope.camp_options = [];

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
            if (parseInt($scope.test.answerOne, 10) === $scope.choiceOne.length - 1) {
                $scope.test.answerOne = $scope.test.answerOne-1;
            }
            doDelete($scope.choiceOne, $scope.optionOne, index);
        } else {
            if (parseInt($scope.test.answerTwo, 10) === $scope.choiceTwo.length - 1) {
                $scope.test.answerTwo = $scope.test.answerTwo-1;
            }
            doDelete($scope.choiceTwo, $scope.optionTwo, index);
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

    $scope.changeAnsVal = function(index, num) {
        if (num === 1) {
            $scope.answered = true;
        } else {
            $scope.answeredTwo = true;
        }
    };


    // Create new user
    $scope.create = function(role) {
        if (role === 'admin'){
            $scope.credentials.role = 'admin';
        }
        if (role === 'inst'){
            $scope.credentials.role = 'instructor';
        }
        // console.log('createInstructor called', $scope.credentials);
        $http.post('/admin/create', $scope.credentials).success(function(response) {
            // If successful show success message and clear form
            $scope.success = true;
            $scope.passwordDetails = null;
            if (response.role === 'instructor') {
                $location.path('/admin/instrs');
            }
            else{
                $location.path('/admins');
            }
          
        }).error(function(response) {
            $scope.error = response.message;
        });
    };

    /**
    * Create camp
    */
    $scope.createCamp = function() {
        $http.post('/admin/camp', $scope.credentials).success(function(response){
            $location.path('/admin/camps');
        }).error(function(response) {
            $scope.error = response.message;
            if ($scope.error.type === 'date'){
                $scope.error = 'Please follow the date pattern specified M/D/YY e.g (use 2/5/2014 for 5th Feb 2014)';
            }
        });
    };
    
    $scope.viewcamp = function() {
        $http.get('/admin/camp/' + $stateParams.campId).success(function(response) {
          $scope.camp = response;

          $scope.editorEnabled = false;
    
          $scope.enableEditor = function() {
            $scope.editorEnabled = true;
            $scope.editableFirstName = $scope.camp.applicants.firstName;
            console.log('$scope.camp.applicants.firstName:' + $scope.camp.applicants.email);
            $scope.editableLastName = $scope.camp.applicants.lastName;
            $scope.editableEmail = $scope.camp.applicants.email;
          };
          
          $scope.disableEditor = function() {
            $scope.editorEnabled = false;
          };
          
          $scope.save = function() {
            $scope.camp.applicants.firstName = $scope.editableFirstName;
            $scope.camp.applicants.lastName = $scope.editableLastName;
            $scope.camp.applicants.email = $scope.editableEmail;
            $scope.disableEditor();
          };

        // If successful show success message and clear form
           
        }).error(function(response) {
            $scope.error = response.message;

        });

    };


    $scope.listcamps = function() {
        $http.get('/admin/camp').success(function(response) {
          // If successful show success message and clear form
            $scope.camps = response;
            for(var i = 0; i < response.length; i++){
                $scope.camp_options.push(response[i].camp_name);
            }
         
        }).error(function(response) {
            $scope.error = response.message;
            $location.path('/admin/welcome');

        });
    };


    $scope.viewTrainees = function() {
        $http.get('/admin/trainees').success(function(response) {
          // If successful show success message and clear form
            $scope.role = [];
            $scope.success = true;
            $scope.trainees = response;
          
        }).error(function(response) {
            $scope.error = response.message;
        });
    };

    $scope.listApplicants = function() {
        // $scope.statusInit = 'pending';
        $http.get('/admin/applicants').success(function(response) {
          // If successful show success message and clear form
            $scope.success = true;
            $scope.applicants = response;
            console.log('Applicant Init');
            console.log('appt: ' + $scope.applicants);
        
        }).error(function(response) {
            $scope.error = response.message;
        });
    };

    $scope.viewApplicant = function() {
      $http.get('/admin/appt/' + $stateParams.apptId).success(function(response) {
        // If successful show success message and clear form
        $scope.data = {};
        $scope.success = true;
        $scope.appt = response;

        $scope.currPlacementEditorEnabled = false;
        $scope.editableCurrCompany = '';
        $scope.startDateEditorEnabled = false;
        $scope.endDateEditorEnabled = false;
        $scope.editableStartDate = '';
        $scope.editableEndDate = '';
        $scope.editableName = '';
        $scope.email = '';


        $scope.skillNameEditorEnabled = [];
        $scope.skillScoreEditorEnabled = [];
        $scope.editableSkillName = [];
        $scope.editableSkillScore = [];
        $score.editableDetails = [];

        for (var i in $scope.appt.skillSets){
          $scope.skillNameEditorEnabled[i] = false;
          $scope.skillScoreEditorEnabled[i] = false;
          $scope.editableSkillName[i] = '';
          $scope.editableSkillScore[i] = 1;
        }

        $scope.enableNameEditor = function(field) {
          if (field === 'name') {};
        };

        $scope.enableCurrPlacementEditor = function(field) {
          if (field === 'company'){
            $scope.currPlacementEditorEnabled = true; 
            $scope.editableCurrCompany = $scope.appt.currPlacement.status; 
          }
          if (field === 'startDate'){
            $scope.startDateEditorEnabled = true; 
            $scope.editableStartDate = ''; 
          }
          if (field === 'endDate'){
            $scope.endDateEditorEnabled = true; 
            $scope.editableEndDate = ''; 
          }
        };

        $scope.enableskillEditor = function(field, index) {
          if (field === 'skillName'){
            $scope.skillNameEditorEnabled[index] = true; 
            $scope.editableSkillName[index] = $scope.appt.skillSets[index].skill; 
          }
          if (field === 'skillScore'){
            $scope.skillScoreEditorEnabled[index] = true; 
            $scope.editableSkillScore[index] = $scope.appt.skillSets[index].rating; 
          }
        };

        $scope.disableskillEditor = function(field, index) {
          if (field === 'skillName'){
            $scope.skillNameEditorEnabled[index] = false;
          }
          if (field === 'skillScore'){
            $scope.skillScoreEditorEnabled[index] = false;
          }
        };

        $scope.disableCurrPlacementEditor = function(field, index) {
          if (field === 'company'){
            $scope.currPlacementEditorEnabled = false;
          }
          if (field === 'startDate'){
            $scope.startDateEditorEnabled = false;
          }
          if (field === 'endDate'){
            $scope.endDateEditorEnabled = false;
          }
        };


        $scope.saveskill = function(field, index) {
          if (field === 'skillName'){
            $scope.appt.skillSets[index].skill = $scope.editableSkillName[index];
            $scope.updateSkill($scope.appt, index);
          }
          if (field === 'skillScore'){
            $scope.appt.skillSets[index].rating = $scope.editableSkillScore[index];
            $scope.updateSkill($scope.appt, index);
          }
          $scope.disableskillEditor(field, index);
        };

        $scope.saveCurrPlacement = function(field, index) {
          if (field === 'company'){
            $scope.appt.currPlacement.status = $scope.editableCurrCompany;
            $scope.updatePlacement($scope.appt);
            $scope.disableCurrPlacementEditor('company');
          }
          if (field === 'startDate'){
            $scope.appt.currPlacement.startDate = $scope.editableStartDate;
            $scope.updatePlacement($scope.appt);
            $scope.disableCurrPlacementEditor('startDate');
          }
          if (field === 'endDate'){
            $scope.appt.currPlacement.endDate = $scope.editableEndDate;
            $scope.updatePlacement($scope.appt);
            $scope.disableCurrPlacementEditor('endDate');
          }
          
        };
        
        console.log('Success - Done', response);
        
      }).error(function(response) {
        $scope.error = response.message;
        console.log('Error - can not');
      });
    };

    // $scope.updateApplicantDetails = function(apptId) {
    //   $http.put('/admin/appt/' + apptId).success(function(response) {
    //     console.log('Success - Done', response);
    //   }).error(function(response) {
    //     $scope.error = response.message;
    //     console.log($scope.error);
    //   });
    // };


    $scope.updateSkill = function(appt, index) {
      $http.put('/admin/trainee/' + appt._id + '/rate/' + appt.skillSets[index]._id, appt.skillSets[index]).success(function(response) {
        console.log('Success - Done', response);
      }).error(function(response) {
        $scope.error = response.message;
        console.log($scope.error);
      });
    };

    $scope.updatePlacement = function(appt) {
      $http.put('/admin/fellow/' + appt._id + '/placement', appt.currPlacement).success(function(response) {
        console.log('Success - Done', response);
      }).error(function(response) {
        $scope.error = response.message;
        console.log($scope.error);
      });
    };


    $scope.deleteUser = function(userId, index) {
      $scope.camp.applicants.splice(index, 1);

      $http.put('/admin/camp/' + $scope.camp._id, $scope.camp).success(function(response) {
        // If successful show success message and clear form
        $scope.success = true;

        // $scope.appt = response;
        console.log('Edit bootcamp done', response);
        
      }).error(function(response) {
        $scope.error = response.message;
        console.log($scope.error);
        // console.log('Error - can not');
      });
    
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

    $scope.deleteAdmin = function(userId, index) {
      $scope.admins.splice(index, 1);
    
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

    $scope.deleteInstr = function(userId, index) {
      $scope.instructors.splice(index, 1);
    
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

    $scope.deleteTest = function(testId, index) {
      $scope.tests.splice(index, 1);
    
      $http.delete('/admin/test/' + testId).success(function(response) {
        // If successful show success message and clear form
        $scope.success = true;

        // $scope.appt = response;
        console.log('Success - Done', response);
        
      }).error(function(response) {
        $scope.error = response.message;
        console.log($scope.error);
      });
    };

    $scope.deleteQuestion = function(testId, questionId, index) {
      $scope.test.questions.splice(index, 1);
      $http.delete('/admin/test/' + testId + '/' + questionId).success(function(response) {
        // If successful show success message and clear form
        $scope.success = true;

        // $scope.appt = response;
        console.log('Success - Done', response);
        
      }).error(function(response) {
        $scope.error = response.message;
        console.log($scope.error);
      });
    };

    $scope.deleteOption = function(testId, questionId, optionId, queIndex, index) {
      $scope.test.questions[queIndex].questOptions.splice(index, 1);
      $http.delete('/admin/test/' + testId + '/' + questionId + '/' + optionId).success(function(response) {
        // If successful show success message and clear form
        $scope.success = true;

        // $scope.appt = response;
        console.log('Success - Done', response);
        
      }).error(function(response) {
        $scope.error = response.message;
        console.log($scope.error);
      });
    };

    $scope.deleteCamp = function(campId, index) {
      $scope.camps.splice(index, 1);
      $http.delete('/admin/camp/' + campId).success(function(response) {
        // If successful show success message and clear form
        $scope.success = true;

        // $scope.appt = response;
        console.log('Success - Done', response);
        
      }).error(function(response) {
        $scope.error = response.message;
        console.log($scope.error);
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
        console.log('Fellows');
        console.log($scope.fellows);
        $scope.success = true;
        console.log('Success - Done', response);
        
      }).error(function(response) {
        $scope.error = response.message;
        console.log('Error - can not');
      });
    };

    $scope.IsFellowUnavailable = function(fellow) {
      var weeks = parseInt($scope.weeks);
      var date = moment().add('weeks', weeks);
      if(fellow.placements.length === 0 || weeks === 0){
        return true;
      }
      else if(moment(fellow.placements[0].end_date) > date){
        return false;
      }
      else{
        return true;
      }
    };

    $scope.get_availability_date = function(fellow){
      if(fellow.placements.length === 0){
        return "Now";
      }
      else{
        if(moment(fellow.placements[0].end_date) > moment()){
          return moment(fellow.placements[0].end_date).format("LL");
        }
        else{
          return "Now";
        }
      }
    };

    $scope.get_fellow_work_days = function(fellow) {
      var oneday = 24*3600*1000;
      var curr_placement_date = fellow.placements;
      if (curr_placement_date[0] !== undefined) {
        var curr_date = new Date();
        var fellowavailabilityweeks = Math.ceil(new Date(curr_placement_date[0].end_date).getTime() - curr_date.getTime())/(oneday *7);
        console.log(Math.ceil(fellowavailabilityweeks));
        if (fellowavailabilityweeks <= 0) {
          return 0;
        } else {
          return Math.ceil(fellowavailabilityweeks);
        }
      }
      else{
        return 0;
      }
    }
     $scope.check_placement = function(placement, index){
        if ($scope.get_fellow_work_days(placement) <= 0) {
          $scope.fellows[index].available = 'Needs Work';
          $scope.fellows[index].week = $scope.get_fellow_work_days(placement) ;
          console.log( $scope.fellows[index].week);
        }
        else{
        $scope.fellows[index].available = 'Currently Placed';
        console.log(' placed');
        $scope.fellows[index].week = $scope.get_fellow_work_days(placement);
       }

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
        $scope.admins = response;
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
        $scope.instructors = response;
        $scope.success = true;
        console.log('Success - Done', response);
        
      }).error(function(response) {
        $scope.error = response.message;
        console.log('Error - can not');
      });
    };

    $scope.changeStatus = function() {
      console.log('Data Init');
      console.log($scope.data);
      $http.put('/admin/appt/' + $stateParams.apptId, $scope.data).success(function(response) {
        // If successful show success message and clear form
        $scope.success = true;
        console.log('response: ' + response.status.name);
        // $location.path('admin/appt/' + response._id);
        console.log('Success - Done', response);
        $location.path('/admin/camps/' + $stateParams.bootcampId);

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


    $scope.rateFellow = function(traineeId, skillId, newRating) {
      var url = '/admin/trainee/' + traineeId + '/skills/' + skillId;
      $http.put(url, {rating: newRating}).success(function(response) {
        $scope.success = true;
        $scope.appt = response;
        console.log('Success - Done', response);
        
      }).error(function(response) {
        $scope.error = response.message;
        console.log('Error - can not');
      });
    };

    $scope.addPlacement = function() {
      console.log($stateParams.apptId);
      $http.post('/admin/fellow/' + $stateParams.apptId + '/placements', $scope.data).success(function(response) {
        
        // If successful show success message and clear form
        $scope.data.company = '';
        $scope.data.jobDescription ='' ;
        $scope.data.start_date = '';
        $scope.data.end_date = '';

        $scope.appt = response;
        console.log('Success - Done', response);
      }).error(function(response) {
        $scope.error = response.message;
        if ($scope.error.type === 'date'){
          $scope.error = "Please follow the date pattern specified M/D/YY e.g (use 2/5/2014 for 5th Feb 2014)"
        }
        console.log('Error - can not');
      });
    };

    $scope.createTest = function() {
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

    $scope.createQuestion = function() {
      $http.post('/admin/test/' + $stateParams.testId, {question: $scope.question, option: $scope.optionOne, 
                                  answer: $scope.test.answerOne}).success(function(response) {
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

    /*SKILLS*/
    $scope.listSkills = function() {
      $http.get('/admin/skills').success(function(response) {
        $scope.skills = response;

      }).error(function(response) {
         $scope.error = response.message;
         $location.path('/admin/welcome');

      });
    };

    $scope.openSkillModal = function (size) {

        var modalInstance = $modal.open({
            templateUrl: '/modules/admin/views/admin.skills_modal.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                categories: function () {
                    return $scope.skillCategories;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.getSkillCategories = function(){
        $http.get('/admin/skillCategories').success(function(response) {
            $scope.skillCategories = response;

        }).error(function(response) {
            $scope.error = response.message;
            $location.path('/admin/welcome');

        });
    };

  }

]);
