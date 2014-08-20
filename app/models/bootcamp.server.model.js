// // 'use strict';

// // /**
// //  * Module dependencies.
// //  */
// // var mongoose = require('mongoose'),
// // 	Schema = mongoose.Schema;

// // /**
// //  * Andela Bootcamp Assessments Schema
// //  */

// <<<<<<< HEAD
// //  var AssessmentSchema = new Schema({
// //  	assessment_name:{
// //  		type: String,
// //  		default: '',
// //  		trim: true
// //  	},
// //  	assessment_date:{
// //  		type: Date,
// //  		default: ''
// //  	},
// //  	applicantId:{
// //  		type: Schema.ObjectId,
// //  		ref: 'Applicant' //stundent id
// //  	},
// //  	instructorId:{
// //  		type: Schema.ObjectId,
// //  		ref: 'Instructor' /**Instructor**/
// //  	},
// //  	created:{
// //  		type: Date,
// //  		default:  Date.now
// //  	},
// //  	score: {
// //  		type: Number,
// //  		required: 'The Applicant score is compulsory'
// //  	}
// =======
//  var AssessmentSchema = new Schema({
//  	assessment_name:{
//  		type: String,
//  		default: '',
//  		trim: true
//  	},
//  	assessment_date:{
//  		type: Date,
//  		default: ''
//  	},
//  	stundent_data:{
//  		type: Schema.ObjectId,
//  		ref: 'User' //stundent id
//  	},
//  	assessment_instructor:{
//  		type: Schema.ObjectId,
//  		ref: 'User' /**Instructor**/
//  	},
//  	created:{
//  		type: Date,
//  		default:  Date.now
//  	}
// >>>>>>> b145e7637f1719f9194435db5b76ea345b38c14d

// //  });

// //  mongoose.model('Assessment', AssessmentSchema);

// <<<<<<< HEAD
// // /**
// //  * Andela Bootcamp Schema
// //  */
// // var BootcampSchema = new Schema({
// // 	camp_name: {
// // 		type: String,
// // 		default: '',
// // 		required: 'Please fill in the Bootcamp name',
// // 		trim: true
// // 	},
// // 	assessments:{
// // 		type:[AssessmentSchema],
// // 		default: []
// // 	},
// // 	start_date: {
// // 		type: Date,
// // 		default: ''
// // 	},
// // 	end_date: {
// // 		type: Date,
// // 		default: ''
// // 	},
// // 	created: {
// // 		type: Date,
// // 		default: Date.now
// // 	},
// // 	user: {
// // 		type: Schema.ObjectId,
// // 		ref: 'Applicant' 
// // 	}
// // });
// =======
// /**
//  * Andela Bootcamp Schema
//  */
// var BootcampSchema = new Schema({
// 	camp_name: {
// 		type: String,
// 		default: '',
// 		required: 'Please fill in the Bootcamp name',
// 		trim: true
// 	},
// 	assessments:{
// 		type:[AssessmentSchema],
// 		default: []
// 	},
// 	start_date: {
// 		type: Date,
// 		default: ''
// 	},
// 	end_date: {
// 		type: Date,
// 		default: ''
// 	},
// 	created: {
// 		type: Date,
// 		default: Date.now
// 	},
// 	user: {
// 		type: Schema.ObjectId,
// 		ref: 'User' 
// 	}
// });
// >>>>>>> b145e7637f1719f9194435db5b76ea345b38c14d

// // mongoose.model('Bootcamp', BootcampSchema);
