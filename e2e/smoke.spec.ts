import { expect, test } from '@playwright/test'

// Каркас: сайт открывается, все разделы на месте, горизонтальной прокрутки нет.
// Сценарии из SPEC §12 добавляются вместе с функциями в PR 2-8.

test('страница открывается и содержит все разделы', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle('Никита Васильев - frontend-разработчик')
  await expect(page.locator('html')).toHaveAttribute('lang', 'ru')
  await expect(page.locator('#title')).toContainText('Собираю интерфейсы')
  for (const id of ['work', 'about', 'contact']) {
    await expect(page.locator(`#${id}`)).toBeAttached()
  }
  await expect(page.locator('#case-almanac')).toBeAttached()
  await expect(page.locator('#case-parkovich')).toBeAttached()
})

test('на 360 px нет горизонтальной прокрутки', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 740 })
  await page.goto('/')
  const [scrollWidth, clientWidth] = await page.evaluate(() => [
    document.documentElement.scrollWidth,
    document.documentElement.clientWidth,
  ])
  expect(scrollWidth).toBe(clientWidth)
})
