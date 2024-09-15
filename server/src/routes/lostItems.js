const express = require('express');
const LostItemController = require('../controllers/LostItemController');
const router = express.Router();
const { protect, authorizeAgent } = require('../middleware/authMiddleware');



router.get('/api/lost-items',protect, authorizeAgent, LostItemController.getAll);
router.get('/api/lost-items/:id',protect, authorizeAgent, LostItemController.getById);
router.post('/api/lost-items', protect, authorizeAgent,LostItemController.create);

module.exports = router;
