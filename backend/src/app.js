const path = require('path');
const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { sequelize } = require('../models');

const app = express();
app.use(express.json());

// Sesión en cookie. El navegador solo guarda el id ("sid");
// los datos (id, nombre, rol) quedan en la tabla Sessions de la base.
const store = new SequelizeStore({
  db: sequelize,
  tableName: 'Sessions',
  checkExpirationInterval: process.env.NODE_ENV === 'test' ? 0 : 15 * 60 * 1000,
});

app.use(
  session({
    name: 'sid',
    secret: process.env.SESSION_SECRET || 'secreto_de_desarrollo',
    store,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,   // JavaScript del navegador no puede leerla
      sameSite: 'lax',
      secure: false,    // true solo con HTTPS
      maxAge: 1000 * 60 * 60 * 8, // 8 horas
    },
  })
);

app.use('/api/auth', require('./routes/auth'));
app.use('/api/equipos', require('./routes/equipos'));
app.use('/api/incidencias', require('./routes/incidencias'));

// Servir el frontend compilado (npm run build en frontend)
const dist = path.join(__dirname, '..', '..', 'frontend', 'dist');
app.use(express.static(dist));

app.use((err, req, res, next) => {
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: err.errors.map((e) => e.message).join(', ') });
  }
  console.error(err);
  res.status(500).json({ error: 'Error del servidor' });
});

app.locals.store = store;
module.exports = app;
