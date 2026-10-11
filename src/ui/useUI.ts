import { useContext, useSyncExternalStore } from 'react'

import { UIContext, type LightboxState, type ToastState, type UIStore } from './store'

/**
 * Хранилище интерфейса: `inspecting`, `openLightbox`, `toast` и так далее.
 * Значение стабильно, компонент не перерисовывается от его смены.
 */
export function useUI(): UIStore {
  const ui = useContext(UIContext)
  if (!ui) throw new Error('useUI вызван вне <UIProvider>')
  return ui
}

/** Состояние лайтбокса (для оверлея Lightbox). */
export function useLightboxState(): LightboxState | null {
  const ui = useUI()
  return useSyncExternalStore(ui.subscribeLightbox, ui.getLightbox, ui.getLightbox)
}

/** Последний тост (для оверлея Toast). */
export function useToastState(): ToastState | null {
  const ui = useUI()
  return useSyncExternalStore(ui.subscribeToast, ui.getToast, ui.getToast)
}

/**
 * Включён ли инспектор, как состояние React. Перерисовывает только при переключении,
 * поэтому годится для `aria-pressed`. В обработчиках движения мыши и прокрутки
 * читайте `ui.inspecting.current`.
 */
export function useInspecting(): boolean {
  const ui = useUI()
  return useSyncExternalStore(
    (fn) => ui.subscribeInspecting(fn),
    () => ui.inspecting.current,
    () => false,
  )
}
