'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('incidencias', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      descripcion: { type: Sequelize.TEXT, allowNull: false },
      estado: { type: Sequelize.ENUM('abierta', 'cerrada'), allowNull: false, defaultValue: 'abierta' },
      fechaCierre: { type: Sequelize.DATE },
      equipoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'equipos', key: 'id' },
        onDelete: 'CASCADE',
      },
      usuarioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'usuarios', key: 'id' },
        onDelete: 'CASCADE',
      },
      cerradaPorId: {
        type: Sequelize.INTEGER,
        references: { model: 'usuarios', key: 'id' },
        onDelete: 'SET NULL',
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('incidencias');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_incidencias_estado";');
  },
};
