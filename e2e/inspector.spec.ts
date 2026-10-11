import { expect, test } from '@playwright/test'

// Вступление стартует через 1,5 с; любое нажатие клавиши его прерывает, поэтому тесты
// сначала нажимают I и работают уже с включённым инспектором.

// Эффекты React отрабатывают после первой отрисовки: ждём два кадра, прежде чем жать клавиши.
const open = async (page: import('@playwright/test').Page) => {
  await page.goto('/')
  await page.evaluate(
    () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => r(null)))),
  )
}

const opacity = (page: import('@playwright/test').Page) =>
  page.locator('#cur').evaluate((e) => getComputedStyle(e).opacity)

test.describe('инспектор', () => {
  test('I включает и выключает, Esc выключает, работает русская ш', async ({ page }) => {
    await open(page)
    const root = page.locator('html')
    const btn = page.locator('#insBtn')
    await page.keyboard.press('i')
    await expect(root).toHaveClass(/inspect/)
    await expect(btn).toHaveAttribute('aria-pressed', 'true')
    await expect(page.locator('#toast')).toHaveText('Инспектор включён: наведите на любой элемент')
    await page.keyboard.press('Escape')
    await expect(root).not.toHaveClass(/inspect/)
    await expect(btn).toHaveAttribute('aria-pressed', 'false')
    await page.evaluate(() => dispatchEvent(new KeyboardEvent('keydown', { key: 'ш' })))
    await expect(root).toHaveClass(/inspect/)
    await page.evaluate(() => dispatchEvent(new KeyboardEvent('keydown', { key: 'Ш' })))
    await expect(root).not.toHaveClass(/inspect/)
    await btn.click()
    await expect(root).toHaveClass(/inspect/)
    await btn.click()
    await expect(root).not.toHaveClass(/inspect/)
  })

  test('подсказка над #title em', async ({ page, isMobile }) => {
    test.skip(!!isMobile, 'наведение мышью')
    await open(page)
    await page.evaluate(() => document.fonts.ready)
    await page.keyboard.press('i')
    await page.locator('#title em').hover()
    const tip = page.locator('#tip')
    await expect(tip).toHaveClass(/on/)
    const text = (await tip.innerText()).replace(/\s+/g, ' ')
    expect(text.startsWith('em')).toBe(true)
    expect(text).toContain('Wix Madefor Display 700')
    if (page.viewportSize()!.width === 1440) {
      // эталон в этом Chromium даёт 903,7 -> 904; в спецификации 905 (другой движок текста)
      expect(text).toMatch(/em 90[45] × 156/)
      expect(text).toContain('font Wix Madefor Display 700 · 124/114')
      expect(text).toContain('color rgb(98, 54, 224)')
    }
    await page.keyboard.press('Escape')
    await expect(tip).not.toHaveClass(/on/)
  })

  test('у элемента внутри data-ins в подсказке есть компонент', async ({ page, isMobile }) => {
    test.skip(!!isMobile, 'наведение мышью')
    await open(page)
    await page.keyboard.press('i')
    await page.locator('.meta .caption').first().hover()
    await expect(page.locator('#tip')).toContainText('↳ <MetaItem>')
  })

  test('клик по ссылке выбирает элемент и не переходит', async ({ page, isMobile }) => {
    test.skip(!!isMobile, 'клик мышью')
    await open(page)
    await page.keyboard.press('i')
    await page.locator('#ctaWork').click()
    expect(new URL(page.url()).hash).toBe('')
    await expect(page.locator('#tip')).toContainText('a#ctaWork')
    await page.keyboard.press('Escape')
    await page.locator('#ctaWork').click()
    expect(new URL(page.url()).hash).toBe('#work')
  })

  test('на телефоне элемент выбирается тапом', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'только сенсорный экран')
    await open(page)
    await page.locator('#insBtn').tap()
    await expect(page.locator('html')).toHaveClass(/inspect/)
    await page.locator('#title em').tap()
    await expect(page.locator('#tip')).toContainText('em')
    await expect(page.locator('#tip')).toHaveClass(/on/)
  })

  test('HUD показывает размер окна', async ({ page }) => {
    await open(page)
    await page.keyboard.press('i')
    const vp = page.viewportSize()!
    await expect(page.locator('#hudVp')).toHaveText(`${vp.width}×${vp.height}`)
    await expect(page.locator('#hud')).toBeVisible()
  })

  test('вступление: курсор появляется и прерывается прокруткой', async ({ page, isMobile }) => {
    test.skip(!!isMobile, 'вступление только для мыши')
    await open(page)
    await expect.poll(() => opacity(page), { timeout: 5000 }).toBe('1')
    await page.evaluate(() => scrollTo(0, 300))
    await expect.poll(() => opacity(page)).toBe('0')
  })

  test('вступление не стартует при reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await open(page)
    await page.waitForTimeout(2500)
    expect(await opacity(page)).toBe('0')
    await expect(page.locator('#insBtn')).not.toHaveClass(/ping/)
  })

  test('на сенсорном экране кнопка мигает вместо вступления', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'только сенсорный экран')
    await open(page)
    await expect(page.locator('#insBtn')).toHaveClass(/ping/, { timeout: 4000 })
    expect(await opacity(page)).toBe('0')
  })
})
