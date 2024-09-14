const jwt = require('jsonwebtoken');
const Agent = require('../models/Agent');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // get token
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, 'yourSecretKey'); // same used to create the token

            // obtain the authenticated agent
            req.agent = await Agent.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            res.status(401).json({ error: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ error: 'Not authorized, no token' });
    }
};

module.exports = protect;
