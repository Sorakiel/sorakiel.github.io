import { useEffect, useState } from 'react'

import { useToastState } from '../ui/useUI'

const SHOWN_MS = 1800

/** Тост: показывает последний текст из `useUI().toast()` на 1,8 с. Текст остаётся, пока тост уезжает. */
export default function Toast() {
  const toast = useToastState()
  const [on, setOn] = useState(false)

  useEffect(() => {
    if (!toast) return
    setOn(true)
    const timer = setTimeout(() => setOn(false), SHOWN_MS)
    return () => clearTimeout(timer)
  }, [toast])

  return (
    <div className={on ? 'toast on' : 'toast'} id="toast" role="status" aria-live="polite">
      {toast?.text}
    </div>
  )
}
