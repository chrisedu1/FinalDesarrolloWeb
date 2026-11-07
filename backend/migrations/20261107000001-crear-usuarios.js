'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('usuarios', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      nombre: { type: Sequelize.STRING, allowNull: false },
      usuario: { type: Sequelize.STRING, allowNull: false, unique: true },
      password: { type: Sequelize.STRING, allowNull: false },
      rol: { type: Sequelize.ENUM('usuario', 'tecnico'), allowNull: false, defaultValue: 'usuario' },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('usuarios');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_usuarios_rol";');
  },
};
