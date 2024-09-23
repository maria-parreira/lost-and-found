const lostItem = require('../models/LostItem');



    async function getAllLostItems(req, res) {
        try {
            const items = await lostItem.find();
            res.status(200).json(items);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching lost items' });
        }
    }


    async function getItemById(req, res) {
        try {
            const id = req.params.id;
            const item = await lostItem.findById(id);

            if (!item) {
                return res.status(404).json({ error: 'Lost item not found' });
            }

            res.status(200).json(item);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching the lost item' });
        }
    }


    async function createLostItem(req, res) {
        try {
            const { description, foundDate, location, status } = req.body;

            if (!description || !foundDate || !location || !status) {
                return res.status(400).json({ error: 'Please provide all required fields' });
            }
            const newItem = new lostItem({
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


    async function deleteLostItem(req, res) {
        try {
            const id = req.params.id;
            const result = await lostItem.findByIdAndDelete(id);

            if (!result) {
                return res.status(404).json({ error: 'Lost item not found' });
            }

            res.status(200).json({ message: 'Lost item successfully deleted' });
        } catch (error) {
            res.status(500).json({ error: 'Error deleting the lost item' });
        }
    }


    async function searchLostItems(req, res) {
        try {
            const { description, location, status } = req.query;

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
            const items = await lostItem.find(query);
            res.status(200).json(items);
        } catch (error) {
            res.status(500).json({ error: 'Error searching for lost items' });
        }
    }




module.exports = {
    getAllLostItems,
    getItemById,
    createLostItem,
    deleteLostItem,
    searchLostItems
};
