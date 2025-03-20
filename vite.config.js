import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "./", // Asegura rutas relativas
  plugins: [react()],
  define: {
    'process.env': {} // Evita errores con process.env en Vite
  }
})

