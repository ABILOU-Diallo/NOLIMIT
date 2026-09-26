import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Désactivez polling pour une vitesse maximale sur disque local (Windows/Mac/Linux natif)
    watch: {
      usePolling: false,
      ignored: [
        '**/node_modules/**',
        '**/dist/**',
        '**/.git/**',
        '**/supabase/migrations/**'
      ],
    },
    // Augmente la réactivité du HMR
    hmr: {
      overlay: true,
    }
  },
  optimizeDeps: {
    // Force la pré-compilation des grosses dépendances pour un démarrage plus rapide
    include: ['react', 'react-dom', 'react-router-dom', '@supabase/supabase-js', 'recharts']
  },
  build: {
    // Accélère le build final en désactivant le reporting détaillé si non nécessaire
    reportCompressedSize: false,
    sourcemap: false,
    // Utilise l'optimisation esbuild (très rapide)
    minify: 'esbuild',
  }
})
