import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Écoute sur toutes les adresses, y compris LAN
    port: 5173
  },
  build: {
    chunkSizeWarningLimit: 1000, // Augmente la limite à 1000 kB
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'motion': ['framer-motion'],
          'supabase': ['@supabase/supabase-js']
        }
      }
    }
  }
})
