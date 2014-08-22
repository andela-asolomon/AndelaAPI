'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
<<<<<<< HEAD
    Schema = mongoose.Schema;

/**
 * Options Schema
 */
var OptionSchema = new Schema({
    option: {
        type: String,
        trim: true,
        required: 'Option cannot be blank'
    }
});

/*Questions schema*/
var QuestionSchema = new Schema({
    question: {
        type: String,
        trim: true,
        required: 'Question cannot be blank'
    },
    questOptions: [OptionSchema]
=======
	Schema = mongoose.Schema;

var questionSchema = new Schema({
	_id: Number,
	question: String,
	choices: [{
		_id: Number,
		choice: String
	}],
	answer: Number
>>>>>>> Applicant
});

/**
 * Test Schema
 */
var TestSchema = new Schema({
<<<<<<< HEAD
    created: {
        type: Date,
        default: Date.now
    },
    testName: {
        type: String,
        trim: true,
        required: 'Name of test cannot be blank'
    },
    questions: [QuestionSchema]

});

mongoose.model('Test', TestSchema);
mongoose.model('Question', QuestionSchema);
mongoose.model('Options', OptionSchema);
=======
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
>>>>>>> Applicant
