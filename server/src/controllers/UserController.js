const User = require('../models/User');
const jwt = require('jsonwebtoken');


const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        'yourSecretKey',
        { expiresIn: '1h' }
    );
};


    async function register(req, res) {
        const { username, email, password, role } = req.body;
        try {

            const userExists = await User.findOne({ email });
            if (userExists) {
                return res.status(400).json({ error: 'User already exists' });
            }

            const user = await User.create({ username, email, password, role });
            const token = generateToken(user);
            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                token
            });
        } catch (error) {
            res.status(500).json({ error: 'Error registering user' });
        }
    }


    async function login(req, res) {
        const {email, password} = req.body;
        try {

            const user = await User.findOne({email});
            if (user && (await user.matchPassword(password))) {

                const token = generateToken(user);
                res.json({
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    token
                });
            } else {
                res.status(401).json({error: 'Invalid email or password'});
            }
        } catch (error) {
            res.status(500).json({error: 'Error logging in'});
        }

    }

module.exports = AuthController;
