// Общее состояние интерфейса вне дерева React: инспектор, лайтбокс, тост.
// Инспектор живёт в ref + подписке, чтобы движение мыши не перерисовывало дерево (SPEC §7).
import { createContext } from 'react'

export type LightboxState = {
  src: string
  alt: string
  /** элемент, на который вернуть фокус при закрытии */
  from: HTMLElement | null
}

export type ToastState = {
  /** растёт с каждым тостом, чтобы повторный текст тоже показывался */
  id: number
  text: string
}

type Listener = () => void

export interface UIStore {
  /** Включён ли инспектор. Читать в обработчиках: `ui.inspecting.current`. */
  inspecting: { current: boolean }
  /** Подписка на смену режима инспектора. Возвращает функцию отписки. */
  subscribeInspecting(fn: (on: boolean) => void): () => void
  /** Включает или выключает инспектор: ставит класс `inspect` на <html> и оповещает подписчиков. */
  setInspecting(on: boolean): void

  /** Открыть лайтбокс. Пока включён инспектор, ничего не делает. */
  openLightbox(src: string, alt: string, from?: HTMLElement | null): void
  closeLightbox(): void
  /** Показать тост. */
  toast(text: string): void

  // Для оверлеев (useSyncExternalStore); страницам нужны только методы выше.
  getLightbox(): LightboxState | null
  subscribeLightbox(fn: Listener): () => void
  getToast(): ToastState | null
  subscribeToast(fn: Listener): () => void
}

export function createUIStore(): UIStore {
  const inspecting = { current: false }
  const inspectingListeners = new Set<(on: boolean) => void>()
  let lightbox: LightboxState | null = null
  const lightboxListeners = new Set<Listener>()
  let toastState: ToastState | null = null
  let toastId = 0
  const toastListeners = new Set<Listener>()

  return {
    inspecting,
    subscribeInspecting(fn) {
      inspectingListeners.add(fn)
      return () => {
        inspectingListeners.delete(fn)
      }
    },
    setInspecting(on) {
      if (inspecting.current === on) return
      inspecting.current = on
      document.documentElement.classList.toggle('inspect', on)
      inspectingListeners.forEach((fn) => fn(on))
    },

    openLightbox(src, alt, from = null) {
      if (inspecting.current) return
      lightbox = { src, alt, from }
      lightboxListeners.forEach((fn) => fn())
    },
    closeLightbox() {
      if (!lightbox) return
      lightbox = null
      lightboxListeners.forEach((fn) => fn())
    },
    toast(text) {
      toastState = { id: ++toastId, text }
      toastListeners.forEach((fn) => fn())
    },

    getLightbox: () => lightbox,
    subscribeLightbox(fn) {
      lightboxListeners.add(fn)
      return () => {
        lightboxListeners.delete(fn)
      }
    },
    getToast: () => toastState,
    subscribeToast(fn) {
      toastListeners.add(fn)
      return () => {
        toastListeners.delete(fn)
      }
    },
  }
}

export const UIContext = createContext<UIStore | null>(null)
