import { expect, test } from '@playwright/test'

// Список работ (SPEC §6.3, §6.8, §12).

test('строка проекта раскрывается и сворачивается', async ({ page }) => {
  await page.goto('/')
  const row = page.locator('.project').first()
  const toggle = row.locator('.project-toggle')
  await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  await toggle.click()
  await expect(toggle).toHaveAttribute('aria-expanded', 'true')
  await expect(row).toHaveClass(/\bopen\b/)
  await expect(page.locator(`#${await toggle.getAttribute('aria-controls')}`)).toBeVisible()
  await toggle.click()
  await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  await expect(row).not.toHaveClass(/\bopen\b/)
})

test('лайтбокс открывается по скриншоту, закрывается по Esc и возвращает фокус', async ({
  page,
}) => {
  await page.goto('/')
  await page.locator('.project-toggle').first().click()
  const shot = page.locator('.pb-shot').first()
  await shot.click()
  const lb = page.locator('.lb')
  await expect(lb).toHaveClass(/\bon\b/)
  await expect(lb.locator('img')).toHaveAttribute('alt', 'Скриншот Almanac')
  await expect(page.locator('.lb-x')).toBeFocused()
  await expect(page.locator('html')).toHaveCSS('overflow', 'hidden')
  await page.keyboard.press('Escape')
  await expect(lb).not.toHaveClass(/\bon\b/)
  await expect(shot).toBeFocused()
})

test('лайтбокс закрывается по клику мимо картинки и по «×»', async ({ page }) => {
  await page.goto('/')
  await page.locator('.project-toggle').first().click()
  const lb = page.locator('.lb')
  await page.locator('.pb-shot').first().click()
  await lb.click({ position: { x: 5, y: 5 } })
  await expect(lb).not.toHaveClass(/\bon\b/)
  await page.locator('.pb-shot').first().click()
  await page.locator('.lb-x').click()
  await expect(lb).not.toHaveClass(/\bon\b/)
})
