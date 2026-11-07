import { useState } from 'react';
import { api } from '../api';

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ usuario: '', password: '' });
  const [error, setError] = useState('');

  const cambiar = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const entrar = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const usuario = await api('/auth/login', { method: 'POST', body: form });
      onLogin(usuario);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="panel login">
      <h2>Iniciar sesión</h2>
      <form onSubmit={entrar}>
        <div className="campo">
          <label htmlFor="usuario">Usuario</label>
          <input id="usuario" name="usuario" value={form.usuario} onChange={cambiar} required />
        </div>
        <div className="campo">
          <label htmlFor="password">Contraseña</label>
          <input id="password" name="password" type="password" value={form.password} onChange={cambiar} required />
        </div>
        {error && <p className="error">{error}</p>}
        <button className="primario" type="submit">Entrar</button>
      </form>
      <p className="ayuda">Prueba con ana, luis o tecnico. Contraseña: 123456</p>
    </div>
  );
}
