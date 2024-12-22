import postcss from './postcss.config.js';
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte({
    compilerOptions: {
      dev: true
    }
  })],
  css: {
    postcss
  },
  mode:'development',
  server: {
    proxy: {
      '^/dns/.*': {
        target: 'https://api.dnsmonitor.io',
        changeOrigin: true
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})