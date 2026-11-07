import { useEffect, useState } from 'react';
import { api } from '../api';
import FormIncidencia from './FormIncidencia';
import TablaIncidencias from './TablaIncidencias';

export default function Panel({ usuario, onSesionVencida }) {
  const [equipos, setEquipos] = useState([]);
  const [incidencias, setIncidencias] = useState([]);
  const [error, setError] = useState('');

  const manejarError = (err) => {
    if (err.status === 401) return onSesionVencida(); // la sesión expiró
    setError(err.message);
  };

  const cargarIncidencias = () => api('/incidencias').then(setIncidencias).catch(manejarError);

  useEffect(() => {
    api('/equipos').then(setEquipos).catch(manejarError);
    cargarIncidencias();
  }, []);

  const cerrar = async (id) => {
    setError('');
    try {
      const actualizada = await api(`/incidencias/${id}/cerrar`, { method: 'PATCH' });
      setIncidencias(incidencias.map((i) => (i.id === id ? actualizada : i)));
    } catch (err) {
      manejarError(err); // si el backend dice 403, aquí se muestra el mensaje
    }
  };

  return (
    <div className="contenedor">
      <aside className="panel">
        <h2>Equipos</h2>
        <ul className="equipos">
          {equipos.map((e) => (
            <li key={e.id}>
              <strong>{e.codigo}</strong> {e.descripcion}
              <small>{e.ubicacion}</small>
            </li>
          ))}
        </ul>
        <FormIncidencia equipos={equipos} onCreada={(nueva) => setIncidencias([nueva, ...incidencias])} />
      </aside>

      <section className="panel">
        <h2>Incidencias</h2>
        {error && <p className="error">{error}</p>}
        <TablaIncidencias incidencias={incidencias} usuario={usuario} onCerrar={cerrar} />
      </section>
    </div>
  );
}
