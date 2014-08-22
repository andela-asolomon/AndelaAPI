'use strict';

var test = require('../../app/controllers/test'),
	users = require('../../app/controllers/users'),
	admin = require('../../app/controllers/admin');

module.exports = function(app) {
	// Viewing a specifib question
	app.route('/test/:testId')
		.get(users.requiresLogin, test.read);

	//Finish by binding the test middleware
	app.param('testId', admin.testByID);
};