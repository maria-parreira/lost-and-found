const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 Middleware protect

 The protect middleware ensures that only authenticated users can access certain routes.
 It does this by checking for the presence and validity of a JWT (JSON Web Token) in the request.

 Here’s what it does:

 Token Verification:
 The middleware checks if the request header contains a JWT token in the format Bearer <token>.
 If the token is present, it extracts it and attempts to verify it using the secret key ('yourSecretKey'), which is used to sign and verify the JWT.

 User Decoding and Authentication:
 After verifying the token, the middleware decodes it to get the user ID.
 It uses this ID to find the corresponding user in the database, excluding the password field (select('-password')).
 If the user is not found, it returns a 401 (unauthorized) error.

 Middleware authorizeAgent and authorizePassenger
 These two middlewares are used to authorize access based on the user's role:

 authorizeAgent:
 Checks if the authenticated user (req.user) has the role of 'agent'.
 If so, it allows the request to proceed with next().
 If not, it returns a 403 (forbidden) error.

 authorizePassenger:
 Checks if the authenticated user (req.user) has the role of 'passenger'.
 If so, it allows the request to proceed with next().
 If not, it returns a 403 (forbidden) error.
 */

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {

            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, 'yourSecretKey');
            req.user = await User.findById(decoded.id).select('-password');
            if (!req.user) {
                return res.status(401).json({ error: 'User not found' });
            }
            next();
        } catch (error) {
            return res.status(401).json({ error: 'Not authorized, token failed' });
        }
    } else {
        return res.status(401).json({ error: 'Not authorized, no token' });
    }
};


const authorizeAgent = (req, res, next) => {
    if (req.user && req.user.role === 'agent') {
        return next();
    }
    return res.status(403).json({ error: 'Access forbidden: Only agents can perform this action' });
};


const authorizePassenger = (req, res, next) => {
    if (req.user && req.user.role === 'passenger') {
        return next();
    }
    return res.status(403).json({ error: 'Access forbidden: Only passengers can perform this action' });
};

module.exports = { protect, authorizeAgent, authorizePassenger };
