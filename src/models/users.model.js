const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

// Schema
const users = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			validate: [validator.isEmail, 'invalid email'],
		},
		password: {
			type: String,
			required: true,
		},
		bio: {
			type: String,
		},
		active: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true, // createAt & updateAt
		toJSON: {
			transform: (doc, ret) => {
				delete ret.__v;
				ret.id = ret._id;
				delete ret._id;
				delete ret.password;
				return ret;
			}
		}
	}
);

users.pre('save', function (next) {
	if (this.isModified('password')) {
		bcrypt.hash(this.password, 10)
			.then(hash => {
				this.password = hash;
				next();
			})
			.catch(next);
	}
});

users.methods.checkPassword = function (password) {
	return bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('Users', users);