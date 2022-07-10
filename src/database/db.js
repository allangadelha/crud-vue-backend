const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

class DBController {
    constructor() {
        this.connect();
    }

    async connect() {
        try {
            await mongoose.connect(MONGO_URI, {
                useNewUrlParser: true
            });
            console.log("Conectado a base de dados.");
        } catch (err) {
            console.error(err);
            mongoose.close();
        }
    }
}

exports.db = new DBController();