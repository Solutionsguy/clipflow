import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const backendTarget = process.env.BACKEND_URL || 'http://localhost:8000';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: backendTarget,
        changeOrigin: true,
      },
      '/videos': {
        target: backendTarget,
        changeOrigin: true,
      },
      '/thumbnails': {
        target: backendTarget,
        changeOrigin: true,
      },
      '/gallery': {
        target: backendTarget,
        changeOrigin: true,
      },
      '/video': {
        target: backendTarget,
        changeOrigin: true,
      }
    }
  }
})
