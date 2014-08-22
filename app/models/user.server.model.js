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
	// console.log('validate passwd');
	// console.log(password);
	// console.log('how d fuck is this invalid');
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
		unique: true,
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
	roles: {
		type: [{
			type: String,
			enum: ['user', 'admin']
		}],
		default: ['user']
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
	skills: {
		type: String
	},
	rating: {
		type: Number
	}
});

/**
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
 	roles: {
 		type: String,
 		enum: ['applicant', 'trainee', 'fellow']
 	},
 	status: {
 		type: Schema.ObjectId,
 		ref: 'Status'
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
 	}
 });

/**
 * Status Schema
 */
var StatusSchema = new Schema({
	pending: {
		type: String
	},
	rejected: {
		description: {
			type: String
		}
	},
	selectedCamp: {
		type: String
	},
	selectedInterview: {
		type: String
	}
});

/**
 * Instructor Schema
 */
 var InstructorSchema = UserSchema.extend({
 	skillSets: [SkillsetSchema],
 	experience: {
 		type: String
 	},
 	photo: {
 		type: String
 	},
 	roles: {
 		type: String,
 		enum: ['instructor', 'admin']
 	}
 });

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
 * Bootcamp Schema
 */
var BootcampSchema = new Schema({
	camp_name: {
		type: String,
		required: 'Please fill in the Bootcamp name',
		trim: true
	},
	assessments:{
		type:[AssessmentSchema]
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
	user: {
		type: Schema.ObjectId,
		ref: 'Applicant' 
	},
	applicants: {
		type: [ApplicantSchema]
	} 
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
	// console.log('pre save signal to hash password');
	if (this.password && this.password.length > 6) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		if(this.constructor.name === 'EmbeddedDocument'){
			var tempApplicant = mongoose.model('Applicant');
			var embeddedDocApplicant = new tempApplicant(this);
			this.password = embeddedDocApplicant.hashPassword(this.password);
		}
		else {
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
	console.log('about to hash password');
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