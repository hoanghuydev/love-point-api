const mongoose = require('mongoose');
const { Schema } = mongoose;
const mission = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, default: '' },
        point: { type: Number },
        status: { type: Number, default: 0 },
        urlProof: { type: String, default: '' },
    },
    { collection: 'mission', timestamps: true }
);
module.exports = mongoose.model('mission', mission);
