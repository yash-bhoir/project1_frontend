import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

const target = 'https://bloodbank-backend-ghvn.onrender.com';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
  server: {
    proxy: {
      '/api': {
        target,          
        changeOrigin: true, 
        secure: true,    
      },
    },
    port: 5173,           
  },
});
