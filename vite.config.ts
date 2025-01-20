import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Chunk vendor modules
          if (id.includes('node_modules')) {
            if (id.includes('@mantine')) {
              return 'vendor-mantine'
            }
            if (id.includes('react')) {
              return 'vendor-react'
            }
            if (id.includes('react-icons')) {
              return 'vendor-icons'
            }
            return 'vendor' // all other vendor modules
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: true
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@mantine/core', '@mantine/hooks']
  }
})