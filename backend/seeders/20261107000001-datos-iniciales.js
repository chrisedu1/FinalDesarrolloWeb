'use strict';
const bcrypt = require('bcryptjs');

// Usuarios de prueba (contraseña de todos: 123456) y equipos del laboratorio
module.exports = {
  async up(queryInterface) {
    const ahora = new Date();
    const hash = await bcrypt.hash('123456', 10);

    await queryInterface.bulkInsert('usuarios', [
      { nombre: 'Ana López', usuario: 'ana', password: hash, rol: 'usuario', createdAt: ahora, updatedAt: ahora },
      { nombre: 'Luis Pérez', usuario: 'luis', password: hash, rol: 'usuario', createdAt: ahora, updatedAt: ahora },
      { nombre: 'Marta Ruiz (Técnico)', usuario: 'tecnico', password: hash, rol: 'tecnico', createdAt: ahora, updatedAt: ahora },
    ]);

    await queryInterface.bulkInsert('equipos', [
      { codigo: 'PC-01', descripcion: 'Computadora Dell OptiPlex', ubicacion: 'Laboratorio 1', createdAt: ahora, updatedAt: ahora },
      { codigo: 'PC-02', descripcion: 'Computadora HP ProDesk', ubicacion: 'Laboratorio 1', createdAt: ahora, updatedAt: ahora },
      { codigo: 'PC-03', descripcion: 'Computadora Lenovo ThinkCentre', ubicacion: 'Laboratorio 2', createdAt: ahora, updatedAt: ahora },
      { codigo: 'PRY-01', descripcion: 'Proyector Epson', ubicacion: 'Laboratorio 1', createdAt: ahora, updatedAt: ahora },
      { codigo: 'IMP-01', descripcion: 'Impresora Canon', ubicacion: 'Laboratorio 2', createdAt: ahora, updatedAt: ahora },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('equipos', null, {});
    await queryInterface.bulkDelete('usuarios', null, {});
  },
};
