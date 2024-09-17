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
    static async getItemById(req, res) {
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
    static async createLostItem(req, res) {
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

    // DELETE /api/lost-items/:id
    static async deleteLostItem(req, res) {
        try {
            const id = req.params.id;
            const result = await LostItem.findByIdAndDelete(id);

            if (!result) {
                return res.status(404).json({ error: 'Lost item not found' });
            }

            res.status(200).json({ message: 'Lost item successfully deleted' });
        } catch (error) {
            res.status(500).json({ error: 'Error deleting the lost item' });
        }
    }

    // GET /api/passenger-lost-items
    static async searchLostItems(req, res) {
        try {
            const { description, location, status } = req.query;

            // Build the query object based on provided criteria
            const query = {};
            if (description) {
                query.description = new RegExp(description, 'i');
            }
            if (location) {
                query.location = new RegExp(location, 'i');
            }
            if (status) {
                query.status = status;
            }
            const items = await LostItem.find(query);
            res.status(200).json(items);
        } catch (error) {
            res.status(500).json({ error: 'Error searching for lost items' });
        }
    }


}

module.exports = LostItemController;
