'use strict';

angular.module('applicant').controller('ApplicantController', ['$scope', '$upload', '$http', '$stateParams', '$location', 'Applicants', 'Users', 'Bootcamps', 
        function($scope, $upload, $http, $stateParams, $location, Applicants, Users, Bootcamps){
            
            $scope.find = function() {
                $scope.applicants = Users.query();
                console.log($scope.applicants);
            };

             $scope.findCamp = function(){
                 $scope.result ;
                  Bootcamps.query().$promise.then(
                    //success
                        function(value) {
                            console.log(value);
                            $scope.camp = value[0]._id;
                             console.log($scope.camp);
                        },
                        //error
                        function(err){
                            return err;
                        }
                    );
                
                console.log($scope.result);

             };

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
                    if (value === 4 ) {
                        math.ceil
                    } 
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
            //  if ($scope.password1 === $scope.cpassword1){
            //      $scope.state = true;
            //  }

            $scope.findOneQuestion = function() {
                var url = '/test/';
                console.log('Getting stateParams');
                console.log($stateParams);
                $http.get(url).success(function(response) {
                        $scope.questions = response[0];
                        console.log('Questions init');
                        console.log($scope.questions);
                    });
               };
          $scope.options= [];
            $scope.assess = function( test, option) {
                    console.log(test , option);
               if ($scope.options.length === 0 ){
                
                 $scope.options.push({question: test, answer: option});
               } 

               else {
                       for ( var i = 0; i < $scope.options.length; i++){
                            if (test === $scope.options[i].question){
                                $scope.options[i].answer = option;
                                console.log($scope.options[i]);
                            }
                            else {
                                   $scope.options.push({question: test, answer: option});
                                    // alert( $scope.options[0].question);
                                    // alert( $scope.options[0].answer);
                            }
                       };
               };          
            };
           
           //cv upload
           $scope.onFileSelect = function($files) {
                $scope.files = $files;
                console.log($scope.files);
                if($scope.files) {
                  if ($scope.files[0].type === 'application/pdf' || $scope.files[0].type === 'application/doc' || $scope.files[0].type === 'application/docx') {
                      $scope.correctFormat = true;
                  } else {
                      $scope.correctFormat = false;
                  }
                }
            };

             $scope.correctAnswers = 0;

            $scope.signup = function() {

                var user = new Users ($scope.user);

                console.log($scope.questions.questions);
                console.log
                for (var i in $scope.questions.questions) {
                    var choices = $scope.questions.questions[i].questOptions;
                    console.log('choices: ' + choices);
                    for (var j in choices) {
                        console.log(typeof choices[j]._id + typeof $scope.options[i].question);
                        console.log(choices[j].answer);
                        console.log($scope.options);
                         if(choices[j]._id === $scope.options[i].answer && choices[j].answer === true ) {
                             $scope.correctAnswers += 1;
                             console.log('correctAnswers: ' + $scope.correctAnswers);
                             break;
                         };
                    };
                }; 

                $scope.testScore = ($scope.correctAnswers /  $scope.questions.questions.length) * 100;   
                console.log($scope.testScore); 

                $scope.user.type = 'applicant';
                $scope.user.testScore = $scope.testScore;
                console.log($scope.camp);

                 $scope.upload = $upload.upload({
                    url: '/auth/'+ $scope.camp+'/signup',
                    method: 'Post',
                    data: $scope.user,
                    file: $scope.files[0]
                })
                .success(function(response) {
                    $location.path(''); 
                })
                .error(function(err) {
                    console.log(err);
                    console.log('Error uploading file: ' + err.message || err);
                });

            };

             $scope.findOne = function() {
                var url = '/users/' + $stateParams.applicantId;
                $http.get(url).success(function(response) {
                        $scope.applicant = response;
                        console.log($scope.applicant);
                }).error(function(response) {
                  $scope.error = response.message;
                   $location.path('/');

              });
            };

            $scope.show_profile = function(){
                 var url = '/users/' + $stateParams.logged_inId;
                 console.log('params: ' + $stateParams.logged_inId);
                 
                $http.get(url).success(function(response) {
                  console.log('response: ' + response);
                    $scope.user_profile = response;
                }).error(function(response) {
                  $scope.error = response.message;
                  $http.get('/auth/signout');
                   $location.path('/errorpage');

              }); 
            };
              
}]);