'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');

module.exports = function(app) {
	// User Routes
	var users = require('../../app/controllers/users');
	var admin = require('../../app/controllers/admin');
	app.route('/users/me').get(users.me);
	app.route('/users').get(users.list).put(users.update);
	app.route('/users/:userId').get(users.read).put(users.adminUpdate);
	app.route('/users/:userId/password').post(users.changePassword);
	app.route('/users/accounts').delete(users.removeOAuthProvider);
	app.route('/users/view').get(users.requiresLogin, users.appView);
	app.route('/users/check/uniqueUsername').post(users.uniqueUsername);
	
	// Setting up the users api
	app.route('/auth/:campId/signup').post(users.signup);
	app.route('/auth/signin').post(users.signin);
	app.route('/auth/signout').get(users.signout);
	app.route('/camps').get(users.getCamps);
	app.route('/camps/:campId').get(users.getCamp);
	// Setting the facebook oauth routes
	app.route('/auth/facebook').get(passport.authenticate('facebook', {
		scope: ['email']
	}));
	app.route('/auth/facebook/callback').get(users.oauthCallback('facebook'));

	// Setting the twitter oauth routes
	app.route('/auth/twitter').get(passport.authenticate('twitter'));
	app.route('/auth/twitter/callback').get(users.oauthCallback('twitter'));

	// Setting the google oauth routes
	app.route('/auth/google').get(passport.authenticate('google', {
		scope: [
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email'
		]
	}));
	app.route('/auth/google/callback').get(users.oauthCallback('google'));

	// Setting the linkedin oauth routes
	app.route('/auth/linkedin').get(passport.authenticate('linkedin'));
	app.route('/auth/linkedin/callback').get(users.oauthCallback('linkedin'));

	// Finish by binding the user middleware
	app.param('userId', users.userByID);

	// Finish by binding the bootcamp middleware
	app.param('campId', admin.campByID);

	//Finish by binding the test middleware
	app.param('testId', admin.testByID);
};