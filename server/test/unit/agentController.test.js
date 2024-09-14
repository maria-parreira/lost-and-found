const AgentController = require('../../src/controllers/AgentController');
const Agent = require('../../src/models/Agent');

jest.mock('../../src/models/Agent'); // Mock do modelo Agent

// TEST REGISTER METHOD
describe('AgentController', () => {

    describe('register', () => {

        it('should return 400 if agent already exists', async () => {

            Agent.findOne.mockResolvedValue({ email: 'existing@agent.com' });


            const req = { body: { username: 'Test', email: 'existing@agent.com', password: '123456' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await AgentController.register(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Agent already exists' });
        });

        it('should return 201 if agent is created successfully', async () => {
            Agent.findOne.mockResolvedValue(null);
            Agent.create.mockResolvedValue({ _id: 'agentId', username: 'Test', email: 'test@agent.com' });

            const req = { body: { username: 'Test', email: 'test@agent.com', password: '123456' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await AgentController.register(req, res);

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

// TEST LOGIN METHOD



