import { useEffect, useRef } from 'react'

import { useUI } from '../ui/useUI'
import { attachPeek, peek } from './peekController'

/** Слой превью у курсора (SPEC §6.3). Логика движения - в `peekController.ts`. */
export default function Peek() {
  const ui = useUI()
  const ref = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const detach = attachPeek(ref.current!, boxRef.current!, imgRef.current!)
    // Включили инспектор - превью и окраска фона сразу пропадают.
    const off = ui.subscribeInspecting((inspecting) => {
      if (inspecting) peek.leave()
    })
    return () => {
      off()
      detach()
    }
  }, [ui])

  return (
    <div className="cursor-preview" id="peek" aria-hidden="true" ref={ref}>
      <div className="preview pv-img" ref={boxRef}>
        <img ref={imgRef} alt="" decoding="async" />
      </div>
    </div>
  )
}
