import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
  VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
    manifest: {
      name: 'Outlook',
      short_name: 'Outlook',
      description: 'A simple and intuitive blockchain insight tool.',
      theme_color: '#4FA531',
      background_color: '#0e1217',
      display: 'standalone',
      start_url: '/',
      icons: [
        {
          "src": "/web-app-manifest-192x192.png",
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "maskable"
        },
        {
          "src": "/web-app-manifest-512x512.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "maskable"
        }
      ]
    }
  })
  ],
})
