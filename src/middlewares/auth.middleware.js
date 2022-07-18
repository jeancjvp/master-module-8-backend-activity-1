const jwt = require('jsonwebtoken');
const Users = require('../models/users.model');

module.exports.checkAuth = async (req, res, next) => {
	const authHeader = req.headers.authorization || '';

	const token = authHeader.split(' ')[1];

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		console.log('decoded', decoded);

		const userId = decoded.sub;
		const user = await Users.findById(userId);
		
		if (user) {
			req.user = user;
			next();
		} else {
			res.status(401).json({ message: 'Unauthorized' });
		}
	} catch (err) {
		res.status(401).json({ message: 'Unauthorized' });
	}
};

// Authorization: Bearer <TOKEN>