const { usersRoutes } = require('./routes/usersRoutes');
const { clientsRoutes } = require('./routes/clientsRoutes');
const { authRoutes } = require('./routes/authRoutes');
require('dotenv').config();

authRoutes.use(usersRoutes);
authRoutes.use(clientsRoutes);

const PORT = process.env.PROJECT_PORT || 3001;

authRoutes.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
