// Pequeño ayudante para fetch: siempre envía la cookie y convierte errores en excepciones
export async function api(ruta, opciones = {}) {
  const res = await fetch(`/api${ruta}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...opciones,
    body: opciones.body ? JSON.stringify(opciones.body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const error = new Error(data.error || 'Error ' + res.status);
    error.status = res.status;
    throw error;
  }
  return data;
}
