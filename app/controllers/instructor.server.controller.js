'use strict';
/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Instructor = mongoose.model('Instructor'),
    Applicant = mongoose.model('Applicant'),
    User = mongoose.model('User'),
    Test = mongoose.model('Test'),
    Question = mongoose.model('Question'),
    Options = mongoose.model('Options'),
    Bootcamp = mongoose.model('Bootcamp'),
    _ = require('lodash');
var users = require('../../app/controllers/users');