'use strict';
/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Instructor = mongoose.model('Instructor'),
    Applicant = mongoose.model('Applicant'),
    User = mongoose.model('User'),
    Bootcamp = mongoose.model('Bootcamp'),
    Skillset = mongoose.model('Skillset'),
    _ = require('lodash');
var users = require('../../app/controllers/users');

/**
Input assessment score for trainee
*/
exports.createAssmt = function(req, res){
	req.body.instructorId = req.user;
    var trainee = req.trainee;
	trainee.assessments.push(req.body);
	
	trainee.save(function(err) {
		if (err) {
		    return res.send(400, {
		       message: "Error: Couldn't create assessment"
		    });
		} else {
		    res.jsonp(trainee);
		}
	});
};

/*
*Update assessment
*/
exports.updateAssmt = function(req, res){
	// var bootcamp = req.bootcamp;
	var assessment = req.assessment,
	    trainee = req.trainee;

	assessment = _.extend(assessment , req.body);
	trainee.save(function(err) {
		if (err) {
			return res.send(400, {
			   message: "Error: update failed"
		    });
		} else {
		    res.jsonp(trainee);
		}
	});
};

/*
*delete an assessment
*/
exports.deleteAssmt = function(req, res){
	var assessment = req.assessment,
	    trainee = req.trainee;

	assessment.remove();
	trainee.save(function(err) {
		if (err) {
			return res.send(400, {
				message: err
			});
		} else {
			res.jsonp(trainee);
		}
	});
};

/*
*Select a fellow
*/
exports.selectFellow = function(req, res){
	var trainee = req.trainee,
	    role = req.body.role;
      trainee = _.extend(trainee, req.body);

      if (role === "applicant" || role === "admin" || role === "instructor") {
         return res.send(400, {
              message: "Error: action couldn't be carried out"
         });
      } else {
           trainee.save(function(err) {
	          if (err) {
	              return res.send(400, {
	                  message: "could not change applicant role"
	              });
	          } else {
	              res.jsonp(trainee);
	          }
	      });
     }
};

/*
*Rate a fellow
*/
exports.rateFellow = function(req, res){
	var skillset = req.body,
        fellow = req.trainee;

	if (req.body.rating < 1 || req.body.rating > 10) {
		return res.send(400, {
			   message: "Error: rating is a 10 point system"
	    });
	} else {
		fellow.skillSets.push(skillset);
		fellow.save(function(err) {
			if (err) {
			    return res.send(400, {
			       message: "Error: Couldn't create assessment"
			    });
			} else {
			    res.jsonp(fellow);
			}
		});
	}
};

/*
*Edit a rating
*/
exports.editRating = function(req, res){
	var skillset = req.skill,
        fellow = req.trainee;

    skillset = _.extend(skillset, req.body);
    fellow.save(function(err) {
      if (err) {
          return res.send(400, {
              message: "could not edit rating"
          });
      } else {
          res.jsonp(fellow);
      }
    });
};

/*
*Delete a rating
*/
exports.deleteRating = function(req, res){
	var skillset = req.skill,
        fellow = req.trainee;

    skillset.remove();
    fellow.save(function(err) {
      if (err) {
          return res.send(400, {
              message: "could not delete rating"
          });
      } else {
          res.jsonp(fellow);
      }
    });
};


/**
 * Show the current trainee/fellow
 */
exports.readTrainee = function(req, res) {
    res.jsonp(req.trainee);
};


/**
* Particular trainee middleware
*/
exports.traineeByID = function(req, res, next, id){   
    Applicant.findById(id).populate('campId','camp_name').exec(function(err, trainee) {
		if (err) return next(err);
		if (!trainee) return next(new Error('Failed to load trainee ' + id));
		req.trainee = trainee;
		next();
	});
};

/**
* Particular skillset middleware
*/
exports.skillByID = function(req, res, next, id){   
    req.skill = req.trainee.skillSets.id(id);
    next();
};


/**
* Particular assessment middleware
*/
exports.assessmentByID = function(req, res, next, id){   
    req.assessment = req.trainee.assessments.id(id);
    next();
};

/**
* Check if he is the creator of the assessment middleware
*/
exports.isCreator = function(req, res, next){
	if (req.assessment.instructorId.toString() !== req.user.id) {
	   return res.send(403, 'User is not authorized');
	}
	next();
};

/**
 * Instructor authorization middleware
 */
exports.checkRights = function(req, res, next) {
    if (req.user._type === "Instructor" && req.user.role === "instructor") {
        next();
    } else {
        return res.send(403, {
              message: 'User is not authorized'
        });
    }
};
