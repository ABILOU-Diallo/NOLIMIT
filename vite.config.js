import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // On autorise Vite à charger les variables commençant par SUPABASE_ en plus de VITE_
  envPrefix: ['VITE_', 'SUPABASE_'],
  server: {
    watch: {
      usePolling: false,
      ignored: [
        '**/node_modules/**',
        '**/dist/**',
        '**/.git/**',
        '**/supabase/migrations/**'
      ],
    },
    hmr: {
      overlay: true,
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@supabase/supabase-js', 'recharts']
  },
  build: {
    reportCompressedSize: false,
    sourcemap: false,
    minify: 'esbuild',
  }
})
