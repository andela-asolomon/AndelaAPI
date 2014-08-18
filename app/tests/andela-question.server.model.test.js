'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	AndelaQuestion = mongoose.model('AndelaQuestion');

/**
 * Globals
 */
var user, andelaQuestion;

/**
 * Unit tests
 */
describe('Andela question Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			andelaQuestion = new AndelaQuestion({
				name: 'Andela question Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return andelaQuestion.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			andelaQuestion.name = '';

			return andelaQuestion.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		AndelaQuestion.remove().exec();
		User.remove().exec();

		done();
	});
});