import { useEffect, useRef } from 'react'

import { createInspector } from '../lib/inspector'
import { startIntro } from '../lib/intro'
import { useUI } from '../ui/useUI'

// Слои инспектора (SPEC §7). React рендерит их один раз; всё поведение в lib/inspector.ts
// и lib/intro.ts работает на refs, rAF и transform, без стейта.
export default function Inspector() {
  const ui = useUI()
  const ins = useRef<HTMLDivElement>(null)
  const margin = useRef<HTMLDivElement>(null)
  const padding = useRef<HTMLDivElement>(null)
  const content = useRef<HTMLDivElement>(null)
  const tip = useRef<HTMLDivElement>(null)
  const hud = useRef<HTMLDivElement>(null)
  const hudViewport = useRef<HTMLSpanElement>(null)
  const hudScroll = useRef<HTMLSpanElement>(null)
  const hudFps = useRef<HTMLElement>(null)
  const cursor = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const layers = {
      ins: ins.current,
      margin: margin.current,
      padding: padding.current,
      content: content.current,
      tip: tip.current,
      hud: hud.current,
      hudViewport: hudViewport.current,
      hudScroll: hudScroll.current,
      hudFps: hudFps.current,
    }
    const cur = cursor.current
    if (Object.values(layers).some((v) => !v) || !cur) return
    const inspector = createInspector(ui, layers as Parameters<typeof createInspector>[1])
    // Начальное состояние: StrictMode перемонтирует эффект, а режим мог остаться включённым.
    const cancelIntro = startIntro({
      inspector,
      cursor: cur,
      isInspecting: () => ui.inspecting.current,
    })
    // Включение инспектора останавливает вступление.
    const unsubscribe = ui.subscribeInspecting((on) => {
      if (on) cancelIntro()
    })
    return () => {
      unsubscribe()
      cancelIntro()
      inspector.destroy()
    }
  }, [ui])

  return (
    <>
      <div className="grid-ov" aria-hidden="true">
        <div className="wrap">
          <div className="grid-12">
            {Array.from({ length: 12 }, (_, i) => (
              <i key={i}></i>
            ))}
          </div>
        </div>
      </div>
      <div className="ins" id="ins" aria-hidden="true" ref={ins}>
        <div className="ib-m" id="ibM" ref={margin}></div>
        <div className="ib-p" id="ibP" ref={padding}></div>
        <div className="ib-c" id="ibC" ref={content}></div>
      </div>
      <div className="tip" id="tip" aria-hidden="true" ref={tip}></div>
      <div className="hud" id="hud" aria-hidden="true" ref={hud}>
        <span id="hudVp" ref={hudViewport}>
          0×0
        </span>
        <span id="hudY" ref={hudScroll}>
          y 0
        </span>
        <span>
          <b id="hudFps" ref={hudFps}>
            60
          </b>{' '}
          fps
        </span>
      </div>
      <div className="cursor" id="cur" aria-hidden="true" ref={cursor}>
        <svg viewBox="0 0 24 24">
          <path
            d="M5 3l14 7-6 1.8L10.5 18z"
            fill="#fff"
            stroke="#111"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </>
  )
}
