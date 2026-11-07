// Exige que haya una sesión iniciada
function requiereSesion(req, res, next) {
  if (!req.session.usuario) {
    return res.status(401).json({ error: 'Debes iniciar sesión' });
  }
  next();
}

// Exige un rol específico (por si alguna ruta es solo para técnicos)
function requiereRol(rol) {
  return (req, res, next) => {
    if (req.session.usuario?.rol !== rol) {
      return res.status(403).json({ error: 'No tienes permiso' });
    }
    next();
  };
}

module.exports = { requiereSesion, requiereRol };