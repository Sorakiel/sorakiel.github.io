// Вступление (SPEC §7.5): курсор-стрелка по очереди «инспектирует» три элемента,
// затем подлетает к кнопке инспектора, и та мигает кольцом. Любая прокрутка, колесо,
// касание, клавиша или нажатие мыши сразу прерывают его.
import type { Inspector } from './inspector'
import { finePointer, reduced } from './env'

const START_MS = 1500
const STEP_MS = 2050
const PING_TOUCH_MS = 1400
const EVENTS = ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const

type Options = {
  inspector: Inspector
  cursor: HTMLElement
  isInspecting: () => boolean
}

/** Планирует вступление. Возвращает функцию отмены (ещё и для cleanup эффекта). */
export function startIntro({ inspector, cursor, isInspecting }: Options): () => void {
  if (reduced()) return () => {}

  const timers: ReturnType<typeof setTimeout>[] = []
  const later = (fn: () => void, ms: number) => timers.push(setTimeout(fn, ms))
  const insBtn = () => document.getElementById('insBtn')
  let running = false
  let startY = 0
  let stopped = false

  function listeners(add: boolean) {
    const m = add ? addEventListener : removeEventListener
    EVENTS.forEach((t) => m(t, stop, { passive: true }))
    m('scroll', onScroll, { passive: true })
  }
  function onScroll() {
    if (Math.abs(scrollY - startY) > 4) stop()
  }
  function stop() {
    if (stopped) return
    stopped = true
    timers.forEach(clearTimeout)
    listeners(false)
    if (running) {
      running = false
      cursor.style.opacity = '0'
      if (!isInspecting()) inspector.hide()
    }
  }

  function moveCursor(el: Element) {
    const r = el.getBoundingClientRect()
    cursor.style.opacity = '1'
    const x = r.left + Math.min(r.width * 0.62, r.width - 20)
    const y = r.top + r.height * 0.55
    cursor.style.transform = `translate3d(${x}px,${y}px,0)`
  }

  function ping() {
    const b = insBtn()
    if (!b) return
    b.classList.remove('ping')
    void b.offsetWidth
    b.classList.add('ping')
  }

  function run() {
    if (scrollY >= 40 || isInspecting()) {
      stop()
      return
    }
    running = true
    startY = scrollY
    const seq = [
      document.querySelector('#title .ln:nth-child(3) > span'),
      document.getElementById('status'),
      document.getElementById('ctaWork'),
    ].filter((e): e is Element => !!e)
    cursor.style.transition = 'none'
    cursor.style.transform = `translate3d(${innerWidth * 0.82}px,${innerHeight * 0.9}px,0)`
    void cursor.offsetWidth
    cursor.style.transition = ''
    let t = 0
    seq.forEach((el) => {
      later(() => moveCursor(el), t)
      later(() => inspector.show(el), t + 900)
      t += STEP_MS
    })
    later(() => {
      inspector.hide()
      const b = insBtn()
      if (!b) return
      const r = b.getBoundingClientRect()
      cursor.style.transform = `translate3d(${r.left + r.width / 2}px,${r.top + r.height / 2}px,0)`
    }, t)
    later(() => {
      cursor.style.opacity = '0'
      ping()
      running = false
      stopped = true
      listeners(false)
    }, t + 900)
  }

  if (scrollY >= 40) return () => {}
  listeners(true)

  if (finePointer()) {
    startY = scrollY
    later(run, START_MS)
  } else {
    later(() => {
      ping()
      stopped = true
      listeners(false)
    }, PING_TOUCH_MS)
  }
  return stop
}
