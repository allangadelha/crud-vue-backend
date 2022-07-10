const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { userController } = require('../controllers/userController');
const usersRoutes = express();
const authMiddleware = require('../middlewares/auth');

usersRoutes.use(authMiddleware);

usersRoutes.use(bodyParser.json());
usersRoutes.use(cors());

usersRoutes.get('/api/users', (req, res) => {
    userController.getAllUser(res);
});

usersRoutes.get('/api/users/:id', (req, res) => {
    let { id } = req.params;
    userController.getUser(res, id);
});

usersRoutes.post('/api/users/register', async (req, res) => {
    let data = req.body;
    userController.addUser(res, data);
});

usersRoutes.put('/api/users/:id', (req, res) => {
    let { id } = req.params;
    let data = req.body;
    userController.updateUser(res, id, data);
});

usersRoutes.delete('/api/users/:id', (req, res) => {
    let { id } = req.params;
    userController.deleteUser(res, id);
});

exports.usersRoutes = usersRoutes;