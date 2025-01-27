import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import taliwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    taliwindcss(),
  ],
})
