const { register, login } = require('../../src/controllers/UserController');
const User = require('../../src/models/User');
const jwt = require('jsonwebtoken');
const sinon = require('sinon');
/*
describe('User Controller', () => {

    describe('register', () => {


        it('should register a new user', async () => {
            //  Arrange
            req.body = {
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
                role: 'user'
            };
            
            const mockUser = {
                _id: '12345',
                username: 'testuser',
                email: 'test@example.com',
                role: 'user'
            };

            sandbox.stub(User, 'findOne').resolves(null);
            sandbox.stub(User, 'create').resolves(mockUser);

            await register(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                _id: '12345',
                username: 'testuser',
                email: 'test@example.com',
                role: 'user'
            });
        });

        it('should return an error if user already exists', async () => {
            req.body = { email: 'test@example.com' };

            sandbox.stub(User, 'findOne').resolves({ email: 'test@example.com' });

            await register(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'User already exists' });
        });
    });

    describe('login', () => {
        it('should login user and return token', async () => {
            req.body = {
                email: 'test@example.com',
                password: 'password123'
            };

            const mockUser = {
                _id: '12345',
                username: 'testuser',
                email: 'test@example.com',
                role: 'user',
                matchPassword: jest.fn().mockResolvedValue(true)
            };

            sandbox.stub(User, 'findOne').resolves(mockUser);

            const mockToken = 'mockedToken123';
            sandbox.stub(jwt, 'sign').returns(mockToken); // Faz o mock do JWT

            await login(req, res);

            expect(res.json).toHaveBeenCalledWith({
                _id: '12345',
                username: 'testuser',
                email: 'test@example.com',
                role: 'user',
                token: mockToken
            });
        });

        it('should return error if password is incorrect', async () => {
            req.body = {
                email: 'test@example.com',
                password: 'wrongpassword'
            };

            const mockUser = {
                _id: '12345',
                matchPassword: jest.fn().mockResolvedValue(false)
            };

            sandbox.stub(User, 'findOne').resolves(mockUser);

            await login(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ error: 'Invalid email or password' });
        });

        it('should return error if user is not found', async () => {
            req.body = {
                email: 'nonexistent@example.com',
                password: 'password123'
            };

            sandbox.stub(User, 'findOne').resolves(null);

            await login(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ error: 'Invalid email or password' });
        });
    });
});

 */
