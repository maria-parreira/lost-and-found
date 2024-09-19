const request = require('supertest');
const app = require('../../../app');
const lostItem = require("../../src/models/LostItem");


describe('Users Routes', () => {

    let testItemId;
    beforeAll(async () => {});
    afterEach(async () => {await lostItem.deleteMany({});});


    describe('POST /api/users/register', () => {

        it('should return 400 if agent already exists', async () => {

            await request(app)
                .post('/api/users/register')
                .send({
                    username: 'Test Agent',
                    email: 'test@agent.com',
                    password: 'password123',
                    role:'agent'
                });


            const response = await request(app)
                .post('/api/users/register')
                .send({
                    username: 'Test Agent',
                    email: 'test@agent.com',
                    password: 'password123',
                    role:'passenger'
                });

            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty('error', 'User already exists');
        });
    });


});