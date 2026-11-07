require('dotenv').config({ quiet: true });

const base = {
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || null,
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  dialect: 'postgres',
  logging: false,
};

const nombre = process.env.DB_NAME || 'incidencias_lab';

module.exports = {
  development: { ...base, database: nombre },
  test: { ...base, database: `${nombre}_test` },
  production: { ...base, database: nombre },
};
