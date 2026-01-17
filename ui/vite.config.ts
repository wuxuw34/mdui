import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts';
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), dts({ insertTypesEntry: true, tsconfigPath: './tsconfig.app.json' })],
  build: {
    cssCodeSplit: false,
    rolldownOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', /playground\/.*/],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime'
        }
      },
    },
    lib: {
      entry: './src/index.ts',
      name: 'mdui',
      fileName: 'index',
      formats: ['es', 'umd'],
    }
  }
})
