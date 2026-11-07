import { useState } from 'react';
import { api } from '../api';

export default function FormIncidencia({ equipos, onCreada }) {
  const [equipoId, setEquipoId] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

  const registrar = async (e) => {
    e.preventDefault();
    try {
      const nueva = await api('/incidencias', {
        method: 'POST',
        body: { equipoId: Number(equipoId), descripcion },
      });
      onCreada(nueva);
      setEquipoId('');
      setDescripcion('');
      setMensaje({ tipo: 'exito', texto: 'Incidencia registrada' });
    } catch (err) {
      setMensaje({ tipo: 'error', texto: err.message });
    }
  };

  return (
    <form onSubmit={registrar}>
      <h2>Registrar incidencia</h2>
      <div className="campo">
        <label htmlFor="equipo">Equipo</label>
        <select id="equipo" value={equipoId} onChange={(e) => setEquipoId(e.target.value)} required>
          <option value="">Selecciona un equipo</option>
          {equipos.map((eq) => (
            <option key={eq.id} value={eq.id}>{eq.codigo} - {eq.descripcion}</option>
          ))}
        </select>
      </div>
      <div className="campo">
        <label htmlFor="descripcion">Descripción</label>
        <textarea id="descripcion" rows="3" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
      </div>
      {mensaje.texto && <p className={mensaje.tipo}>{mensaje.texto}</p>}
      <button className="primario" type="submit">Registrar</button>
    </form>
  );
}
