'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	extend = require('mongoose-schema-extend'),
	Schema = mongoose.Schema,
	crypto = require('crypto');


/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function(property) {
	return ((this.provider !== 'local' && !this.updated) || property.length);
};

/**
 * A Validation function for local strategy password
 */
var validateLocalStrategyPassword = function(password) {
	return (this.provider !== 'local' || (password && password.length > 6));
};

/**
 * User Schema
 */
var UserSchema = new Schema({
	firstName: {
		type: String,
		trim: true,
		default: '',
		validate: [validateLocalStrategyProperty, 'Please fill in your first name']
	},
	lastName: {
		type: String,
		trim: true,
		default: '',
		validate: [validateLocalStrategyProperty, 'Please fill in your last name']
	},
	email: {
		type: String,
		trim: true,
		default: '',
		validate: [validateLocalStrategyProperty, 'Please fill in your email'],
		match: [/.+\@.+\..+/, 'Please fill a valid email address']
	},
	username: {
		type: String,
		required: 'Please fill in a username',
		trim: true
	},
	password: {
		type: String,
		default: '',
		validate: [validateLocalStrategyPassword, 'Password should be longer']
	},
	salt: {
		type: String
	},
	provider: {
		type: String,
		required: 'Provider is required',
	},
	providerData: {},
	additionalProvidersData: {},
	updated: {
		type: Date
	},
	created: {
		type: Date,
		default: Date.now
	}
}, { collection : 'users', discriminatorKey : '_type' });

/**
 * Skillset Schema
 */
var SkillsetSchema = new Schema({
	skill: {
		type: String
	},
	rating: {
		type: Number
	}
});

/**
 * Assessment Schema
 */
var AssessmentSchema = new Schema({
 	assessment_name:{
 		type: String,
 		trim: true,
        required: 'Name of assessment is important'
 	},
 	assessment_date:{
 		type: Date,
        required: 'Date of assessment is important'
 	},
 	applicantId:{
 		type: Schema.ObjectId,
 		ref: 'Applicant' 
 	},
 	instructorId:{
 		type: Schema.ObjectId,
 		ref: 'Instructor'
 	},
 	score: {
 		type: Number,
 		required: 'The Applicant score is compulsory'
 	}

 });

/**
 * Work History Schema
 */
var WorkHistorySchema = new Schema({
 	company: {
 		type: String,
 		trim: true,
        required: 'Name of company is important'
 	},
 	jobDescription: {
 		type: String,
        required: 'Job description is important'
 	},
 	location: {
 		type: String,
 		required: 'Job location is important'
 	},
 	from: {
 		type: Date,
 		required: 'Start date is important'
 	},
 	to: {
 		type: Date,
 		required: 'End date is important'
 	}

 });

/**
 * 
 * Applicant Schema, Trainee and Fellow
 */
 var ApplicantSchema = UserSchema.extend({
 	testScore: {
 		type: Number,
 		required: 'Applicant score must be submitted'
 	},
 	cvPath: {
 		type: String
 		// required: 'A vaild CV is required'
 	},
 	photo_path: String,
 	role: {
 		type: String,
 		enum: ['applicant', 'trainee', 'fellow']
 	},
 	status: {
 		name: {
 			type: String,
 			enum: ['pending', 'rejected', 'selected for bootcamp', 'selected for interview']
 		},
 		reason: {
            type: String
 		}
 	},
 	portfolio: {
 		type: String
 	},
 	skillSets: [SkillsetSchema],
 	profile: {
 		type: String
 	},
 	campId: {
 		type: Schema.ObjectId,
 		ref: 'Bootcamp'
 	},
 	currPlacement: {
 		status: {
 			type: String
 		},
 		startDate: {
            type: Date
 		},
 		endDate: {
            type: Date
 		}
 	},
 	assessments: [AssessmentSchema],
 	workHistory: [WorkHistorySchema]
});

/**
 * Instructor Schema
 */
 var InstructorSchema = UserSchema.extend({
 	experience: {
 		type: String
 	},
 	photo: {
 		type: String
 	},
 	role: {
 		type: String,
 		enum: ['instructor', 'admin']
 	},
 	skillSets: [SkillsetSchema]
 });


 /**
 * Bootcamp Schema
 */
var BootcampSchema = new Schema({
	camp_name: {
		type: String,
		required: 'Please fill in the Bootcamp name',
		trim: true
	},
	start_date: {
		type: Date
	},
	end_date: {
		type: Date
	},
	created: {
		type: Date,
		default: Date.now
	},
	applicants: [ApplicantSchema]
});
 
/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function(next) {
	if (this.password && this.password.length > 6) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}

	next();
});

ApplicantSchema.pre('save', function(next) {
	if (this.password && this.password.length > 6) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		if (this.constructor.name === 'EmbeddedDocument') {
			var TempApplicant = mongoose.model('Applicant');
			var embeddedDocApplicant = new TempApplicant(this);
			this.password = embeddedDocApplicant.hashPassword(this.password);
		} else {
            this.password = this.hashPassword(this.password);
		}
	}

	next();
});

InstructorSchema.pre('save', function(next) {
	if (this.password && this.password.length > 6) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}

	next();
});

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function(password) {
	if (this.salt && password) {
		return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
	} else {
		return password;
	}
};

ApplicantSchema.methods.hashPassword = function(password) {
	if (this.salt && password) {
		return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
	} else {
		return password;
	}
};

InstructorSchema.methods.hashPassword = function(password) {
	if (this.salt && password) {
		return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
	} else {
		return password;
	}
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};

ApplicantSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};

InstructorSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};

/**
 * Find possible not used username
 */
UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
	var _this = this;
	var possibleUsername = username + (suffix || '');

	_this.findOne({
		username: possibleUsername
	}, function(err, user) {
		if (!err) {
			if (!user) {
				callback(possibleUsername);
			} else {
				return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
			}
		} else {
			callback(null);
		}
	});
};

ApplicantSchema.statics.findUniqueUsername = function(username, suffix, callback) {
	var _this = this;
	var possibleUsername = username + (suffix || '');

	_this.findOne({
		username: possibleUsername
	}, function(err, user) {
		if (!err) {
			if (!user) {
				callback(possibleUsername);
			} else {
				return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
			}
		} else {
			callback(null);
		}
	});
};

InstructorSchema.statics.findUniqueUsername = function(username, suffix, callback) {
	var _this = this;
	var possibleUsername = username + (suffix || '');

	_this.findOne({
		username: possibleUsername
	}, function(err, user) {
		if (!err) {
			if (!user) {
				callback(possibleUsername);
			} else {
				return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
			}
		} else {
			callback(null);
		}
	});
};

mongoose.model('User', UserSchema);
mongoose.model('Applicant', ApplicantSchema);
mongoose.model('Instructor', InstructorSchema);
mongoose.model('Bootcamp', BootcampSchema);
mongoose.model('Skillset', SkillsetSchema);
mongoose.model('Assessment', AssessmentSchema);
mongoose.model('WorkHistory', WorkHistorySchema);
