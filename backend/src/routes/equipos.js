const { Router } = require('express');
const { Equipo } = require('../../models');
const { requiereSesion } = require('../middlewares/auth');

const router = Router();

router.get('/', requiereSesion, async (req, res) => {
  res.json(await Equipo.findAll({ order: [['codigo', 'ASC']] }));
});

module.exports = router;
