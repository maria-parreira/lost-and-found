const LostItem = require('../models/LostItem');

class LostItemController {

    // GET /api/lost-items
    static async getAllLostItems(req, res) {
        try {
            const items = await LostItem.find();
            res.status(200).json(items);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching lost items' });
        }
    }

    // GET /api/lost-items/:id
    static async getByItemById(req, res) {
        try {
            const id = req.params.id;
            const item = await LostItem.findById(id);

            if (!item) {
                return res.status(404).json({ error: 'Lost item not found' });
            }

            res.status(200).json(item);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching the lost item' });
        }
    }

    // POST /api/lost-items
    static async create(req, res) {
        try {
            const { description, foundDate, location, status } = req.body;

            if (!description || !foundDate || !location || !status) {
                return res.status(400).json({ error: 'Please provide all required fields' });
            }
            const newItem = new LostItem({
                description,
                foundDate,
                location,
                status
            });
            const savedItem = await newItem.save();

            res.status(201).json(savedItem);
        } catch (error) {
            res.status(500).json({ error: 'Error creating the lost item' });
        }
    }
}

module.exports = LostItemController;
