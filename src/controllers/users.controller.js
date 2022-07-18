const Users = require('../models/users.model');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

// Create User
module.exports.create = (req, res, next) => {
	const data = ({ name, email, password, bio } = req.body);

	Users.create(data)
		.then((user) => {
			res.status(201).json(user);
		})
		.catch(next);
};

// Login User
module.exports.login = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;

	Users.findOne({ email: email })
		.then((user) => {
			if (user) {
				if (user.active) {
					user.checkPassword(password)
					.then((match) => {
						if (match) {
							const token = jwt.sign(
								{
									exp: Math.floor(Date.now() / 1000) + 60 * 60,
									sub: user.id,
								},
								process.env.JWT_SECRET
							);

							res.json({ access_token: token });
						} else {
							next(createError.Unauthorized());
						}
					})
					.catch(next);
				} else {
					next(createError.Unauthorized());
				}
			} else {
				next(createError.Unauthorized());
			}
		})
		.catch(next);
};

// Activate User
module.exports.activate = (req, res, next) => {
	const id = req.params.id;
	const data = { active: true };

	Users.findByIdAndUpdate(id, data, { new: true })
		.then((user) => {
			if (user) {
				res.status(200).json(user);
			} else {
				next(createError.NotFound());
			}
		})
		.catch(next);
};

// Delete User
module.exports.delete = (req, res, next) => {
	const id = req.params.id;

	Users.findByIdAndDelete(id)
		.then((user) => {
			if (user) {
				res.status(204).json({});
			} else {
				next(createError.NotFound());
			}
		})
		.catch(next);
};