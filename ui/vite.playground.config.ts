import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  root: './playground',
  build: {
    rolldownOptions: {
      input: {
        index: './playground/main.tsx',
      }
    }
  }
})
