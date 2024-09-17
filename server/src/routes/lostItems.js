const express = require('express');
const LostItemController = require('../controllers/LostItemController');
const router = express.Router();
const { protect, authorizeAgent } = require('../middleware/authMiddleware');



router.get('/api/lost-items',protect, authorizeAgent, LostItemController.getAllLostItems);
router.get('/api/lost-items/:id',protect, authorizeAgent, LostItemController.getItemById);
router.post('/api/lost-items', protect, authorizeAgent,LostItemController.createLostItem);

module.exports = router;
