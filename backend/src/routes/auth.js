const { Router } = require('express');
const bcrypt = require('bcryptjs');
const { Usuario } = require('../../models');

const router = Router();

//POST
router.post('/login', async (req, res, next) => {
  const { usuario, password } = req.body;
  const encontrado = await Usuario.findOne({ where: { usuario: usuario || '' } });

  if (!encontrado || !(await bcrypt.compare(password || '', encontrado.password))) {
    return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
  }


  req.session.regenerate((err) => {
    if (err) return next(err);
    req.session.usuario = { id: encontrado.id, nombre: encontrado.nombre, rol: encontrado.rol };
    res.json(req.session.usuario);
  });
});

// GET
router.get('/yo', (req, res) => {
  if (!req.session.usuario) return res.status(401).json({ error: 'Sin sesión' });
  res.json(req.session.usuario);
});

// POST
router.post('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.clearCookie('sid');
    res.json({ mensaje: 'Sesión cerrada' });
  });
});

module.exports = router;
