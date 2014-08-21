'use strict';
var users = require('../../app/controllers/users');
 var fellows = require('../../app/controllers/fellows');


module.exports = function(app) {
	// Setting up the bootcamp api
	app.route('/camps')
<<<<<<< HEAD
		.get(fellows.list_camp) // login and authorization required
=======
		.get(fellows.list_camp); // login and authorization required
>>>>>>> d27202af5ed201b57b4a5a78a95f3bdc88556d1a
		// .post(fellows.create_camp); //by admin
		
	app.route('/camps/:campId')
		.get(fellows.read_camp) // login and authorization required
		.put(fellows.update_camp) // login and authorization required
		.delete(fellows.delete_camp); // login and authorization required

	app.route('/camps/:campId/fellows');
		//.get(fellows.list_applicant) // login and authorization required
		// .post(fellows.create_applicant); //by admin
		
	app.route('/camps/:campId/fellows/:fellowId')
		.get(fellows.read_applicant) // login and authorization required
		.delete(fellows.delete_applicant); // login and authorization required by admin

	// Finish by binding the fellow middleware
	app.param('fellowId', fellows.fellowByID);

};