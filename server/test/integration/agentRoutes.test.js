const request = require('supertest');
const app = require('../../../app');

// TEST FOR REGISTER METHOD
describe('Agent Routes', () => {

    // create new agent , not an existent one
    describe('POST /api/agents/register', () => {
        it('should register a new agent', async () => {
            const response = await request(app)
                .post('/api/agents/register')
                .send({
                    username: 'Test Agent',
                    email: 'test@agent.com',
                    password: 'password123'
                });

            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty('token');
        });

        //try to create agent that already exists
        it('should return 400 if agent already exists', async () => {

            await request(app)
                .post('/api/agents/register')
                .send({
                    username: 'Test Agent',
                    email: 'test@agent.com',
                    password: 'password123'
                });


            const response = await request(app)
                .post('/api/agents/register')
                .send({
                    username: 'Test Agent',
                    email: 'test@agent.com',
                    password: 'password123'
                });

            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty('error', 'Agent already exists');
        });
    });

    // TEST LOGIN METHOD
    describe('POST /api/agents/login', () => {

        // try to login an inexistent agent
        it('should log in an existing agent', async () => {
            await request(app)
                .post('/api/agents/register')
                .send({
                    username: 'Test Agent',
                    email: 'testlogin@agent.com',
                    password: 'password123'
                });

            const response = await request(app)
                .post('/api/agents/login')
                .send({
                    email: 'testlogin@agent.com',
                    password: 'password123'
                });

            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('token');
        });

        // try login with invalid credentials
        it('should return 401 if login credentials are invalid', async () => {
            const response = await request(app)
                .post('/api/agents/login')
                .send({
                    email: 'wrong@agent.com',
                    password: 'wrongpassword'
                });

            expect(response.statusCode).toBe(401);
            expect(response.body).toHaveProperty('error', 'Invalid email or password');
        });
    });
});
