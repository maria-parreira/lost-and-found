const UserController = require('../../src/controllers/UserController');
const Agent = require('../../src/models/User');
jest.mock('../../src/models/User');


// TEST REGISTER METHOD
describe('UserController', () => {

    describe('register', () => {

        it('should return 400 if user already exists', async () => {

            Agent.findOne.mockResolvedValue({ email: 'existing@agent.com' });

            const req = { body: { username: 'Test', email: 'existing@agent.com', password: '123456' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await UserController.register(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'User already exists' });
        });

        it('should return 201 if agent is created successfully', async () => {
            Agent.findOne.mockResolvedValue(null);
            Agent.create.mockResolvedValue({ _id: 'agentId', username: 'Test', email: 'test@agent.com' });

            const req = { body: { username: 'Test', email: 'test@agent.com', password: '123456' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await UserController.register(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                _id: 'agentId',
                username: 'Test',
                email: 'test@agent.com',
                token: expect.any(String)
            });
        });
    });
});