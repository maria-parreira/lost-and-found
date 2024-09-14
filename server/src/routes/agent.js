const express = require('express');
const AgentController = require('../controllers/AgentController');

const router = express.Router();

router.post('/register', AgentController.register);

router.post('/login', AgentController.login);

module.exports = router;
