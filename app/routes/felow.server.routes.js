'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
	felows = require('../../app/controllers/felow');

module.exports = function(app) {
	// Setting up the bootcamp api
	app.route('/camps')
		.get(felows.list_camp) // login and authorization required
		.post(felows.create_camp); //by admin
		
	app.route('/camps/:campId')
		.get(felows.read_camp) // login and authorization required
		.put(felows.update_camp) // login and authorization required
		.delete(felows.delete_camp); // login and authorization required

	app.route('/camps/:campId/fellow')
		.get(felows.list_applicant) // login and authorization required
		.post(felows.create_applicant); //by admin
		
	app.route('/camps/:campId/fellow/:fellowId')
		.get(felows.read_applicant) // login and authorization required
		.delete(felows.delete_applicant); // login and authorization required by admin

	// Finish by binding the fellow middleware
	app.param('applicantId', felows.applicantByID);

};