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


/**
Input assessment score for trainee
*/
exports.createAssmt = function(req, res){
	req.body.instructorId = req.user;
	req.body.applicantId = req.trainee._id;
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
		fellow.skillSets.push(skillset);
		fellow.save(function(err) {
			if (err) {
			    return res.send(400, {
			       message: 'Error: Couldn\'t rate fellow'
			    });
			} else {
			    res.jsonp(fellow);
			}
		});
	}
};


/**
 * Upload image
 */
var uploadImage = function(req, res, contentType, tmpPath, destPath) {
    
    // Server side file type checker.
    if (contentType !== 'image/png' && contentType !== 'image/jpeg') {
        fs.unlink(tmpPath);
        return res.send(400, { message: 'Unsupported file type.' });
    }

    fs.readFile(tmpPath , function(err, data) {
        fs.writeFile(destPath, data, function(err) {
        	if (err) {
        	   return res.send(400, { message: 'Destination path doesn\'t exist.' });
        	}
        	else {
               fs.unlink(tmpPath, function(err){
                 if (err) {
                 	return res.send(400, { message: 'Temp path doesn\'t exist.' });
                 }
               });
        	}
        }); 
    });
};


/**
 * Instructor updates experience and photo
 */
exports.updateInfo = function(req, res) {
    //Parse Form
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
        if(files.file[0]) {
            //if there is a file do upload
            var file = files.file[0], contentType = file.headers['content-type'],
                tmpPath = file.path,  extIndex = tmpPath.lastIndexOf('.'),
                extension = (extIndex < 0) ? '' : tmpPath.substr(extIndex);

            // uuid is for generating unique filenames. 
            var fileName = uuid.v4() + extension;
            
            var destPath =  'public/modules/core/img/server/Temp/' + fileName;
            uploadImage(req, res, contentType, tmpPath, destPath);

            User.findById(req.user._id).exec(function(err, user) {
		        if (err) {
                   return res.send(400, { message: 'err occurred' });
		        }

		        if (!user) {
		        	return res.send(400, { message: 'Failed to load User ' + req.user._id });
		        }
                
                var path =  user.photo;

		        if (fs.existsSync(path)) {
				    fs.unlink(path, function(err){
                       if (err) {
                          return res.send(400, { message: 'Error: save operation failed' });
                        }
                    });
				}
                console.log('path' + path);
                console.log('photo' + user.photo);
		        user.photo = destPath;
		        user.experience = fields.exp[0];
		        user.save(function(err) {
		            if (err) {
		               return res.send(400, { message: 'Error: save operation failed' });
		            } else {
		                res.jsonp(user);
		            }
		        });   
		    });
        }
    });
};




/*
*Instructor adds his own skillset
*/
exports.addSkills = function(req, res) {
	var skill = req.body;
	User.findById(req.user._id).exec(function(err, user) {
        if (user._type === 'Instructor') {
        	user.skillSets.push(skill);

            user.save(function(err) {
				if (err) {
				    return res.send(400, {
				       message: 'Error: Couldn\'t add skill'
				    });
				} else {
				    res.jsonp(user);
				}
			});
        } else {
        	return res.send(400, {
			       message: 'Error: You are not authorized to carryout this operation'
			});
        }
	});
};

/*
*Edit a rating
*/
exports.editRating = function(req, res) {
	var skillset = req.skill,
        fellow = req.trainee;

    skillset = _.extend(skillset, req.body);
    if (req.profile) {
    	req.profile.save(function(err) {
	       if (err) {
	          return res.send(400, {
	              message: "could not edit rating"
	          });
	        } else {
	              res.jsonp(req.profile);
	        }
	    });
    } else {
	    fellow.save(function(err) {
	       if (err) {
	          return res.send(400, {
	              message: "could not edit rating"
	          });
	        } else {
	              res.jsonp(fellow);
	        }
	    });
	}
};

/*
*Delete a rating
*/
exports.deleteRating = function(req, res){
	var skillset = req.skill,
        fellow = req.trainee;

    skillset.remove();
     if (req.profile) {
    	req.profile.save(function(err) {
	       if (err) {
	          return res.send(400, {
	              message: "could not delete rating"
	          });
	        } else {
	              res.jsonp(req.profile);
	        }
	    });
    } else {
	    fellow.save(function(err) {
	       if (err) {
	          return res.send(400, {
	              message: "could not delete rating"
	          });
	        } else {
	              res.jsonp(fellow);
	        }
	    });
	}
};

/*
*Instructor can update his experience
*/
exports.updateExp = function(req, res) {
     var profile = req.profile;
         profile = _.extend(profile, req.body);

     profile.save(function(err) {
	       if (err) {
	          return res.send(400, {
	              message: "could not save experience"
	          });
	        } else {
	              res.jsonp(req.profile);
	        }
	 });
}

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
    if (req.user._type === "Instructor" && req.user.role === "instructor") {
        next();
    } else {
        return res.send(403, {
              message: 'User is not authorized'
        });
    }
};
