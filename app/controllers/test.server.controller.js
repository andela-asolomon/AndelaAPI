'use strict';

/**
 * Module dependencies.
 */
var mongoose 		= require('mongoose'),
	Test 			= mongoose.model('Test'),
	User 			= mongoose.model('User'),
	Applicant 		= mongoose.model('Applicant'),
	Bootcamp 		= mongoose.model('Bootcamp'),
    _ 				= require('lodash');

/**
 * Show the current Test
 */
exports.read = function(req, res) {
	res.jsonp(req.test);
};


// Getting questions from Test Schema
exports.viewQuestion = function(req, res, next, id) {
	var user = req.user;
	var message = null;

	if (user) {
		Test.findById(id).exec(function(err, test) {
	        if (err) return next(err);
	        if (!test) return next(new Error('Failed to load test ' + id));
	        req.test = test;
	        next();
	    });
	} else {
		res.send(400, {
			message: 'You need to sigin to take test'
		});
	}
};
