import type { Project } from '../data/projects'
import { shots, type ShotKey } from '../data/shots'
import { finePointer } from '../lib/env'

// Превью у курсора (SPEC §6.3). Всё на DOM и rAF: движение мыши не трогает стейт React.
// Строки проектов зовут peek.show / move / hide / leave, слой <Peek/> рендерится один раз и подключается через attachPeek.

let el: HTMLDivElement | null = null
let box: HTMLDivElement | null = null
let img: HTMLImageElement | null = null
let px = 0
let py = 0
let cx = 0
let cy = 0
let on = false
let raf = 0

/** Справа от курсора на 210 px, у правого края окна - слева. */
function side(x: number) {
  return x + 210 > innerWidth - 180 ? x - 210 : x + 210
}

function loop() {
  if (!el) return
  cx += (px - cx) * 0.18
  cy += (py - cy) * 0.18
  el.style.left = cx + 'px'
  el.style.top = cy + 'px'
  raf = on || Math.abs(px - cx) > 0.5 ? requestAnimationFrame(loop) : 0
}

function setTint(color: string) {
  document.documentElement.style.setProperty('--tint', color)
}

export const peek = {
  show(p: Project, x: number, y: number) {
    if (!el || !box || !img || !finePointer()) return
    const s = shots[p.cover as ShotKey]
    box.style.setProperty('--pc', p.color)
    img.src = s.src
    img.alt = `Скриншот ${p.name}`
    px = cx = side(x)
    py = cy = y
    on = true
    el.classList.add('on')
    setTint(p.color)
    if (!raf) raf = requestAnimationFrame(loop)
  },
  move(x: number, y: number) {
    px = side(x)
    py = y
  },
  /** Убрать превью, фон остаётся в цвете проекта (строка раскрыта, курсор ещё над ней). */
  hide() {
    on = false
    el?.classList.remove('on')
  },
  /** Курсор ушёл со строки: убрать превью и вернуть фон. */
  leave() {
    peek.hide()
    setTint('transparent')
  },
}

/** Подключить слой превью. Возвращает функцию отключения. */
export function attachPeek(
  layer: HTMLDivElement,
  preview: HTMLDivElement,
  image: HTMLImageElement,
) {
  el = layer
  box = preview
  img = image
  return () => {
    cancelAnimationFrame(raf)
    raf = 0
    on = false
    el = box = img = null
  }
}
