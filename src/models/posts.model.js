const mongoose = require('mongoose');

// Schema
const posts = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			minLength: 5,
		},
		text: {
			type: String,
			required: true,
			minLength: 5,
		},
		author: {
			type: mongoose.Types.ObjectId,
			ref: 'Users',
		}
	},
	{
		timestamps: true, // createAt & updateAt
		toJSON: {
			transform: (doc, ret) => {
				delete ret.__v;
				ret.id = ret._id;
				delete ret._id;
				return ret;
			}
		}
	}
);

module.exports = mongoose.model('Posts', posts);