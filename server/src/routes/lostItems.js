const express = require('express');
const LostItemController = require('../controllers/LostItemController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/api/lost-items', LostItemController.getAll);
router.get('/api/lost-items/:id',LostItemController.getById);
router.post('/api/lost-items',protect, LostItemController.create);

module.exports = router;
