const Agent = require('../models/Agent');
const jwt = require('jsonwebtoken');

class AgentController {

    // POST /api/agents/register
    static async register(req, res) {
        const { username, email, password } = req.body;
        try {
            // verify if email already exists
            const agentExists = await Agent.findOne({ email });
            if (agentExists) {
                return res.status(400).json({ error: 'Agent already exists' });
            }

            // create new user
            const agent = await Agent.create({ username, email, password });

            // cerate token JWT
            const token = AgentController.generateToken(agent._id);
            res.status(201).json({
                _id: agent._id,
                username: agent.username,
                email: agent.email,
                token
            });
        } catch (error) {
            res.status(500).json({ error: 'Error registering agent' });
        }
    }

    // POST /api/agents/login
    static async login(req, res) {
        const { email, password } = req.body;
        try {
            // verify if user already exists
            const agent = await Agent.findOne({ email });

            if (agent && (await agent.matchPassword(password))) {
                // create token JWT
                const token = AgentController.generateToken(agent._id);
                res.json({
                    _id: agent._id,
                    username: agent.username,
                    email: agent.email,
                    token
                });
            } else {
                res.status(401).json({ error: 'Invalid email or password' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error logging in agent' });
        }
    }

    // method to create token JWT
    static generateToken(id) {
        return jwt.sign({ id }, 'yourSecretKey', { expiresIn: '1h' });
    }
}

module.exports = AgentController;
