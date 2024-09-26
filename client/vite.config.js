import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Room Rental Management System',
        short_name: 'RRMS',
        description: 'My Progressive Web App',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/assets/house.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/assets/house.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
    eslintPlugin({ cache: false }),
  ],
  resolve: {
    alias: [{ find: '~', replacement: '/src' }],
  },
})
