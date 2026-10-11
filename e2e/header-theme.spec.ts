import { expect, test } from '@playwright/test'

test('тема переключается и переживает перезагрузку', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' })
  await page.goto('/')
  const root = page.locator('html')
  await page.locator('#themeBtn').click()
  await expect(root).toHaveAttribute('data-theme', 'dark')
  await page.reload()
  await expect(root).toHaveAttribute('data-theme', 'dark')
  expect(await page.evaluate(() => localStorage.getItem('nv-theme'))).toBe('dark')
  await page.locator('#themeBtn').click()
  await expect(root).toHaveAttribute('data-theme', 'light')
})

test('без сохранённого выбора тема берётся из системы', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.goto('/')
  await expect(page.locator('html')).not.toHaveAttribute('data-theme', /.+/)
  const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor)
  expect(bg).toBe('rgb(11, 10, 16)')
})

test('у шапки появляется линия после прокрутки', async ({ page }) => {
  await page.goto('/')
  const hdr = page.locator('#hdr')
  await expect(hdr).not.toHaveClass(/sc/)
  await page.evaluate(() => scrollTo(0, 200))
  await expect(hdr).toHaveClass(/sc/)
})
