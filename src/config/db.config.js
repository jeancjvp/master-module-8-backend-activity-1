const mongoose = require('mongoose');
const MongoServer = require('mongodb-memory-server').MongoMemoryServer;

MongoServer.create().then((mongoServer) => 
	mongoose
		.connect(mongoServer.getUri(), {
			dbName: 'express-crud',
		})
		.then(() => {
			console.info('Connected to Database');
		})
		.catch((err) => {
			console.error('Error connecting to Database: ', err);
		})
);

process.on('SIGINT', () => {
	mongoose.disconnect();
});