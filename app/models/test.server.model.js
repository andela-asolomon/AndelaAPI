'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var questionSchema = new Schema({
	_id: Number,
	question: String,
	choices: [{
		_id: Number,
		choice: String
	}],
	answer: Number
});

/**
 * Test Schema
 */
var TestSchema = new Schema({
	title: {
		type: String,
		default: '',
		required: 'Please fill Test name',
		trim: true
	},
	questions: [questionSchema],
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'Applicant'
	}
});

mongoose.model('Test', TestSchema);