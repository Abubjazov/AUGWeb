///<reference types="vitest" />
///<reference types="vite/client" />
///<reference types="vite-plugin-svgr/client" />

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/AUGWeb/',
  plugins: [
    react(),
    svgr(),
    VitePWA({
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'AUG Web',
        short_name: 'AUG Web',
        description:
          'We are building an Augmented Web platform consisting of a browser-basedplugin and decentralized applications (dapplets) based on cryptotechnologies.',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        start_url: '.',
        scope: './AUGWeb/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
  },
  resolve: {
    alias: {
      src: '/src',
      assets: '/src/assets',
      components: '/src/components',
      asyncThunks: '/src/store/slices/asyncThunks',
      api: '/src/api',
      uikit: '/src/UIkit',
      utils: '/src/utils',
      pages: '/src/pages',
      store: '/src/store',
      hooks: '/src/hooks',
      mockData: '/src/mockData',
    },
  },
  build: {
    chunkSizeWarningLimit: 1600,
  },
})
