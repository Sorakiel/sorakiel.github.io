// Стек в блоке «Обо мне». Тексты из docs/redesign/reference/src/markup.html.

export type StackGroup = { label: string; text: string }

export const stack: StackGroup[] = [
  {
    label: 'Интерфейс',
    text: 'React 19, TypeScript, Vite, React Router, TanStack Query, Zustand, Ant Design',
  },
  {
    label: 'Анимация и графика',
    text: 'CSS-анимации, View Transitions, свой SVG-рендер без библиотек',
  },
  {
    label: 'Бэкенд и база',
    text: 'Supabase: Postgres, Auth, RLS, миграции',
  },
  {
    label: 'Платформы',
    text: 'Адаптивная разработка под все устройства, от телефона до десктопа. Плюс Android на Capacitor, десктоп на Tauri, мини-приложения ВКонтакте',
  },
  {
    label: 'Качество и доставка',
    text: 'Vitest, Playwright, ESLint, GitHub Actions, Vercel, Docker, nginx',
  },
]
