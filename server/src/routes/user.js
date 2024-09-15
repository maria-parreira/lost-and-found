const express = require('express');
const AgentController = require('../controllers/UserController');

const router = express.Router();

router.post('/register', AgentController.register);

router.post('/login', AgentController.login);

module.exports = router;
