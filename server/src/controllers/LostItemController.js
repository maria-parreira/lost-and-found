// This controller will be responsible for handle received requests


const LostItem = require('../models/LostItem'); //importing the LostItem model into the current file

class LostItemController {

    // GET /api/lost-items
    static async getAll(req, res) {
        try {
            const items = await LostItem.find();
            res.status(200).json(items);
        } catch (error) {
            res.status(500).json({error: 'Error fetching lost items'});
        }
    }

    // GET /api/lost-items/:id
    static async getById(req, res) {
        try {
            const id = req.params.id;
            const item = await LostItem.findById(id);

            if (!item) {
                return res.status(404).json({error: 'Lost item not found'});
            }

            res.status(200).json(item);
        } catch (error) {
            res.status(500).json({error: 'Error fetching the lost item'});
        }
    }
}

module.exports = LostItemController;
