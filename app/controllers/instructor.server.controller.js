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
var uuid = require('node-uuid'),
    multiparty = require('multiparty');

var path = require('path'),
    fs = require('fs');

exports.returnJson = function(res, id) {
    Applicant.findById(id).where({_type: 'Applicant'}).exec(function(err, user) {
       res.jsonp(user);
    });
};

exports.jsonCamp = function(res, id) {
    Bootcamp.findById(id).exec(function(err, camp) {
       res.jsonp(camp);
    });
};

/**
Input assessment score for trainee
*/
exports.createAssmt = function(req, res){
	req.body.instructorId = req.user.id;
	req.body.applicantId = req.trainee._id;
	
	Applicant.update(
      { 
        _id: req.trainee._id, 
      },
      { $push: { 
        "assessments": req.body }
      },
      function(err) {
      	  if (err) {
             return res.send(400, {message: err });
          } else {
             //res.jsonp(trainee);
             returnJson(res, req.trainee._id);
          }
      }
    );
};

/*
*Update assessment
*/
exports.updateAssmt = function(req, res) {
	var assessment = req.assessment,
	    trainee = req.trainee;

	assessment = _.extend(assessment , req.body);
	Applicant.update({_id: trainee._id, 'assessments._id': assessment._id}, 
	      {$set: 
	      	  {  'assessments.$.assessment_name' : assessment.assessment_name,
	             'assessments.$.assessment_date' : assessment.assessment_date, 
	             'assessments.$.score ': req.body.score
	      	  }

	      }, 
          function(err) {
          	  if (err) {
                 return res.send(400, { message: err });
              } else {
                 //res.jsonp(trainee);
                 returnJson(res, trainee._id);
              }
          }
    );
};

/*
*delete an assessment
*/
exports.deleteAssmt = function(req, res) {
	var assessment = req.assessment,
	    trainee = req.trainee;

    Applicant.update(
	    { '_id': trainee._id }, 
	    { $pull: { 'assessments': { '_id': assessment._id } }  
	    }, function (err) {
	    	if (err) {
				return res.send(400, {
					message: 'error occurred while trying to delete assessment'
				});
			} else {
				//res.jsonp(trainee);
				returnJson(res, trainee._id);
			}
	    }
    );
};

/*
*Select a fellow
*/
exports.selectFellow = function(req, res){
	  var trainee = req.trainee,
	      role = req.body.role;
      trainee = _.extend(trainee, req.body);

      if (role === 'applicant' || role === 'admin' || role === 'instructor') {
         return res.send(400, {
              message: 'Error: action couldn\'t be carried out'
         });
      } else {
            Applicant.update({_id: trainee._id}, 
		      {$set: 
		      	  { 'role' : role }

		      }, 
	          function(err) {
	          	  if (err) {
	                 return res.send(400, {message: 'could not change applicant role' });
	              } else {
	                 //res.jsonp(trainee);
	                 returnJson(res, trainee._id);
	              }
	          }
            ); 
      }
};

/*
*Rate a fellow's skill
*/
exports.rateFellow = function(req, res) {
	var skillset = req.body,
        fellow = req.trainee;

    if (fellow.role !== 'fellow') {
    	return res.send(400, {
			   message: 'Error: You can only rate a fellow\'s skills'
	    });
    } else if (req.body.rating < 1 || req.body.rating > 10) {
		return res.send(400, {
			   message: 'Error: rating is a 10 point system'
	    });
	} else {
		Applicant.update(
		    { _id: fellow._id }, 
		    { $push: { 'skillSets':  skillset }
		    }, 
		    function (err) {
		    	if (err) {
					return res.send(400, {
						message: 'Error: Couldn\'t rate fellow'
					});
				} else {
					//res.jsonp(fellow);
					returnJson(res, fellow._id);
				}
	        }
        );
	}
};

/*
*Instructor adds his own skillset
*/
exports.addSkills = function(req, res) {
	var skill = req.body;
	User.findById(req.user._id).exec(function(err, user) {
        if (user._type === 'Instructor') {
        	 Instructor.update(
			    { _id: user._id }, 
			    { $push: { 'skillSets':  skill }
			    }, 
			    function (err) {
			    	if (err) {
						return res.send(400, {
							message: 'Error: Couldn\'t add skill'
						});
					} else {
						//res.jsonp(user);
						returnJson(res, req.user._id);
					}
		        }
	         );
        } else {
        	return res.send(400, {
			        message: 'Error: You are not authorized to carryout this operation'
			});
        }
	});
};

/*
*Edit a fellow's rating
*/
exports.editRating = function(req, res) {
	var skillset = req.skill,
        fellow = req.trainee;

    skillset = _.extend(skillset, req.body);
    if (req.profile) { //if instructor wants to edit his own skills
    	Instructor.update({'_id': req.profile._id, 'skillSets._id': skillset._id}, 
	      {$set: 
	      	  { 'skillSets.$.skill' : skillset.skill,
	            'skillSets.$.rating' : skillset.rating
	      	  }

	      }, 
          function(err) {
          	  if (err) {
                 return res.send(400, {message: 'could not edit rating' });
              } else {
                 //res.jsonp(user);
                 returnJson(res, req.profile._id);
              }
          }
        ); 
    } else { //for instructor to edit fellow's rating
	    Applicant.update({'_id': fellow._id, 'skillSets._id': skillset._id}, 
	      {$set: 
	      	  { 'skillSets.$.skill' : skillset.skill,
	            'skillSets.$.rating' : skillset.rating
	      	  }

	      }, 
          function(err) {
          	  if (err) {
                 return res.send(400, { message: 'could not edit rating' });
              } else {
                 //res.jsonp(fellow);
                 returnJson(res, fellow._id);
              }
          }
        ); 
	}
};

/*
*Delete a rating
*/
exports.deleteRating = function(req, res){
	var skillset = req.skill,
        fellow = req.trainee;

    if (req.profile) {	
		Instructor.update(
		    { _id: req.profile._id }, 
		    { $pull: { 'skillSets': { '_id': skillset._id } }  
		    }, function (err) {
		    	if (err) {
					return res.send(400, {
						message: 'could not delete rating'
					});
				} else {
					//res.jsonp(user);
					returnJson(res, req.profile._id);
				}
		    }
	    );
    } else {
        Applicant.update(
		    { '_id': fellow._id }, 
		    { $pull: { 'skillSets': { '_id': skillset._id } }  
		    }, function (err, fellow) {
		    	if (err) {
					return res.send(400, {
						message: 'could not delete rating'
					});
				} else {
					//res.jsonp(fellow);
					returnJson(res, fellow._id);
				}
		    }
	    );
	}
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
    Applicant.findById(id).where({_type: 'Applicant'}).populate('campId','camp_name').exec(function(err, trainee) {
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
	if (req.profile && req.profile._type === 'Instructor') {
		req.skill = req.profile.skillSets.id(id);
	} else {
        req.skill = req.trainee.skillSets.id(id);
	}
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
    if (req.user._type === 'Instructor' && req.user.role === 'instructor') {
        next();
    } else {
        return res.send(403, {
              message: 'User is not authorized'
        });
    }
};

/**
 * Upload image
 */
var uploadImage = function(req, res, contentType, tmpPath, destPath, person, experience) {
    
    // Server side file type checker.
    if (contentType !== 'image/png' && contentType !== 'image/jpeg') {
        fs.unlink(tmpPath);
        return res.send(400, { 
        	message: 'Unsupported file type. Only jpeg or png format allowed' 
        });
    } else {
    	fs.readFile(tmpPath , function(err, data) {
	        fs.writeFile(destPath, data, function(err) {
	        	if (err) {
	        	   return res.send(400, { message: 'Destination path doesn\'t exist.' });
	        	}
	        	else {
	               fs.unlink(tmpPath, function(){
			        	var path =  person.photo;

				        if (fs.existsSync(path)) {
						    fs.unlink(path);
						}

				        Instructor.update(
				             {_id: person._id},
				             {$set: { photo: destPath, experience: experience } },
				              function (error, user) {
				                 if (error) {
				                    return res.send(400, { message: 'Error: save operation failed' });
				                 } else {
				                     res.jsonp(user);
				                 }
				              }
				        );
	               });
	        	}
	        }); 
	    });
    }
};


/**
 * Instructor updates experience and photo
 */
exports.updateInfo = function(req, res) {
    //Parse Form
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {

    	User.findById(req.user.id).exec(function(err, person) {
	        if (err) {
               return res.send(400, { message: err });
	        } else if (!person) {
	        	return res.send(400, { message: 'Failed to load User ' + person._id });
	        } else {
	        	var experience = '';
	        	if (fields.exp) {
		        	experience = fields.exp[0];
		        } 
		
		        if (files.file) {
		            //if there is a file do upload
		            var file = files.file[0],     contentType = file.headers['content-type'],
		                tmpPath = file.path,      extIndex = tmpPath.lastIndexOf('.'),
		                extension = (extIndex < 0) ? '' : tmpPath.substr(extIndex);

		            // uuid is for generating unique filenames. 
		            var fileName = uuid.v4() + extension;
		            
		            var destPath =  'public/modules/core/img/server/Temp/' + fileName;
		                 
		            uploadImage(req, res, contentType, tmpPath, destPath, person, experience);
		        } else {
		        	Instructor.update(
			             {_id: person._id},
			             {$set: { experience: experience } },
			              function (error, user) {
			                 if (error) {
			                    return res.send(400, { message: 'Error: save operation failed' });
			                 } else {
			                     res.jsonp(user);
			                 }
			              }
				    );
		        }
		    }
	    });
    });
};

/**
 * Delete photo 
 */
exports.deletePhoto = function(req, res) {
	var profile = req.profile;

	if (fs.existsSync(profile.photo)) {
	    fs.unlink(profile.photo);
	} 

	Instructor.update(
	     {_id: profile._id},
	     {$set: { photo: '' } },
	      function (error) {
	         if (error) {
	            return res.send(400, { message: 'Error: save operation failed' });
	         } else {
	             //res.jsonp(user);
	             returnJson(res, profile._id);
	         }
	      }
	);
};