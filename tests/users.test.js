// App Import
const app = require('../src/index');

// SuperTest Import
const request = require('supertest');

let id;

describe(' POST /api/users', () => {
	
	test('should respond with an User ID', async () => {
		const response = await request(app).post('/api/users').send({
			name: 'test', 
			email: 'test@test.com', 
			password: '1234', 
			bio: 'Is a test'
		});
		expect(response.body.id).toBeDefined();
		id = response.body.id;
	});
});

describe(' PATCH /api/users/:id/activate', () => {
	
	test('should respond with a 200 status code header', async () => {
		const response = await request(app).patch('/api/users/' + id + '/activate').send();
		expect(response.statusCode).toBe(200);
	});
});


describe(' POST /api/users/login', () => {
	
	test('should respond with a json response header', async () => {
		const response = await request(app).post('/api/users/login').send({
			email: 'test@test.com',
			password: '1234'
		});
		expect(response.body).toHaveProperty('access_token');
	});
});