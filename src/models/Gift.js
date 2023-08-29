const mongoose = require('mongoose');
const { Schema } = mongoose;
const gift = new Schema(
    {
        title: { type: String, required: true, minLength: 1 },
        image: { type: String, required: true, minLength: 1 },
        point: { type: Number, default: 1 },
    },
    { collection: 'gift', timestamps: true }
);
module.exports = mongoose.model('gift', gift);
