import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  console.log("VITE_MISTRAL_API_KEY loaded in config:", env.VITE_MISTRAL_API_KEY ? "Yes" : "No");

  return {
    plugins: [react()],
    server: {
      host: true, // Écoute sur toutes les adresses, y compris LAN
      port: 5173,
      proxy: {
        '/mistral-api': {
          target: 'https://api.mistral.ai/v1',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/mistral-api/, ''),
        },
      }
    },
    define: {
      'import.meta.env.VITE_MISTRAL_API_KEY': JSON.stringify(env.VITE_MISTRAL_API_KEY)
    },
    build: {
      chunkSizeWarningLimit: 1000,
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
  }
})
