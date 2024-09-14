const express = require('express');
const LostItemController = require('../controllers/LostItemController');

const router = express.Router();

router.get('/api/lost-items', LostItemController.getAll);
router.get('/api/lost-items/:id', LostItemController.getById);
router.post('/api/lost-items', LostItemController.create);

module.exports = router;
