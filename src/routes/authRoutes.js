const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { db } = require('../database/db');
const { authController } = require('../controllers/authController');
const authRoutes = express();

authRoutes.use(bodyParser.json());
authRoutes.use(cors());

authRoutes.post('/api/authenticate', (req, res) => {
    let data = req.body;
    authController.auth(res, data);
});

authRoutes.post('/api/register', async (req, res) => {
    let data = req.body;
    authController.register(res, data);
});

exports.authRoutes = authRoutes;
