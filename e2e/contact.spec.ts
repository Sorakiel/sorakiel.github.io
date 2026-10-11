import { expect, test } from '@playwright/test'

// Контакты (SPEC §6.7, §12).

test('«Скопировать» кладёт значение в буфер и показывает тост', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.goto('/')
  const row = page.locator('.contact-row').filter({ hasText: 'Telegram' })
  await row.getByRole('button', { name: 'Скопировать' }).click()
  const toast = page.locator('#toast')
  await expect(toast).toHaveText('Скопировано: @sorakield')
  await expect(toast).toHaveClass(/\bon\b/)
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('@sorakield')
  await expect(toast).not.toHaveClass(/\bon\b/, { timeout: 3000 })
})
