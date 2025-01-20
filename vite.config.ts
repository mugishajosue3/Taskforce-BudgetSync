import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { splitVendorChunkPlugin } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': [
            'react',
            'react-dom',
            'react-router-dom',
            '@mantine/core',
            '@mantine/hooks'
          ],
          'icons': [
            'react-icons/cg',
            'react-icons/ai',
            'react-icons/md',
            'react-icons/bs'
          ],
          'contexts': [
            './src/store/AccountContext',
            './src/store/AvailableCategoriesContext',
            './src/store/CategoriesContext',
            './src/store/DateRangeContext',
            './src/store/HistoryContext'
          ]
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@mantine/core',
      '@mantine/hooks',
      'react-icons/cg',
      'react-icons/ai',
      'react-icons/md',
      'react-icons/bs'
    ]
  }
});