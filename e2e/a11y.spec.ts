import { expect, test } from '@playwright/test'

// Доступность и клавиатура (SPEC §10, §11).

test('свёрнутая панель проекта не получает фокус, раскрытая - получает', async ({ page }) => {
  await page.goto('/')
  const toggle = page.locator('.project-toggle').first()
  await toggle.focus()
  await page.keyboard.press('Tab')
  await expect(page.locator('.project-toggle').nth(1)).toBeFocused()
  await toggle.focus()
  await page.keyboard.press('Enter')
  await expect(toggle).toHaveAttribute('aria-expanded', 'true')
  await page.keyboard.press('Tab')
  await expect(page.locator('.pb-shot').first()).toBeFocused()
})

test('скриншот кейса открывается с клавиатуры и возвращает фокус', async ({ page }) => {
  await page.goto('/')
  const shot = page.locator('#case-almanac img.zoomable').first()
  await shot.focus()
  await page.keyboard.press('Enter')
  const lb = page.locator('.lb')
  await expect(lb).toHaveClass(/\bon\b/)
  await expect(lb.locator('img')).toHaveAttribute('alt', (await shot.getAttribute('alt'))!)
  await expect(page.locator('.lb-x')).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(shot).toBeFocused()
  await page.keyboard.press(' ')
  await expect(lb).toHaveClass(/\bon\b/)
})

test('у картинок есть alt, width и height; ниже первого экрана - lazy', async ({ page }) => {
  await page.goto('/')
  const vh = page.viewportSize()!.height
  const list = await page.locator('main img').evaluateAll(
    (els, h) =>
      els.map((i) => ({
        src: i.getAttribute('src'),
        alt: i.getAttribute('alt'),
        w: i.getAttribute('width'),
        h: i.getAttribute('height'),
        lazy: i.getAttribute('loading'),
        below: i.getBoundingClientRect().top + scrollY > h,
      })),
    vh,
  )
  expect(list.length).toBeGreaterThan(0)
  for (const i of list) {
    expect(i.alt, i.src!).toBeTruthy()
    expect(i.w, i.src!).toBeTruthy()
    expect(i.h, i.src!).toBeTruthy()
    if (i.below) expect(i.lazy, i.src!).toBe('lazy')
  }
})
