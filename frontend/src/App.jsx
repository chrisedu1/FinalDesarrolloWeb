import { useEffect, useState } from 'react';
import { api } from './api';
import Login from './components/Login';
import Panel from './components/Panel';

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Al abrir la página, pregunta al backend si ya hay sesión (la cookie viaja sola)
  useEffect(() => {
    api('/auth/yo')
      .then(setUsuario)
      .catch(() => setUsuario(null))
      .finally(() => setCargando(false));
  }, []);

  const salir = async () => {
    await api('/auth/logout', { method: 'POST' });
    setUsuario(null);
  };

  if (cargando) return <p style={{ padding: 24 }}>Cargando...</p>;
  if (!usuario) return <Login onLogin={setUsuario} />;

  return (
    <>
      <header className="cabecera">
        <h1>Incidencias del laboratorio</h1>
        <div>
          {usuario.nombre}
          <span className="rol">{usuario.rol}</span>{' '}
          <button onClick={salir}>Cerrar sesión</button>
        </div>
      </header>
      <Panel usuario={usuario} onSesionVencida={() => setUsuario(null)} />
    </>
  );
}
