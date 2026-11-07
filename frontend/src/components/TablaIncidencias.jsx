import { useState } from 'react';

export default function TablaIncidencias({ incidencias, usuario, onCerrar }) {
  const [filtro, setFiltro] = useState('todas');

  const visibles = incidencias.filter((i) => filtro === 'todas' || i.estado === filtro);

  // Solo para mostrar u ocultar el botón. La seguridad real está en el backend.
  const puedeCerrar = (i) =>
    i.estado === 'abierta' && (usuario.rol === 'tecnico' || i.creador.id === usuario.id);

  return (
    <>
      <div className="filtros">
        {['todas', 'abierta', 'cerrada'].map((f) => (
          <button key={f} className={filtro === f ? 'primario' : ''} onClick={() => setFiltro(f)}>
            {f === 'todas' ? 'Todas' : f === 'abierta' ? 'Abiertas' : 'Cerradas'}
          </button>
        ))}
      </div>

      {visibles.length === 0 ? (
        <p>No hay incidencias.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Equipo</th>
                <th>Descripción</th>
                <th>Registró</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {visibles.map((i) => (
                <tr key={i.id}>
                  <td>{i.id}</td>
                  <td>{i.equipo.codigo}</td>
                  <td>{i.descripcion}</td>
                  <td>{i.creador.nombre}</td>
                  <td>
                    <span className={`estado ${i.estado}`}>{i.estado}</span>
                    {i.cerradoPor && <small style={{ display: 'block' }}>por {i.cerradoPor.nombre}</small>}
                  </td>
                  <td>
                    {puedeCerrar(i) && <button onClick={() => onCerrar(i.id)}>Cerrar</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
