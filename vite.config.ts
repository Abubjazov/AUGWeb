///<reference types="vitest" />
///<reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  test: {
    environment: 'jsdom',
    globals: true,
  },
  resolve: {
    alias: {
      src: '/src',
      assets: '/src/assets',
      components: '/src/components',
      uikit: '/src/UIkit',
      utils: '/src/utils',
      pages: '/src/pages',
      store: '/src/store',
      hooks: '/src/hooks',
      mockData: '/src/mockData',
    },
  },
})
