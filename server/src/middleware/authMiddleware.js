const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware de proteção (autenticação)
const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extrair o token da autorização
            token = req.headers.authorization.split(' ')[1];

            // Verificar o token JWT
            const decoded = jwt.verify(token, 'yourSecretKey'); // Substituir pela sua chave secreta

            // Buscar o usuário associado ao token
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

// Middleware para garantir que o usuário seja um agente
const authorizeAgent = (req, res, next) => {
    if (req.user && req.user.role === 'agent') {
        return next();
    }
    return res.status(403).json({ error: 'Access forbidden: Only agents can perform this action' });
};

// Middleware para garantir que o usuário seja um passageiro
const authorizePassenger = (req, res, next) => {
    if (req.user && req.user.role === 'passenger') {
        return next();
    }
    return res.status(403).json({ error: 'Access forbidden: Only passengers can perform this action' });
};

module.exports = { protect, authorizeAgent, authorizePassenger };
