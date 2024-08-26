const express = require('express');
const LostItemController = require('../controllers/LostItemController');

const router = express.Router();

// Rota para listar todos os itens perdidos
router.get('/api/lost-items', LostItemController.getAll);


module.exports = router;
