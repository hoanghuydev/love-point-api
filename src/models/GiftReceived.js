const mongoose = require('mongoose');
const { Schema } = mongoose;
const giftReceived = new Schema(
    {
        title: { type: String, required: true, minLength: 1 },
        image: { type: String, required: true, minLength: 1 },
        point: { type: Number, default: 1 },
    },
    { collection: 'giftReceived', timestamps: true }
);
module.exports = mongoose.model('giftReceived', giftReceived);
