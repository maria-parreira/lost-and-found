const userController = require('../../src/controllers/UserController');
const user = require('../../src/models/User');
jest.mock('../../src/models/User');


const generateToken = jest.fn();
userController.generateToken = generateToken;

describe('UserController', () => {

    describe('register', () => {
        it('should return 400 if user already exists', async () => {
            user.findOne.mockResolvedValue({ email: 'existing@agent.com' });

            const req = {
                body: {
                    username: 'Test',
                    email: 'existing@agent.com',
                    password: '123456',
                    role: 'agent'
                }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await userController.register(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'User already exists' });
        });



        it('should return 500 if there is an error during login', async () => {
            user.findOne.mockRejectedValue(new Error('Database error'));

            const req = {
                body: {
                    email: 'test@user.com',
                    password: '123456'
                }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await userController.login(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Error logging in' });
        });
    });
});
