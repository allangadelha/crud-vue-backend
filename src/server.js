const { usersRoutes } = require('./routes/usersRoutes');
const { clientsRoutes } = require('./routes/clientsRoutes');
const { authRoutes } = require('./routes/authRoutes');
require('dotenv').config();

authRoutes.use(usersRoutes);
authRoutes.use(clientsRoutes);

const PORT = process.env.PORT || 3001;

authRoutes.listen(PORT, console.log(`Rodando na porta ${PORT}`));

