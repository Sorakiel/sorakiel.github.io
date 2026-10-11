// Движок инспектора на чистом DOM API (SPEC §7). React сюда не заходит:
// на движение мыши, прокрутку и кадры стейт не трогается, только rAF и transform.
// Измерение (getComputedStyle, текст и размер подсказки) делается один раз на элемент,
// пока курсор внутри того же элемента или идёт прокрутка, пересчитываются только координаты.
import type { UIStore } from '../ui/store'

type Four = [number, number, number, number]

export type Measurement = {
  name: string
  width: number
  height: number
  img: { naturalWidth: number; naturalHeight: number; webp: boolean; alt: string } | null
  font: { family: string; weight: string; size: number; lineHeight: number | 'normal' }
  color: string
  margin: Four
  padding: Four
  border: Four
  /** data-ins ближайшего предка (или самого элемента, тогда null) */
  component: string | null
}

/** `тег#id.класс1.класс2`, не больше двух классов. */
export function nameOf(el: Element): string {
  const tag = el.tagName.toLowerCase()
  const id = el.id ? `#${el.id}` : ''
  const raw: unknown = el.className
  const cn = typeof raw === 'string' ? raw : ((raw as { baseVal?: string } | null)?.baseVal ?? '')
  const classes = cn.trim() ? `.${cn.trim().split(/\s+/).slice(0, 2).join('.')}` : ''
  return tag + id + classes
}

/** Разбор элемента: размеры, шрифт, цвет, отступы, компонент. Один getComputedStyle. */
export function measure(el: Element): Measurement {
  const cs = getComputedStyle(el)
  const n = (k: string) => parseFloat(cs.getPropertyValue(k)) || 0
  const four = (a: string, b: string, c: string, d: string): Four => [n(a), n(b), n(c), n(d)]
  const r = el.getBoundingClientRect()
  const comp = el.closest<HTMLElement>('[data-ins]')
  const image = el instanceof HTMLImageElement ? el : null
  return {
    name: nameOf(el),
    width: Math.round(r.width),
    height: Math.round(r.height),
    img: image
      ? {
          naturalWidth: image.naturalWidth,
          naturalHeight: image.naturalHeight,
          webp: image.currentSrc.includes('webp'),
          alt: image.alt,
        }
      : null,
    font: {
      family: cs.fontFamily.split(',')[0].replace(/["']/g, '').trim(),
      weight: cs.fontWeight,
      size: Math.round(n('font-size')),
      lineHeight: cs.lineHeight === 'normal' ? 'normal' : Math.round(n('line-height')),
    },
    color: cs.color,
    margin: four('margin-top', 'margin-right', 'margin-bottom', 'margin-left'),
    padding: four('padding-top', 'padding-right', 'padding-bottom', 'padding-left'),
    border: four(
      'border-top-width',
      'border-right-width',
      'border-bottom-width',
      'border-left-width',
    ),
    component: comp && comp !== el ? (comp.dataset.ins ?? null) : null,
  }
}

function esc(x: string): string {
  return x.replace(
    /[&<>"]/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!,
  )
}

/** Текст подсказки (HTML со span.tn / .tc / .ts / .sw2, стили в inspector.css). */
export function tipHtml(m: Measurement): string {
  let h = `<span class="tn">${esc(m.name)}</span>  <span class="ts">${m.width} × ${m.height}</span><br>`
  if (m.img) {
    h += `<span class="tc">img</span> ${m.img.naturalWidth} × ${m.img.naturalHeight} · ${m.img.webp ? 'webp' : ''} · alt «${esc(m.img.alt)}»<br>`
  } else {
    const f = m.font
    h += `<span class="tc">font</span> ${esc(f.family)} ${f.weight} · ${f.size}/${f.lineHeight}<br>`
  }
  h += `<span class="tc">color</span> <span class="sw2" style="background:${esc(m.color)}"></span>${esc(m.color)}`
  if (m.padding.some(Boolean)) {
    h += `<br><span class="tc">padding</span> ${m.padding.map(Math.round).join(' ')}`
  }
  if (m.component) h += `<br><span class="ts">↳ ${esc(m.component)}</span>`
  return h
}

export type InspectorLayers = {
  ins: HTMLElement
  margin: HTMLElement
  padding: HTMLElement
  content: HTMLElement
  tip: HTMLElement
  hud: HTMLElement
  hudViewport: HTMLElement
  hudScroll: HTMLElement
  hudFps: HTMLElement
}

export type InspectorUI = Pick<
  UIStore,
  'inspecting' | 'subscribeInspecting' | 'setInspecting' | 'toast'
>

export type Inspector = {
  /** Показать рамки и подсказку у элемента (для вступления). */
  show(el: Element): void
  hide(): void
  destroy(): void
}

const SKIP = '.hdr,.ins,.tip,.hud,.toast,.cursor-preview,.grid-ov,.cursor,.lb'

export function createInspector(ui: InspectorUI, layers: InspectorLayers): Inspector {
  const root = document.documentElement
  const { ins, tip } = layers
  const on = () => ui.inspecting.current

  let el: Element | null = null
  let m: Measurement | null = null
  let tw = 0
  let th = 0
  let queued = false
  // undefined: ничего не менять, false: скрыть, Element: показать
  let next: Element | false | undefined

  const px = (v: number) => `${Math.max(0, v)}px`
  function setBox(box: HTMLElement, x: number, y: number, w: number, h: number, bw?: Four) {
    box.style.transform = `translate3d(${x}px,${y}px,0)`
    box.style.width = px(w)
    box.style.height = px(h)
    if (bw) box.style.borderWidth = bw.map(px).join(' ')
  }

  function place(withBorders: boolean) {
    if (!el || !m) return
    const r = el.getBoundingClientRect()
    const { margin: mg, padding: p, border: b } = m
    setBox(
      layers.margin,
      r.left - mg[3],
      r.top - mg[0],
      r.width + mg[1] + mg[3],
      r.height + mg[0] + mg[2],
      withBorders ? mg : undefined,
    )
    setBox(
      layers.padding,
      r.left + b[3],
      r.top + b[0],
      r.width - b[1] - b[3],
      r.height - b[0] - b[2],
      withBorders ? p : undefined,
    )
    setBox(
      layers.content,
      r.left + b[3] + p[3],
      r.top + b[0] + p[0],
      r.width - b[1] - b[3] - p[1] - p[3],
      r.height - b[0] - b[2] - p[0] - p[2],
    )
    const tx = Math.min(Math.max(12, r.left), innerWidth - tw - 12)
    let ty = r.bottom + 10
    if (ty + th > innerHeight - 12) ty = Math.max(12, r.top - th - 10)
    tip.style.transform = `translate3d(${tx}px,${ty}px,0)`
  }

  function show(target: Element) {
    if (target !== el) {
      el = target
      m = measure(target)
      tip.innerHTML = tipHtml(m)
      tw = tip.offsetWidth
      th = tip.offsetHeight
      place(true)
    } else {
      place(false)
    }
    ins.classList.add('on')
    tip.classList.add('on')
  }

  function hide() {
    el = null
    m = null
    ins.classList.remove('on')
    tip.classList.remove('on')
  }

  function frame() {
    queued = false
    if (next !== undefined) {
      const e = next
      next = undefined
      if (e === false) hide()
      else show(e)
    } else if (el) {
      place(false)
    }
  }

  function tick() {
    if (queued) return
    queued = true
    requestAnimationFrame(frame)
  }

  function skip(t: EventTarget | null): boolean {
    if (!(t instanceof Element)) return true
    return !!t.closest(SKIP) || t === document.body || t === root || t.tagName === 'MAIN'
  }

  // ---- события
  const onPointerMove = (e: PointerEvent) => {
    if (!on() || e.pointerType === 'touch') return
    const t = e.target
    next = skip(t) ? false : t === el ? undefined : (t as Element)
    tick()
  }
  // Фаза capture: клик выбирает элемент, ссылки не открываются, строки не раскрываются.
  const onClick = (e: MouseEvent) => {
    if (!on() || skip(e.target)) return
    e.preventDefault()
    e.stopPropagation()
    next = e.target as Element
    tick()
  }
  const onScroll = () => {
    if (el) tick()
  }
  const onResize = () => {
    if (!el) return
    next = el
    el = null // заставляет измерить заново
    tick()
  }
  const onKey = (e: KeyboardEvent) => {
    const t = e.target
    if (t instanceof Element && t.closest('input,textarea,select,[contenteditable]')) return
    if (e.metaKey || e.ctrlKey || e.altKey || e.repeat) return
    if (e.key === 'i' || e.key === 'I' || e.key === 'ш' || e.key === 'Ш') {
      ui.setInspecting(!on())
    } else if (e.key === 'Escape' && on()) {
      ui.setInspecting(false)
    }
  }

  // ---- HUD: размер окна, прокрутка и настоящий fps; текст пишется дважды в секунду
  let hudRaf = 0
  let frames = 0
  let last = 0
  function hudFrame(t: number) {
    frames++
    if (t - last >= 500) {
      layers.hudFps.textContent = String(Math.round((frames * 1000) / (t - last)))
      layers.hudViewport.textContent = `${innerWidth}×${innerHeight}`
      layers.hudScroll.textContent = `y ${Math.round(scrollY)}`
      frames = 0
      last = t
    }
    hudRaf = on() ? requestAnimationFrame(hudFrame) : 0
  }
  function startHud() {
    layers.hudViewport.textContent = `${innerWidth}×${innerHeight}`
    layers.hudScroll.textContent = `y ${Math.round(scrollY)}`
    if (hudRaf) return
    frames = 0
    last = performance.now()
    hudRaf = requestAnimationFrame(hudFrame)
  }

  const unsubscribe = ui.subscribeInspecting((isOn) => {
    if (!isOn) {
      next = undefined
      hide()
      return
    }
    root.style.setProperty('--tint', 'transparent')
    startHud()
    ui.toast('Инспектор включён: наведите на любой элемент')
  })

  document.addEventListener('pointermove', onPointerMove, { passive: true })
  document.addEventListener('click', onClick, true)
  addEventListener('keydown', onKey)
  addEventListener('scroll', onScroll, { passive: true })
  addEventListener('resize', onResize)

  return {
    show,
    hide,
    destroy() {
      unsubscribe()
      document.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('click', onClick, true)
      removeEventListener('keydown', onKey)
      removeEventListener('scroll', onScroll)
      removeEventListener('resize', onResize)
      if (hudRaf) cancelAnimationFrame(hudRaf)
      hudRaf = 0
      hide()
    },
  }
}
