'use strict';

var test = require('../../app/controllers/test'),
	admin = require('../../app/controllers/admin');

module.exports = function(app) {
	// Routing logic   
	app.route('/test/:testId')
		.get(test.read)
		.post(test.viewQuestion);

	//Finish by binding the test middleware
	app.param('testId', admin.testByID);
};