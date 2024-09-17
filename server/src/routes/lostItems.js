const express = require('express');
const LostItemController = require('../controllers/LostItemController');
const router = express.Router();
const { protect, authorizeAgent, authorizePassenger } = require('../middleware/authMiddleware');



router.get('/api/lost-items',protect, authorizeAgent, LostItemController.getAllLostItems);
router.get('/api/lost-items/:id',protect, authorizeAgent, LostItemController.getItemById);
router.post('/api/lost-items', protect, authorizeAgent,LostItemController.createLostItem);
router.delete('/api/lost-items/:id', protect, authorizeAgent,LostItemController.deleteLostItem);

// Route for passengers to search for lost items
router.get('/api/passenger-lost-items', protect, authorizePassenger, LostItemController.searchLostItems);



module.exports = router;
