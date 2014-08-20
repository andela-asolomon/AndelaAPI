'use strict';
/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Instructor = mongoose.model('Instructor'),
    Applicant = mongoose.model('Applicant'),
    User = mongoose.model('User'),
    Bootcamp = mongoose.model('Bootcamp'),
    _ = require('lodash');
var users = require('../../app/controllers/users');

/**
Input assessment score for trainee
*/
exports.createAssmt = function(req, res){
	//var camp = req.camp;
	req.body.instructorId = req.user;
	//var assessment = new Assessment(req.body);
    var trainee = req.trainee;

	// camp.assessments.push(assessment);
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
	//var camp = req.camp;
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


/**
* Particular trainee middleware
*/
exports.traineeByID = function(req, res, next, id){   
    Applicant.findById(id).where({role: "trainee"}).populate('campId','camp_name').exec(function(err, trainee) {
		if (err) return next(err);
		if (!trainee) return next(new Error('Failed to load trainee ' + id));
		req.trainee = trainee;
		next();
	});
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
 * Admin authorization middleware
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
