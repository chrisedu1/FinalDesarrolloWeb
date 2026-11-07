const { Router } = require('express');
const { Incidencia, Equipo, Usuario } = require('../../models');
const { requiereSesion } = require('../middlewares/auth');

const router = Router();
router.use(requiereSesion); // todas las rutas de incidencias necesitan sesión

const incluir = [
  { model: Equipo, as: 'equipo', attributes: ['id', 'codigo', 'descripcion'] },
  { model: Usuario, as: 'creador', attributes: ['id', 'nombre'] },
  { model: Usuario, as: 'cerradoPor', attributes: ['id', 'nombre'] },
];

// GET /api/incidencias
router.get('/', async (req, res) => {
  const incidencias = await Incidencia.findAll({ include: incluir, order: [['id', 'DESC']] });
  res.json(incidencias);
});

// POST /api/incidencias  { equipoId, descripcion }
router.post('/', async (req, res) => {
  const { equipoId, descripcion } = req.body;
  if (!equipoId || !descripcion || !descripcion.trim()) {
    return res.status(400).json({ error: 'Equipo y descripción son obligatorios' });
  }
  const equipo = await Equipo.findByPk(equipoId);
  if (!equipo) return res.status(400).json({ error: 'El equipo no existe' });

  // El creador sale de la sesión, no del body
  const nueva = await Incidencia.create({
    equipoId,
    descripcion: descripcion.trim(),
    usuarioId: req.session.usuario.id,
  });
  res.status(201).json(await Incidencia.findByPk(nueva.id, { include: incluir }));
});

// PATCH /api/incidencias/:id/cerrar
// Regla: solo la puede cerrar quien la registró o un técnico. Se verifica AQUÍ, en el backend.
router.patch('/:id/cerrar', async (req, res) => {
  const incidencia = await Incidencia.findByPk(req.params.id);
  if (!incidencia) return res.status(404).json({ error: 'Incidencia no encontrada' });

  const { id, rol } = req.session.usuario;
  const esCreador = incidencia.usuarioId === id;
  const esTecnico = rol === 'tecnico';

  if (!esCreador && !esTecnico) {
    return res.status(403).json({ error: 'Solo quien la registró o un técnico puede cerrarla' });
  }
  if (incidencia.estado === 'cerrada') {
    return res.status(409).json({ error: 'La incidencia ya está cerrada' });
  }

  await incidencia.update({ estado: 'cerrada', fechaCierre: new Date(), cerradaPorId: id });
  res.json(await Incidencia.findByPk(incidencia.id, { include: incluir }));
});

module.exports = router;
