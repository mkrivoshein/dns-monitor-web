import postcss from './postcss.config.js';
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve } from "path"


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte({
    compilerOptions: {
      dev: true
    }
  })],

  resolve: {
    alias: {
     $components: resolve('./src/components'),
    $routes: resolve('./src/routes'),
 
                  }
              },
  css: {
    postcss
  },
  mode:'development',
  server: {
    proxy: {
      '^/dns/.*': {
        target: 'https://api.agencyapi.io',
        changeOrigin: true
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})