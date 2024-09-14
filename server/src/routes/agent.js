const express = require('express');
const AgentController = require('../controllers/AgentController');

const router = express.Router();

// Rota para registrar novo agente
router.post('/register', AgentController.register);

// Rota para login de agente
router.post('/login', AgentController.login);

module.exports = router;
