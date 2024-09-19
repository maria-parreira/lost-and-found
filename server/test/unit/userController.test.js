const userController = require('../../src/controllers/UserController');
const agent = require('../../src/models/User');
jest.mock('../../src/models/User');


describe('UserController', () => {

    describe('register', () => {

        it('should return 400 if user already exists', async () => {

            agent.findOne.mockResolvedValue({ email: 'existing@agent.com' });
            const req = { body: { username: 'Test', email: 'existing@agent.com', password: '123456' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await userController.register(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'User already exists' });
        });

        it('should return 201 if agent is created successfully', async () => {
            agent.findOne.mockResolvedValue(null);
            agent.create.mockResolvedValue({ _id: 'agentId', username: 'Test', email: 'test@agent.com' });
            const req = { body: { username: 'Test', email: 'test@agent.com', password: '123456' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await userController.register(req, res);
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