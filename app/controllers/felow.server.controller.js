// 'use strict';

// /**
//  * Module dependencies.
//  */
// var mongoose = require('mongoose'),
// 	passport = require('passport'),
// 	User = mongoose.model('User'),
// 	Applicant = mongoose.model('Applicant'),
// 	Bootcamp = mongoose.model('Bootcamp'),
// 	_ = require('lodash');

// /**
//  * Get the error message from error object
//  */
// var getErrorMessage = function(err) {
// 	var message = '';

// 	if (err.code) {
// 		switch (err.code) {
// 			case 11000:
// 			case 11001:
// 				message = 'Username already exists';
// 				break;
// 			default:
// 				message = 'Something went wrong';
// 		}
// 	} else {
// 		for (var errName in err.errors) {
// 			if (err.errors[errName].message) message = err.errors[errName].message;
// 		}
// 	}

// 	return message;
// };
// exports.applicantByID = function(req, res, next, id) {
// 	Applicant.findOne({
// 		_id:id
// 	}).exec(function(err, applicant){
// 		if(err)  return next(err);
// 		if(!applicant) return next(new Error('Failed to load Applicant' + id));
// 		req.applicant = applicant;
// 		next();
// 	});
// };

// /**
//  * User authorizations routing middleware
//  */
// exports.hasAuthorization = function() {
	
// };

// exports.create_camp = function(req, res) {
// 	var bootcamp = new Bootcamp(req.body);
// 	bootcamp.user = req.user;
// 	bootcamp.save(function(err) {
// 		if (err) {
// 			return res.send(400, {
// 				message: getErrorMessage(err)
// 			});
// 		} else {
// 			res.jsonp(bootcamp);
// 		}
// 	});
// };

// /**
//  * Show the current Bootcamp
//  */
// exports.read_camp = function(req, res) {
// 	res.jsonp(req.bootcamp);
// };

// /**
//  * Update a Bootcamp
//  */
// exports.update_camp = function(req, res) {
// 	var bootcamp = req.bootcamp ;

// 	bootcamp = _.extend(bootcamp , req.body);

// 	bootcamp.save(function(err) {
// 		if (err) {
// 			return res.send(400, {
// 				message: getErrorMessage(err)
// 			});
// 		} else {
// 			res.jsonp(bootcamp);
// 		}
// 	});
// };

// /**
//  * Delete an Bootcamp
//  */
// exports.delete_camp = function(req, res) {
// 	var bootcamp = req.bootcamp ;

// 	bootcamp.remove(function(err) {
// 		if (err) {
// 			return res.send(400, {
// 				message: getErrorMessage(err)
// 			});
// 		} else {
// 			res.jsonp(bootcamp);
// 		}
// 	});
// };
// /** 
// 	create an applicant*
// */
// exports.create_applicant = function(req, res){
// 	var bootcamp = req.bootcamp;
// 	var applicant = req.body;
// 	bootcamp.applicant.push(applicant);
// 	// bootcamp.applicants.create(applicant);
// 	bootcamp.save(function(err) {
// 		if (err) {
// 			return res.send(400, {
// 				message: getErrorMessage(err)
// 			});
// 		} else {
// 			res.jsonp(bootcamp);
// 		}
// 	});
// };
// /*
// 	*delete an applicant*
// */
// exports.delete_applicant = function(req, res){
// 	var bootcamp = req. bootcamp;
// 	var applicant = req.applicant;
// 	applicant.remove();
// 	bootcamp.save(function(err){
// 		if (err) {
// 			return res.send(400, {
// 				message: getErrorMessage(err)
// 			});
//     	}
//     	else{
//     		res.jsonp(bootcamp);
//     	}
// 	});
// };

// /*
// 	*read an applicant*
// */
// exports.read_applicant = function(req, res){
// 	res.jsonp(req.applicant);
// };

// /*
// 	*update an applicant*
// */
// exports.update_applicant = function(req, res){
// 	var bootcamp = req.bootcamp;
// 	var applicant = req.applicant;
// 	applicant = _.extend(applicant , req.body);
// 	bootcamp.save(function(err) {
// 		if (err) {
// 			return res.send(400, {
// 				message: getErrorMessage(err)
// 			});
// 		} else {
// 			res.jsonp(bootcamp);
// 		}
// 	});
// };
// /**
//  * List of Bootcamps
//  */
// exports.list_camp = function(req, res) { Bootcamp.find().sort('-created').populate('user', 'displayName').exec(function(err, bootcamps) {
// 		if (err) {
// 			return res.send(400, {
// 				message: getErrorMessage(err)
// 			});
// 		} else {
// 			res.jsonp(bootcamps);
// 		}
// 	});
// };

// /*
// 	*list an applicant*
// */
// exports.list_applicant = function(req, res){
// 	 res.jsonp(req.bootcamp.applicants);
// };