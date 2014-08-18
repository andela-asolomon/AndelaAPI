'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var bootcamps = require('../../app/controllers/bootcamps');

	// Bootcamps Routes
	app.route('/bootcamps')
		.get(bootcamps.list)
		.post(users.requiresLogin, bootcamps.create); //instructor login

	app.route('/bootcamps/:bootcampId')
		.get(users.requiresLogin, bootcamps.read)
		.put(users.requiresLogin, bootcamps.hasAuthorization, bootcamps.update) //instructor login
		.delete(users.requiresLogin, bootcamps.hasAuthorization, bootcamps.delete);  //instructor login

	app.route('/bootcamps/:bootcampId/assessments')
		.get(users.requiresLogin, bootcamps.list_assessment) //instructors require login
		.post(users.requiresLogin, bootcamps.create_assessment); //instructor login
	
	app.route('/bootcamps/:bootcampId/assessments/:assessmentId')
		.get(users.requiresLogin, bootcamps.read_assessment) //users require login
		.put(users.requiresLogin, bootcamps.hasAuthorization_assessment, bootcamps.update_assessment) //instructor login
		.delete(users.requiresLogin, bootcamps.hasAuthorization_assessment, bootcamps.delete_assessment);  //instructor login
	// Finish by binding the Bootcamp middleware

	// Finish by binding the Bootcamp middleware
	app.param('bootcampId', bootcamps.bootcampByID);

	app.param('assessmentId', bootcamps.assessmentByID);
};