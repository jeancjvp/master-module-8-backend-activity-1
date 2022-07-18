const Posts = require('../models/posts.model');
const createError = require('http-errors');

// Get All Posts
module.exports.list = (req, res, next) => {
	Posts.find()
		.then((posts) => {
			res.status(200).json(posts);
		})
		.catch(next);
};

// Get Post
module.exports.detail = (req, res, next) => {
	const id = req.params.id;

	Posts.findById(id)
		.then((post) => {
			if (post) {
				res.status(200).json(post);
			} else {
				next(createError.NotFound());
			}
		})
		.catch(next);
};

// Create Post
module.exports.create = (req, res, next) => {
	const data = ({ title, text, author } = req.body);

	Posts.create(data)
		.then((post) => {
			res.status(201).json(post);
		})
		.catch(next);
};

// Update Post
module.exports.update = (req, res, next) => {
	const id = req.params.id;
	const data = ({ title, text, author } = req.body);

	Posts.findByIdAndUpdate(id, data, { new: true })
		.then((post) => {
			if (post) {
				res.status(200).json(post);
			} else {
				next(createError.NotFound());
			}
		})
		.catch(next);
};

// Delete Post
module.exports.delete = (req, res, next) => {
	const id = req.params.id;

	Posts.findByIdAndDelete(id)
		.then((post) => {
			if (post) {
				res.status(204).json({});
			} else {
				next(createError.NotFound());
			}
		})
		.catch(next);
};