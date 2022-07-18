const express = require('express');
const router = express.Router();

// Middleware
const auth = require('../middlewares/auth.middleware');

// Controllers
const posts = require('../controllers/posts.controller');

// Posts Routes
router.get('/', auth.checkAuth, posts.list);
router.post('/', auth.checkAuth, posts.create);
router.get('/:id', auth.checkAuth, posts.detail);
router.patch('/:id', auth.checkAuth, posts.update);
router.delete('/:id', auth.checkAuth, posts.delete);

module.exports = router;