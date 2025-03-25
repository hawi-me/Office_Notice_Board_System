import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()],
    build: {
      rollupOptions: {
        external: ['react', 'react/jsx-runtime'], // Mark React as external
      },
    },
    server: {
      proxy: {
        '/api': {
          target: 'https://demo.iclpartner.com',
          changeOrigin: true,
          secure: false,
        },
      },
    },
})
