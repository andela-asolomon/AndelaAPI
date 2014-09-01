'use strict';
/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Instructor = mongoose.model('Instructor'),
    Applicant = mongoose.model('Applicant'),
    User = mongoose.model('User'),
    Test = mongoose.model('Test'),
    Question = mongoose.model('Question'),
    Bootcamp = mongoose.model('Bootcamp'),
    WorkHistory = mongoose.model('WorkHistory'),
    path = require('path'),
    _ = require('lodash');


/**
 * Admin authorization middleware
 */
exports.checkPermission = function(req, res, next) {
    if (req.user._type === 'Instructor' && req.user.role === 'admin') {
        next();
    } else { 
        return res.send(403, {
              message: 'User is not authorized'
        });
    }
};

/**
* Create users
*/
exports.createUsers = function(req, res, next) {
   var instructor = new Instructor(req.body);
   instructor.provider ='local';
   
   if (req.body.role !== 'instructor' && req.body.role !== 'admin') {
       return res.send(400, {
            message: 'Error: Only admin or instructors can be created'
       });
   } else {
        instructor.save(function(err) {
           // Remove sensitive data before login
           instructor.password = undefined;
           instructor.salt = undefined;
           if (err) {
               return res.send(400, { message: err });
           } else {
               res.jsonp(instructor);
           }
       });
   }
};

/**
* Change applicant's status
*/
exports.changeStatus = function(req, res) {
      var applicant = req.applicant; 
      
      if (req.body.status === 'rejected') { 
        if (!req.body.reason || req.body.reason.length === 0) {
           return res.send(400, {
              message: 'Please give reason why applicant was rejected'
           });
        }
      } 

      if (req.body.status === 'selected for bootcamp') {
          applicant.role = 'trainee';
      }

      if (applicant.role === 'trainee' && req.body.status !== 'selected for bootcamp' ) {
          applicant.role = 'applicant';
      }

      if (req.body.reason) { 
          applicant.status.reason = req.body.reason;
      } else {
          applicant.status.reason = '';
      }

      applicant.status.name = req.body.status; 

      applicant.save(function(err, appt) {
          if (err) {
              return res.send(400, {
                  message: err
              });
          } else {
              res.jsonp(appt);
          }
      });   
};

/**
* Change applicant's role
*/
exports.changeRole = function(req, res) {
      var applicant = req.applicant;
      var role = req.body.role;
      console.log(applicant);

      if (role === 'instructor' || role === 'admin') {
          return res.send(400, {
               message: 'you cannot change user to an admin or instructor'
          });
      } else {
          applicant = _.extend(applicant, req.body);
          if (role === 'applicant') {
             applicant.status.name = 'selected for interview';
             applicant.status.reason = '';
          }

          if (role === 'trainee' || role === 'fellow') {
             applicant.status.name = 'selected for bootcamp';
             applicant.status.reason = '';
          }

          applicant.save(function(err) {
              if (err) {
                  return res.send(400, {
                      message: 'could not change applicant role'
                  });
              } else {
                  res.jsonp(applicant);
              }
         });
      }
};

/**
* Change instructor and admin's role
*/
exports.changeInstrRole = function(req, res) {
      var instructor = req.instructor;
      
      if (req.body.role !== 'instructor' && req.body.role !== 'admin'){
          return res.send(400, {
                message: 'user\'s role can only be changed to admin or instructor'
          });
      } else {
          instructor = _.extend(instructor, req.body);

          instructor.save(function(err) {
              if (err) {
                  return res.send(400, {
                      message: 'could not change instructor role'
                  });
              } else {
                  res.jsonp(instructor);
              }
          });
      }
};

/**
* Delete User
*/
exports.deleteUser = function(req, res) {
    var person = req.profile;
    
    if (person._type === 'Instructor' && person.role === 'admin') {
        return res.send(400, {
            message: 'You cannot delete another admin'
        });
    } else {
        person.remove(function(err, user) {
            if (err) {
                return res.send(400, {
                    message: 'could not delete user'
                });
            } else {
                res.jsonp(user);
            }
        });
    }
};

/**
* Assign applicant to bootcamp
*/
exports.assignBootCamp = function(req, res) {
      var applicant = req.applicant;
      var camp = req.camp;

      if (applicant.campId !== req.params.campId){
         Bootcamp.findById(req.params.campId).exec(function(err, boot) {

              boot.applicants.push(applicant);
              boot.save(function(err) {
                  if (err) {
                     return res.send(400, {
                        message: 'error occurred'
                      });
                  } else {
                      camp.applicants(applicant).remove(function(err) {
                          res.jsonp(applicant);
                      });
                  }
              });
         });
      } else {
          applicant.save(function(err) {
              if (err) {
                  return res.send(400, {
                      message: 'could not assign boot camp'
                  });
              } else {
                  res.jsonp(applicant);
              }
          });
      }
};

/**
* Create bootcamp
*/
exports.createBootCamp = function(req, res) {
    var camp = new Bootcamp(req.body);
    
    camp.save(function(err) {
        if (err) {
            return res.send(400, {
                message: err
            });
        } else {
            res.jsonp(camp);
        }
    });
};

/**
* List all Bootcamps
*/
exports.bootCamps = function(req, res) {
     Bootcamp.find().exec(function(err, camps){
         if (err) {
            return res.send(400, {
                message: 'Could not find bootcamps'
            });
         } else {
            res.jsonp(camps);
         }
     });  
};

/**
* Edit bootcamp details
*/
exports.editCamp = function(req, res) {
    var camp = req.camp;

    camp = _.extend(camp, req.body);
    camp.save(function(err, boot) {
        if (err) {
            return res.send(400, {
                message: 'Couldn\'t edit bootcamp'
            });
        } else {
            res.jsonp(boot);
        }
    });
};

/**
* Delete bootcamp
*/
exports.deleteCamp = function(req, res) {
    var camp = req.camp;

    camp.remove(function(err, boot) {
        if (err) {
            return res.send(400, {
                message: 'Couldn\'t delete camp'
            });
        } else {
            res.jsonp(boot);
        }
    });
};

/**
 * Show the current bootcamp
 */
exports.read = function(req, res) {
    res.jsonp(req.camp);
};

/**
 * Show the current applicant/trainee/fellow
 */
exports.apptRead = function(req, res) {
    res.jsonp(req.applicant);
};

/**
 * Show the current instructor/admin
 */
exports.instrRead = function(req, res) {
    res.jsonp(req.instructor);
};

var doListing = function(req, res, schema, whichRole) {
  if(schema === 'Applicant') {
     Applicant.find().where({role: whichRole}).populate('campId','camp_name').exec(function (err, users) {
         if (err) {
            return res.send(400, {
                message: 'No ' + whichRole + ' found'
            });
         } else {
            res.jsonp(users);
         }
     });
  } else {
      Instructor.find().where({role: whichRole}).exec(function (err, users) {
         if (err) {
            return res.send(400, {
               message: 'No ' + whichRole + ' found'
            });
          } else {
            res.jsonp(users);
          }
     });
  }
};

/**
 * List applicants
 */
exports.listApplicants = function(req, res) {
   doListing(req, res, 'Applicant', 'applicant');
};

/**
 * List fellows
 */
exports.listFellows = function(req, res) {
   doListing(req, res, 'Applicant', 'fellow');
};

/**
 * List Trainees
 */
exports.listTrainees = function(req, res) {
   doListing(req, res, 'Applicant', 'trainee');
};

/**
 * List Instructors
 */
exports.listInstructors = function(req, res) {
   doListing(req, res, 'Instructor', 'instructor');
};

/**
 * List Admins
 */
exports.listAdmins = function(req, res) {
   doListing(req, res, 'Instructor', 'admin');
};

/**
 * Create tests
 */
exports.createTests = function(req, res) {
    var quest = req.body.questions;
    var questions = [];

    for (var i=0; i<quest.length; i++) {
          var optionArr = [];
          var answerArr = [];
          if (i === 0) {
              var options = req.body.optionOne;
              var chosenAnswer = req.body.answerOne;
          } else {
              var options = req.body.optionTwo;
              var chosenAnswer = req.body.answerTwo;
          } 

          for (var j=0; j<options.length; j++) { 
             // if (!options[j].answer) {
             //    options[j].answer = false;
             // }
              if (j === parseInt(chosenAnswer, 10)) {
                  answerArr[j] = true;
              } else {
                  answerArr[j] = false;
              }
             var eachOpt = new Options({option: options[j], answer: answerArr[j]});
             optionArr.push(eachOpt);
          }

          var each = new Question({question: quest[i], questOptions: optionArr});
          questions.push(each); 
    }
    var test = new Test({testName: req.body.testName, questions: questions});
    test.save(function(err) {
      if (err) {
          return res.send(400, { message: err });
      } else {
          res.jsonp(test);
      }
    });
};

/**
 * Update a particular test's name
 */
exports.updateTestName = function(req, res) {
    var test = req.test;
    test = _.extend(test, req.body);

    test.save(function(err) {
        if (err) {
            return res.send(400, {
                message: err
            });
        } else {
            res.jsonp(test);
        }
    });
};

/**
 * Update Question
 */
exports.updateQuestion = function(req, res) {
    var question = req.question;
    question = _.extend(question, req.body);

    req.test.save(function(err, test) {
        if (err) {
            return res.send(400, {
                message: 'Error: couldn\'t update question'
            });
        } else {
            res.jsonp(test);
        }
    });
};

/**
 * Add question to already existing test
 */
exports.addQuestion = function(req, res) {
     var quest = req.body.question;
     var test = req.test;
     var options = req.body.option;
     
     var optionArr = [], answerArr = [];
     for (var j = 0; j < options.length; j++) {
           if (j === parseInt(req.body.answer, 10)) {
                answerArr[j] = true;
           } else {
                answerArr[j] = false;
           }

           var eachOpt = new Options({option: options[j], answer: answerArr[j]});
           optionArr.push(eachOpt);
     }

     var each = new Question({question: quest, questOptions: optionArr});
     test.questions.push(each); 
     
     test.save(function(err, test) {
          if (err) {
              return res.send(400, {
                  message: err
              });
          } else {
              res.jsonp(test);
          }
     });
};

/**
 * Add new option to a question
 */
exports.addOption = function(req, res) {
     var test = req.test,
     question = req.question,
     option = req.body.option;

     question.questOptions.push(new Options({option: option, answer: false}));
     test.save(function(err, test) {
        if (err) {
           return res.send(400, { message: err });
        } else {
            res.jsonp(test);
        }
     });
};

/**
 * Update choices
 */
// exports.updateChoices = function(req, res) {
//     var test = req.test,
//         quest = req.question,
//         choices = req.body.choices;
    
//     //quest.question = req.body.question;
//     for (var i = 0; i < quest.questOptions.length; i++) {
//         quest.questOptions[i].option = choices[i].option;
//         quest.questOptions[i].answer = choices[i].answer;
//         // if (i === parseInt(req.body.answer, 10)) {
//         //    quest.questOptions[i].answer = true;
//         // } else {
//         //    quest.questOptions[i].answer = false;
//         // }
//     }

//     test.save(function(err) {
//         if (err) {
//             return res.send(400, {
//                 message: err
//             });
//         } else {
//             res.jsonp(test);
//         }
//     });
// };

/**
 * Delete tests
 */
exports.deleteTest = function(req, res) {
    var test = req.test;

    test.remove(function(err) {
        if (err) {
            return res.send(400, {
                message: 'Couldn\'t delete test'
            });
        } else {
            res.jsonp(test);
        }
    });
};

/**
 * Delete a question
 */
exports.deleteQuestion = function(req, res, next) {
    var test = req.test,
        question = req.question;

    question.remove();
    test.save(function(err) {
        if (err) {
            return res.send(400, {
                message: 'Couldn\'t delete question'
            });
        } else {
            res.jsonp(test);
        }
    });
};

/**
 * Delete an option
 */
exports.deleteOption = function(req, res) {
    var test = req.test,
        question = req.question,
        id = req.params.optionId; 

    var option = question.questOptions.id(id);
    if (question.questOptions.length === 2) {
        return res.send(400, { 
          message: 'A question can only have a minimum of two options'
        });
    } else {
        if (option.answer === true) {
            return res.send(400, { 
                message: 'This option is the answer to the question. Change the answer before deleting it'
            });
        } else {
             option.remove();
             test.save(function(err, test) {
               if (err) {
                    return res.send(400, {
                        message: 'Couldn\'t delete option'
                    });
               } else {
                    res.jsonp(test);
               }
             });
        }
    }
};

/**
 * Update placement status
 */
exports.placementStatus = function(req, res) {
    var profile = req.profile;
    
    if (profile.role === 'fellow') {
       profile.currPlacement.status = req.body.status;
       profile.currPlacement.startDate = req.body.startDate;
       profile.currPlacement.endDate = req.body.endDate;

       profile.save(function(err, user) {
         if (err) {
            return res.send(400, { message: 'Couldn\'t save placement status' });
         } else {
            res.jsonp(user);
         }
       });
    } else {
        return res.send(400, { message: 'Only a fellow\'s placement status can be updated' });
    }
};

/**
 * Admin adds fellow's work history
 */
exports.addWorkHistory = function(req, res) {
    var profile = req.profile;
    console.log(profile);
    
    if (profile.role === 'fellow') {
       var history = new WorkHistory(req.body);

       profile.workHistory.push(history);
       profile.save(function(err, user) {
         if (err) {
            return res.send(400, { message: 'Couldn\'t save work history' });
         } else {
            res.jsonp(user);
         }
       });
    } else {
        return res.send(400, { message: 'Only a fellow\'s work history can be added' });
    }
};

/**
 * Admin edits fellow's work history
 */
exports.editWorkHistory = function(req, res) {
   var history = req.history,
        profile = req.profile;

    history = _.extend(history, req.body);

    profile.save(function(err, user) {
        if (err) {
            return res.send(400, {
                message: 'Error: could not save work history'
            });
        } else {
            res.jsonp(user);
        }
    });
};

/**
 * A particular work history extracted from the whole set 
 */
exports.oneWorkHistory = function(req, res)  {
   res.jsonp(req.history);
}

/**
 * Admin deletes fellow's work history
 */
exports.deleteWorkHistory = function(req, res) {
   var profile = req.profile,
        history = req.history;

    history.remove();
    profile.save(function(err, user) {
        if (err) {
            return res.send(400, {
                message: 'Couldn\'t delete work history'
            });
        } else {
            res.jsonp(user);
        }
    });
}

/**
 * Download CV
 */
exports.download = function(req, res) {
     var file = req.param('file'),
         fileName = path.basename(file);

     res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
     res.download(file);
};

/**
 * List of Tests
 */
exports.listTests = function(req, res) {
    Test.find().sort('-created').exec(function(err, tests) {
        if (err) {
            return res.send(400, {
                message: 'could not list test'
            });
        } else {
            res.jsonp(tests);
        }
    });
};

/**
 * Show the current test
 */
exports.testRead = function(req, res) {
    res.jsonp(req.test);
};

/**
 * Applicant middleware
 */
exports.apptByID = function(req, res, next, id)  {
    Applicant.findById(id).where({_type: 'Applicant'}).exec(function(err, user) {
        if (err) return next(err);
        if (!user) return next(new Error('User is not an applicant'));
        req.applicant = user;
        next();
    });
};

/**
 * Instructor middleware
 */
exports.instrByID = function(req, res, next, id)  {
     Instructor.findById(id).where({_type: 'Instructor'}).exec(function(err, user) {
         if (err) return next(err);
         if (!user) return next(new Error('User is not an instructor'));
         req.instructor = user;
         next();
     });
};

/**
 * Bootcamp middleware
 */
exports.campByID = function(req, res, next, id) {
    Bootcamp.findById(id).exec(function(err, camp) {
        if (err) return next(err);
        if (!camp) return next(new Error('Failed to load bootcamp ' + id));
        req.camp = camp;
        next();
    });
};

/**
 * Test middleware
 */
exports.testByID = function(req, res, next, id) {
    Test.findById(id).exec(function(err, test) {
        if (err) return next(err);
        if (!test) return next(new Error('Failed to load test ' + id));
        req.test = test;
        next();
    });
};

/**
 * Work History middleware
 */
exports.historyByID = function(req, res, next, id) {
    req.history = req.profile.workHistory.id(id);
    next();
};

/**
 * Question middleware
 */
exports.questByID = function(req, res, next, id) {
    req.question = req.test.questions.id(id);
    next();
};