import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

// Шрифты первого экрана (заголовок, лид, мета героя) - preload, чтобы они грузились
// вместе с CSS, а не после него.
const PRELOAD_FONTS = [
  'wix-madefor-display-cyrillic-700-normal',
  'wix-madefor-text-cyrillic-400-normal',
  'wix-madefor-text-cyrillic-500-normal',
]

function preloadFonts(names: string[]): Plugin {
  return {
    name: 'preload-fonts',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(_html, ctx) {
        return Object.keys(ctx.bundle ?? {})
          .filter((file) => file.endsWith('.woff2') && names.some((n) => file.includes(n)))
          .map((file) => ({
            tag: 'link',
            attrs: {
              rel: 'preload',
              href: `/${file}`,
              as: 'font',
              type: 'font/woff2',
              crossorigin: '',
            },
            injectTo: 'head' as const,
          }))
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), preloadFonts(PRELOAD_FONTS)],
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
