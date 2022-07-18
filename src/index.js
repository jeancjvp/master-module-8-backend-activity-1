// Env
require('dotenv').config();

// Import Middlewares
const morgan = require('morgan');
const mongoose = require('mongoose');
const createError = require('http-errors');

// Routes
const routes = require('./routes/index.routes');

// App
const express = require('express');
const app = express();

// Configs
require('./config/db.config');

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', routes);

// If Route is not handle by the List of Routes
app.use((req, res, next) => {
	next(createError.NotFound());
});

// Error Handling
app.use((err, req, res, next) => {
	// Entry params
	const status  = err.status  || 400;
	const message = err.message || 'Bad Request';

	res.status(status);
	res.json({ 
		status: status,
		message: message
	});
});

module.exports = app;