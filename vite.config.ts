import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin']
      }
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('@mantine') || id.includes('@emotion')) {
              return 'vendor-mantine'
            }
            if (id.includes('react')) {
              return 'vendor-react'
            }
            if (id.includes('react-icons')) {
              return 'vendor-icons'
            }
            return 'vendor'
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: true
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@mantine/core', '@mantine/hooks', '@emotion/react']
  }
})