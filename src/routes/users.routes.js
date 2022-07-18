const express = require('express');
const router = express.Router();

// Middleware
const auth = require('../middlewares/auth.middleware');

// Controllers
const users = require('../controllers/users.controller');

// Users Routes
router.post('/', users.create);
router.post('/login', users.login);
router.delete('/:id', users.delete);
router.patch('/:id/activate', users.activate);

module.exports = router;