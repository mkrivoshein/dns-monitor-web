import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte({
    compilerOptions: {
      dev: true
    }
  })],
  mode:'development',
  server: {
    proxy: {
      '^/dns/.*': {
        target: 'http://localhost:8001',
        changeOrigin: true
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})