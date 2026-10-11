// Пререндер: кладёт готовый HTML страницы в dist/index.html, чтобы текст был виден
// до загрузки JS. Клиент затем подхватывает разметку через hydrateRoot (src/main.tsx).
import { readFile, rm, writeFile } from 'node:fs/promises'

const { render } = await import('../dist-ssr/entry-server.js')
const file = new URL('../dist/index.html', import.meta.url)
const html = await readFile(file, 'utf8')
const marker = '<div id="root"></div>'
if (!html.includes(marker)) throw new Error(`prerender: в dist/index.html нет ${marker}`)
await writeFile(file, html.replace(marker, `<div id="root">${render()}</div>`))
await rm(new URL('../dist-ssr', import.meta.url), { recursive: true, force: true })
