import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Pisahkan vendor libraries
          vendor: ['react', 'react-dom'],
          // Pisahkan router jika menggunakan
          router: ['react-router-dom'],
        }
      }
    },
    // Set chunk size warning limit
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 4000, host: true,

  },
  preview: {
    port: 4000,
    host: true, // Pastikan host diatur ke true atau string yang sesuai
    allowedHosts: true,
  },
})
