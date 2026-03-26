import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Agrega este bloque de server:
  server: {
    allowedHosts: [
      'affianced-melody-duodecimally.ngrok-free.dev'
    ]
  }
})
