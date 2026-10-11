# Никита Васильев - frontend-разработчик

Сайт-визитка: React 19, TypeScript, Vite, обычный глобальный CSS. Опубликован на https://sorakiel.github.io.

Главная особенность - встроенный инспектор элементов: клавиша `I` показывает, как свёрстана страница.
Спецификация и эталон лежат в `docs/redesign/` (`SPEC.md`, `reference/portfolio.html`).

## Запуск

```sh
npm ci
npm run dev        # сервер разработки
npm run typecheck  # проверка типов
npm run lint       # ESLint
npm run format     # Prettier
npm run build      # сборка в dist/
npm run e2e        # сборка и Playwright (Chromium, 1440x900 и 390x844)
```

Для e2e один раз: `npx playwright install chromium`.

## Публикация

Сайт отдаётся GitHub Pages из ветки `gh-pages`. Публикация вручную из ветки `main`:

```sh
npm run deploy
```
