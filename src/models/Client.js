const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
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

    cpf: {
        type: String,
        unique: true,
        require: true
    },

    phone: {
        type: String,
        require: true
    },

    address: {
        type: String,
        require: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;