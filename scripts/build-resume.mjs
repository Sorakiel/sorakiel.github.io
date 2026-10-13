// Собирает public/nikita-vasilev-resume.pdf из resume/resume.html.
import { chromium } from '@playwright/test'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const browser = await chromium.launch()
const page = await browser.newPage()
await page.goto('file://' + path.join(root, 'resume/resume.html'))
await page.evaluate(() => document.fonts.ready)
await page.pdf({
  path: path.join(root, 'public/nikita-vasilev-resume.pdf'),
  format: 'A4',
  printBackground: true,
  preferCSSPageSize: true,
})
await browser.close()
console.log('public/nikita-vasilev-resume.pdf')
