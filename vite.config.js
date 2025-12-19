import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: './',
  publicDir: 'public',
    server: {
    port: 3000,
    open: true,
  },
  
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        matieres: resolve(__dirname, 'matieres.html'),
        matieresComplete: resolve(__dirname, 'matieres-complete.html'),
        publicationsRecent: resolve(__dirname, 'publications-recentes-complete.html')
      }
    }
  },
  
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/scss/main.scss";`
      }
    }
  },
  
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@assets': resolve(__dirname, 'src/assets'),
      '@css': resolve(__dirname, 'src/css'),
      '@js': resolve(__dirname, 'src/js'),
      '@pages': resolve(__dirname, 'src/pages'),
      '@scss': resolve(__dirname, 'src/scss')
    }
  }
})