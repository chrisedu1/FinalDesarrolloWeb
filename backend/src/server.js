const app = require('./app');
const { sequelize } = require('../models');

const PORT = process.env.PORT || 3000;

sequelize
  .authenticate()
  .then(() => app.listen(PORT, () => console.log(`API lista en http://localhost:${PORT}`)))
  .catch((err) => {
    console.error('No se pudo conectar a la base de datos. Revisa tu archivo .env');
    console.error(err.message);
    process.exit(1);
  });
