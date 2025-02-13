import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  root: ".", // Asegura que la raíz es el proyecto
  build: {
    outDir: "dist",
  },
  plugins: [react()],
})
