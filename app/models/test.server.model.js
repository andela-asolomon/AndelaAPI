'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
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
});

/**
 * Test Schema
 */
var TestSchema = new Schema({
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