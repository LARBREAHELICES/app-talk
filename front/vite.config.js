import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    watch: {
      usePolling: true, // Permet de détecter les changements dans Docker
    },
    hmr: {
      overlay: true, // Active le Hot Module Replacement
    },
    host: '0.0.0.0', // Nécessaire pour Docker
    port: 5173, // Assurez-vous d'utiliser le bon port
  },
})
