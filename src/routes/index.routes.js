const express = require('express');
const router = express.Router();

// Import Routes
const users = require('./users.routes');
const posts = require('./posts.routes');

// Users
router.use('/api/users', users);

// Posts
router.use('/api/posts', posts);

module.exports = router;