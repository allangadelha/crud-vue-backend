const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        unique: true,
        require: true,
        lowercase: true
    },

    password: {
        type: String,
        require: true,
        select: false
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

const User = mongoose.model('User', UserSchema);

module.exports = User;