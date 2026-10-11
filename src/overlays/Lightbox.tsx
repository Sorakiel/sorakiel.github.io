import { useEffect, useRef, useState } from 'react'

import type { LightboxState } from '../ui/store'
import { useLightboxState, useUI } from '../ui/useUI'

/** Лайтбокс (SPEC §6.8): закрывается по клику мимо картинки, по «×» и по Esc, возвращает фокус. */
export default function Lightbox() {
  const ui = useUI()
  const state = useLightboxState()
  const close = useRef<HTMLButtonElement>(null)
  // Последняя картинка остаётся на месте, пока лайтбокс гаснет.
  const [shown, setShown] = useState<LightboxState | null>(null)
  if (state && state !== shown) setShown(state)

  // Фокус: при открытии на «×», при закрытии обратно на скриншот.
  // Возврат не в cleanup эффекта, чтобы StrictMode не уводил фокус при повторном монтировании.
  const from = useRef<HTMLElement | null>(null)
  useEffect(() => {
    if (state) {
      from.current = state.from
      close.current?.focus()
    } else if (from.current) {
      from.current.focus()
      from.current = null
    }
  }, [state])

  useEffect(() => {
    if (!state) return
    const root = document.documentElement
    root.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') ui.closeLightbox()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      root.style.overflow = ''
    }
  }, [state, ui])

  return (
    <div
      className={state ? 'lb on' : 'lb'}
      role="dialog"
      aria-modal="true"
      aria-label="Скриншот"
      onClick={(e) => {
        if (e.target === e.currentTarget) ui.closeLightbox()
      }}
    >
      <img src={shown?.src} alt={shown?.alt ?? ''} />
      <button
        className="lb-x"
        type="button"
        aria-label="Закрыть"
        ref={close}
        onClick={ui.closeLightbox}
      >
        ×
      </button>
    </div>
  )
}
