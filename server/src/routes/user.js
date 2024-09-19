const express = require('express');
const agentController = require('../controllers/UserController');

const router = express.Router();

router.post('/register', agentController.register);

router.post('/login', agentController.login);

module.exports = router;
