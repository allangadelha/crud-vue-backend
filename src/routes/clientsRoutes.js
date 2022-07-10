const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { clientController } = require('../controllers/clientController');
const authMiddleware = require('../middlewares/auth');
const clientsRoutes = express();

clientsRoutes.use(authMiddleware);

clientsRoutes.use(bodyParser.json());
clientsRoutes.use(cors());

clientsRoutes.get('/api/clients', (req, res) => {
    clientController.getAllClient(res);
});

clientsRoutes.get('/api/clients/:id', (req, res) => {
    let { id } = req.params;
    clientController.getClient(res, id);
});

clientsRoutes.post('/api/clients', (req, res) => {
    let data = req.body;
    clientController.addClient(res, data);
});

clientsRoutes.put('/api/clients/:id', (req, res) => {
    let { id } = req.params;
    let data = req.body;
    clientController.updateClient(res, id, data);
});

clientsRoutes.delete('/api/clients/:id', (req, res) => {
    let { id } = req.params;
    clientController.deleteClient(res, id);
});

exports.clientsRoutes = clientsRoutes;

