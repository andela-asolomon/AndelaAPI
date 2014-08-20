'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Bootcamp = mongoose.model('Bootcamp'),
	Assessment = mongoose.model('Assessment'),
		_ = require('lodash');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Bootcamp already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

/**
 * Create a Bootcamp
 */
exports.create = function(req, res) {
	var bootcamp = new Bootcamp(req.body);
	bootcamp.user = req.user;

	bootcamp.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(bootcamp);
		}
	});
};

/**
 * Show the current Bootcamp
 */
exports.read = function(req, res) {
	res.jsonp(req.bootcamp);
};

/**
 * Update a Bootcamp
 */
exports.update = function(req, res) {
	var bootcamp = req.bootcamp ;

	bootcamp = _.extend(bootcamp , req.body);

	bootcamp.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(bootcamp);
		}
	});
};

/**
 * Delete an Bootcamp
 */
exports.delete = function(req, res) {
	var bootcamp = req.bootcamp ;

	bootcamp.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(bootcamp);
		}
	});
};
/** 
	create an assessment*
*/
exports.create_assessment = function(req, res){
	var bootcamp = req.bootcamp;
	var assessment = req.body;
	assessment.assessment_instructor = req.user;
	bootcamp.assessments.push(assessment);
	// bootcamp.assessments.create(assessment);
	bootcamp.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(bootcamp);
		}
	});
};
/*
	*delete an assessment*
*/
exports.delete_assessment = function(req, res){
	var bootcamp = req. bootcamp;
	var assessment = req.assessment;
	assessment.remove();
	bootcamp.save(function(err){
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
    	}
    	else{
    		res.jsonp(bootcamp);
    	}
	});
};

/*
	*read an assessment*
*/
exports.read_assessment = function(req, res){
	res.jsonp(req.assessment);
};

/*
	*update an assessment*
*/
exports.update_assessment = function(req, res){
	var bootcamp = req.bootcamp;
	var assessment = req.assessment;
	assessment = _.extend(assessment , req.body);
	bootcamp.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(bootcamp);
		}
	});
};
/**
 * List of Bootcamps
 */
exports.list = function(req, res) { Bootcamp.find().sort('-created').populate('user', 'displayName').populate('assessment_instructor', 'displayName').exec(function(err, bootcamps) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(bootcamps);
		}
	});
};

/*
	*list an assessment*
*/
exports.list_assessment = function(req, res){
	 console.log('Bienavenidad');
};

/**
 * Bootcamp middleware
 */
exports.bootcampByID = function(req, res, next, id) { Bootcamp.findById(id).populate('user', 'displayName').exec(function(err, bootcamp) {
		if (err) return next(err);
		if (! bootcamp) return next(new Error('Failed to load Bootcamp ' + id));
		req.bootcamp = bootcamp ;
		next();
	});
};

/**
 * Bootcamp authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.bootcamp.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};

exports.assessmentByID = function(req, res, next, id){
	if(req.bootcamp){
		req.assessment = req.bootcamp.assessments.id(id);
		next();
	}
	else{
		return next(new Error('Failed to load assessment ' + id));
	}
};

exports.hasAuthorization_assessment = function(req, res, next){
	if (req.assessment.assessment_instructor.toString() !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	console.log('fsdfdfs');
	next();
};