# Prompts utilizados

Herramienta: Claude (claude.ai). Prompts copiados tal como los escribí, en orden.

## Prompt 1: generar el proyecto

> Construye una aplicacion web para registrar incidencias tecnicas en un laboratorio.
> Stack obligatorio: Node.js + Sequelize (BD a elección) en el backend, React Básico en el frontend y sesión mediante cookies

Respuesta de la IA: generó el backend, el frontend y el paso a paso.


## Prompt 2: error al correr 

>         throw new TypeError('argument handler must be a function')
>
> TypeError: argument handler must be a function
>     at Route.<computed> [as get] (...\node_modules\router\lib\route.js:228:15)
> Que significa ese error

Respuesta de la IA: A una ruta `router.get` le llegaba `undefined` en vez de una función, porque `requiereSesion` no se estaba exportando bien desde `src/middlewares/auth.js` (posible confusión al crear el archivo `src/routes/auth.js`). Me dio el contenido correcto del archivo.
