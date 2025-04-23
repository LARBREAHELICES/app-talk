import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
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
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
})
