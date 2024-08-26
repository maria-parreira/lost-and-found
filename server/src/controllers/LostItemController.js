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
}

module.exports = LostItemController;
