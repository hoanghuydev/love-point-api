const mongoose = require('mongoose');
const { Schema } = mongoose;
const user = new Schema(
    {
        username: { type: String, required: true, minLength: 6, unique: true },
        password: { type: String, minLength: 6 },
        point: { type: Number, default: 0 },
        admin: { type: Boolean, default: false },
    },
    { collection: 'user', timestamps: true }
);
module.exports = mongoose.model('user', user);
