const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Função para gerar um token JWT
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role }, // O token inclui o ID e o papel do usuário
        'yourSecretKey', // Substitua por sua chave secreta
        { expiresIn: '1h' } // Define o tempo de expiração do token
    );
};

class AuthController {
    // Registro (para ambos os tipos de usuário)
    static async register(req, res) {
        const { username, email, password, role } = req.body;
        try {
            // Verifica se o usuário já existe
            const userExists = await User.findOne({ email });
            if (userExists) {
                return res.status(400).json({ error: 'User already exists' });
            }

            // Cria um novo usuário
            const user = await User.create({ username, email, password, role });

            // Gera token JWT
            const token = generateToken(user);
            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,  // Inclui o papel no retorno
                token // Inclui o token JWT
            });
        } catch (error) {
            res.status(500).json({ error: 'Error registering user' });
        }
    }

    // Login (para ambos os tipos de usuário)
    static async login(req, res) {
        const { email, password } = req.body;
        try {
            // Verifica se o usuário existe
            const user = await User.findOne({ email });
            if (user && (await user.matchPassword(password))) {
                // Gera token JWT
                const token = generateToken(user);
                res.json({
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role,  // Inclui o papel no retorno
                    token // Inclui o token JWT
                });
            } else {
                res.status(401).json({ error: 'Invalid email or password' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error logging in' });
        }
    }
}

module.exports = AuthController;
