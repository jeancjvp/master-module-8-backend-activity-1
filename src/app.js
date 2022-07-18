// App Import
const app = require('./index');

// Global Variables
const port = process.env.PORT || 8000;
const host = process.env.HOST || '127.0.0.1';

// Server
app.listen(port, host, () => {
	console.log('Running on port ' + port);
});