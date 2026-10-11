import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Шрифты не встраивать в CSS: иначе все подмножества fontsource (латиница, кириллица,
    // расширенные) едут в блокирующем отрисовку CSS, а не грузятся по unicode-range.
    assetsInlineLimit: (file) => (/\.woff2?$/.test(file) ? false : undefined),
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
})
