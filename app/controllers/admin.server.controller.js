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
    Options = mongoose.model('Options'),
    Bootcamp = mongoose.model('Bootcamp'),
    _ = require('lodash');
var users = require('../../app/controllers/users');


/**
 * Admin authorization middleware
 */
exports.checkPermission = function(req, res, next) {
    if (req.user._type === "Instructor" && req.user.role === "admin") {
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

   instructor.save(function(err) {
      // Remove sensitive data before login
      instructor.password = undefined;
      instructor.salt = undefined;
      if (err) {
         return res.send(400, {
            message: err
         });
      } else {
        res.jsonp(instructor);
      }
   });
};

/**
* Change applicant's status
*/
exports.changeStatus = function(req, res) {
        var applicant = req.applicant; 
      
      if (req.body.status === "rejected" && req.body.reason.length === 0) {
          return res.send(400, {
              message: "Please give reason why applicant was rejected"
          });
      } else {
          if (req.body.status === "selected for bootcamp") {
          	  applicant.role = "trainee";
          }

          applicant = _.extend(applicant, req.body);

          applicant.save(function(err) {
    	        if (err) {
    	            return res.send(400, {
    	                message: "could not change applicant status"
    	            });
    	        } else {
    	            res.jsonp(applicant);
    	        }
          }); 
      }
};

/**
* Change applicant's role
*/
exports.changeRole = function(req, res) {
      var applicant = req.applicant;
      applicant = _.extend(applicant, req.body);
      var role = req.body.role;
      
      if(role === "applicant") {
        applicant.status = "selectedInterview";
      }

      applicant.save(function(err) {
          if (err) {
              return res.send(400, {
                  message: "could not change applicant role"
              });
          } else {
              res.jsonp(applicant);
          }
     });
};

/**
* Change instructor and admin's role
*/
exports.changeInstrRole = function(req, res) {
      var instructor = req.instructor;
      instructor = _.extend(instructor, req.body);

      instructor.save(function(err) {
          if (err) {
              return res.send(400, {
                  message: "could not change instructor role"
              });
          } else {
              res.jsonp(instructor);
          }
      });
};

/**
* Delete User
*/
exports.deleteUser = function(req, res) {
    var person = req.profile;
    
    if (person._type === "instructor") {
       Instructor.findById(person._id).exec(function(err, user) {
            if (user.role === "admin") {
                return res.send(400, {
                  message: "You cannot delete another admin"
                });
            }
       });
    }
    person.remove(function(err) {
        if (err) {
            return res.send(400, {
                message: "could not delete user"
            });
        } else {
            res.jsonp(person);
        }
    });
};

/**
* Assign applicant to bootcamp
*/
exports.assignBootCamp = function(req, res) {
      var applicant = req.applicant;
      //applicant.campId = req.params.campId;
      var camp = req.camp;

      
      if (applicant.campId !== req.params.campId){
         Bootcamp.findById(req.params.campId).exec(function(err, boot) {

              boot.applicants.push(applicant);
              boot.save(function(err) {
                  if (err) {
                     return res.send(400, {
                        message: "error occurred"
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
                      message: "could not assign boot camp"
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
                message: "Couldn't find bootcamps"
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

    camp.save(function(err) {
        if (err) {
            return res.send(400, {
                message: "Couldn't edit camp"
            });
        } else {
            res.jsonp(camp);
        }
    });
};

/**
* Delete bootcamp
*/
exports.deleteCamp = function(req, res) {
    var camp = req.camp;

    camp.remove(function(err) {
        if (err) {
            return res.send(400, {
                message: "Couldn't delete camp"
            });
        } else {
            res.jsonp(camp);
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
  if(schema === "Applicant") {
     Applicant.find().where({role: whichRole}).populate('campId','camp_name').exec(function (err, users) {
         if (err) {
            return res.send(400, {
                message: "No " + whichRole + " found"
            });
         } else {
            res.jsonp(users);
         }
     });
  } else {
      Instructor.find().where({role: whichRole}).exec(function (err, users) {
         if (err) {
            return res.send(400, {
               message: "No " + whichRole + " found"
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
   doListing(req, res, "Applicant", "applicant");
};

/**
 * List fellows
 */
exports.listFellows = function(req, res) {
   doListing(req, res, "Applicant", "fellow");
};

/**
 * List Trainees
 */
exports.listTrainees = function(req, res) {
   doListing(req, res, "Applicant", "trainee");
};


/**
 * Create tests
 */
exports.createTests = function(req, res) {
    var quest = req.body.questions;
    var questions = [];

    console.log(quest.length);
     for (var i=0; i<quest.length; i++) {
          
          if (i === 0) {
              var options = req.body.optionOne;
          } else if(i === 1) {
              var options = req.body.optionTwo;
          } else {
              var options = req.body.optionThree;
          }

          console.log("before: " + options);
          console.log("options length: " + options.length);
          var optionArr = [];
          for (var j=0; j<options.length; j++) {
               var eachOpt = new Options({option: options[j]});
               console.log(eachOpt);
               optionArr.push(eachOpt);
          }

          var each = new Question({question: quest[i], questOptions: optionArr});
          console.log(each);
          questions.push(each); 
     }
     var test = new Test({testName: req.body.testName, questions: questions});
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
 * Update tests
 */
exports.updateTest = function(req, res) {
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
                message: "Error: couldn't update question"
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
     var quest = req.body.questions;
     var test = req.test;
     var options = req.body.option;
     var question = [];

     for (var i=0; i<quest.length; i++) {
          var optionArr = [];

          for (var j=0; j<options.length; j++) {
               var eachOpt = new Options({option: options[j]});
               console.log(eachOpt);
               optionArr.push(eachOpt);
          }

          var each = new Question({question: quest[i], questOptions: optionArr});
          console.log(each);
          //question.push(each);
          test.questions.push(each); 
     }
     
     console.log(test);
     test.save(function(err, test) {
          if (err) {
              return res.send(400, {
                  message: "Error: couldn't add question"
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

        question.questOptions.push({option: option});
        test.save(function(err, test) {
          if (err) {
              return res.send(400, {
                  message: err
              });
          } else {
              res.jsonp(test);
          }
        });
}

/**
 * Update Question's choices
 */
exports.updateChoices = function(req, res) {
    var test = req.test;
    var options = test.questions.id(req.params.questId);
    var bodyVals = req.body.choices;
    console.log(bodyVals);
    console.log("test: " + test);
    // test.questions.id(req.params.questId).questOptions.remove();
    //     console.log(options);
    //     test.questions.id(req.params.questId).questOptions.push(bodyVals);
    //     console.log(test);
    for (var i=0; i<options.questOptions.length; i++) {
         // for(var j=i; j<=i; j++) {
             options.questOptions[i].option = bodyVals[i];
         //     options.questOptions.push({option: bodyVals[i]});
             
         // }
         console.log(options);
    }
 
    // for (var i=0; i<bodyVals.length; i++) {
    //     options.questOptions.push({option: bodyVals[i]});
    // }

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
 * Delete tests
 */
exports.deleteTest = function(req, res) {
    var test = req.test;

    test.remove(function(err) {
        if (err) {
            return res.send(400, {
                message: "Couldn't delete test"
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
                message: "Couldn't delete question"
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

    question.questOptions.id(id).remove();
    test.save(function(err) {
        if (err) {
            return res.send(400, {
                message: "Couldn't delete option"
            });
        } else {
            res.jsonp(test);
        }
    });
};

/**
 * List of Tests
 */
exports.listTests = function(req, res) {
    Test.find().sort('-created').exec(function(err, tests) {
        if (err) {
            return res.send(400, {
                message: "could not list test"
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
 * List Instructors
 */
exports.listInstructors = function(req, res) {
   doListing(req, res, "Instructor", "instructor");
};

/**
 * List Admins
 */
exports.listAdmins = function(req, res) {
   doListing(req, res, "Instructor", "admin");
};

/**
 * Applicant middleware
 */
exports.apptByID = function(req, res, next, id)  {
    Applicant.findById(id).populate('campId').exec(function(err, user) {
        if (err) return next(err);
        if (!user) return next(new Error('Failed to load Applicant ' + id));
        req.applicant = user;
        next();
    });
};

/**
 * Instructor middleware
 */
exports.instrByID = function(req, res, next, id)  {
     Instructor.findById(id).exec(function(err, user) {
         if (err) return next(err);
         if (!user) return next(new Error('Failed to load user ' + id));
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
 * Question middleware
 */
exports.questByID = function(req, res, next, id) {
    req.question = req.test.questions.id(id);
    next();
};