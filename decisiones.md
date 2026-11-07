# Decisiones
## 1. Qué se entendió del problema

El laboratorio necesita un sistema donde cualquier persona con cuenta pueda reportar fallas de los equipos y darles seguimiento hasta que se cierran.

- Hay dos tipos de usuario: `usuario`, que reporta, y `tecnico`, que atiende.
- Se necesita un login, y la sesión se mantiene con una cookie. El servidor tiene que saber en todo momento quién es el usuario y qué rol tiene.
- Una incidencia se asocia a un equipo, lleva una descripción y tiene un estado (abierta o cerrada).
- La regla importante es quién puede cerrar una incidencia: solo quien la registró o un técnico. Esta regla tiene que estar en el backend, porque el frontend se puede saltar. Cualquiera puede llamar a la API con Postman o desde la consola del navegador.

Decisiones tomadas:

- **Base de datos:** PostgreSQL, porque ya la tenía instalada y la usamos en clase con migraciones.
- **Sesión:** `express-session` guardada en la base de datos (`connect-session-sequelize`) en lugar de en memoria. Así la sesión no se pierde si el servidor se reinicia y porque se utilizó en clase.
- **Rol:** se lee de la base de datos en el login y se guarda en la sesión. Nunca se acepta del cliente. Lo mismo pasa con el creador de una incidencia, que se toma de la sesión y no del body.

## 2. Qué partes se le delegaron a la IA y por qué

Usé Claude para generar casi todo el código: modelos, migraciones, seeders, rutas, middlewares, pruebas y componentes de React.

Por qué: el tiempo del examen es limitado, el profesor permitió usar IA y todavía no domino React. Preferí usar ese tiempo para entender y verificar el código en lugar de escribirlo desde cero.

Lo que hice yo:

- Leer el código y entender la regla de cierre (`PATCH /api/incidencias/:id/cerrar` en `backend/src/routes/incidencias.js`).
- Configurar mi PostgreSQL y el `.env`, y correr las migraciones en mi computadora.
- Resolver el error que me daba a la hora de correr el backend, una linea mal copiada.
- Probar la regla a mano con dos usuarios distintos.
- Hacer los commits y subir el repositorio.


## 3. Algo que la IA hizo mal y cómo me di cuenta
En este proyecto no hizo nada mal, fueron errores que yo cometí a la hora de implementar lo que la IA me dió.