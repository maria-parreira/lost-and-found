const mongoose = require('mongoose');

const LostItemSchema = new mongoose.Schema({
    description: { type: String, required: true},
    foundDate: {type: Date, required: true},
    location: {type: String, required: true},
    status: {type: String, enum: ['found', 'claimed'], default: 'found', required: true}
},);

module.exports = mongoose.model('LostItem', LostItemSchema);
