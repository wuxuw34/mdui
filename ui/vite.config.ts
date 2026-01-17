import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), dts({ insertTypesEntry: true, tsconfigPath: './tsconfig.app.json' })],
  build: {
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
