import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  publicDir: '../public',
  build: {
    outDir: '../public',
    emptyOutDir: false
  },
  server: {
    port: 5173,
    proxy: {
      '/messages': 'http://127.0.0.1:3000',
      '/upload': 'http://127.0.0.1:3000',
      '/uploads': 'http://127.0.0.1:3000'
    }
  }
});
