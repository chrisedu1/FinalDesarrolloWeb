import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    // El frontend llama a /api/... y Vite lo reenvía al backend.
    // Así todo es el "mismo sitio" y la cookie de sesión viaja sin problemas de CORS.
    proxy: { '/api': 'http://localhost:3000' },
  },
})
