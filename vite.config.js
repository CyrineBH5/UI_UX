import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  // Configuration de base pour Vite
  root: './',
  publicDir: 'public',
  
  // Configuration du serveur de développement
  server: {
    port: 3000,
    open: true,
  },
  
  // Configuration du build
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        matieres: resolve(__dirname, 'src/pages/digital_minds/matieres.html'),
      }
    }
  },
  
  // Configuration CSS/SCSS
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/scss/main.scss";`
      }
    }
  }
})

