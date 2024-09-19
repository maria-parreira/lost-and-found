const express = require('express');
const lostItemController = require('../controllers/LostItemController');
const router = express.Router();
const { protect, authorizeAgent, authorizePassenger } = require('../middleware/authMiddleware');



router.get('/api/lost-items',protect, authorizeAgent, lostItemController.getAllLostItems);
router.get('/api/lost-items/:id',protect, authorizeAgent, lostItemController.getItemById);
router.post('/api/lost-items', protect, authorizeAgent,lostItemController.createLostItem);
router.delete('/api/lost-items/:id', protect, authorizeAgent,lostItemController.deleteLostItem);

// Route for passengers to search for lost items
router.get('/api/passenger-lost-items', protect, authorizePassenger, lostItemController.searchLostItems);



module.exports = router;
