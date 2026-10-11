// Тема (SPEC §6.9). Выбор хранится в localStorage['nv-theme']; без выбора тема берётся из системы.
// Начальное значение ставит inline-скрипт в index.html до первой отрисовки.
import { reduced } from './env'

export type Theme = 'light' | 'dark'

const KEY = 'nv-theme'
const root = () => document.documentElement

export function currentTheme(): Theme {
  const t = root().dataset.theme
  if (t === 'light' || t === 'dark') return t
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function apply(theme: Theme) {
  root().dataset.theme = theme
  try {
    localStorage.setItem(KEY, theme)
  } catch {
    /* хранилище недоступно: тема просто не запомнится */
  }
}

/**
 * Переключает тему. Если есть View Transitions и нет reduced motion, новая тема
 * раскрывается кругом из центра кнопки до дальнего угла за 550 ms.
 */
export function toggleTheme(origin: HTMLElement) {
  const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark'
  if (!document.startViewTransition || reduced()) {
    apply(next)
    return
  }
  const r = origin.getBoundingClientRect()
  const x = r.left + r.width / 2
  const y = r.top + r.height / 2
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
  const vt = document.startViewTransition(() => apply(next))
  vt.ready
    .then(() => {
      root().animate(
        { clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        {
          duration: 550,
          easing: 'cubic-bezier(.2,.8,.2,1)',
          pseudoElement: '::view-transition-new(root)',
        },
      )
    })
    .catch(() => {})
}
