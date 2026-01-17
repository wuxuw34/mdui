import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  build: {

  },
  resolve: {
    alias: {
      mdui: path.resolve(__dirname, '../ui/src'),
    }
  },
  optimizeDeps: {
    exclude: ["mdui"]
  }
})
