import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['images/homemates-logo.png'],
      manifest: {
        name: 'Homemates',
        short_name: 'Homemates',
        theme_color: '#C2185B',
        icons: [
          {
            src: '/images/homemates-logo.png',
            sizes: '192x192',
            type: 'image/jpeg'
          },
          {
            src: '/images/homemates-logo.png',
            sizes: '512x512',
            type: 'image/jpeg'
          }
        ]
      }
    })
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
