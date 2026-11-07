const { Sequelize, DataTypes } = require('sequelize');
const entorno = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[entorno];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const Usuario = sequelize.define(
  'Usuario',
  {
    nombre: { type: DataTypes.STRING, allowNull: false },
    usuario: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false }, // hash de bcrypt
    rol: { type: DataTypes.ENUM('usuario', 'tecnico'), allowNull: false, defaultValue: 'usuario' },
  },
  { tableName: 'usuarios' }
);

const Equipo = sequelize.define(
  'Equipo',
  {
    codigo: { type: DataTypes.STRING, allowNull: false, unique: true },
    descripcion: { type: DataTypes.STRING, allowNull: false },
    ubicacion: { type: DataTypes.STRING },
  },
  { tableName: 'equipos' }
);

const Incidencia = sequelize.define(
  'Incidencia',
  {
    descripcion: { type: DataTypes.TEXT, allowNull: false, validate: { notEmpty: true } },
    estado: { type: DataTypes.ENUM('abierta', 'cerrada'), allowNull: false, defaultValue: 'abierta' },
    fechaCierre: { type: DataTypes.DATE },
  },
  { tableName: 'incidencias' }
);

// Relaciones
Incidencia.belongsTo(Equipo, { as: 'equipo', foreignKey: { name: 'equipoId', allowNull: false } });
Incidencia.belongsTo(Usuario, { as: 'creador', foreignKey: { name: 'usuarioId', allowNull: false } });
Incidencia.belongsTo(Usuario, { as: 'cerradoPor', foreignKey: 'cerradaPorId' });
Equipo.hasMany(Incidencia, { foreignKey: 'equipoId' });
Usuario.hasMany(Incidencia, { foreignKey: 'usuarioId' });

module.exports = { sequelize, Sequelize, Usuario, Equipo, Incidencia };
