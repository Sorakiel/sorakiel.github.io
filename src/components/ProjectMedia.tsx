import type { CSSProperties, MouseEvent } from 'react'

import type { Project } from '../data/projects'
import { shots, type ShotKey } from '../data/shots'
import { useUI } from '../ui/useUI'

/** Лента скриншотов в открытой строке: все одной высоты, по клику открываются в лайтбоксе. */
export default function ProjectMedia({ project: p }: { project: Project }) {
  const ui = useUI()
  const items = p.media.map((key) => shots[key as ShotKey])
  const sum = items.reduce((a, s) => a + s.ratio, 0)

  function zoom(e: MouseEvent<HTMLButtonElement>) {
    const img = e.currentTarget.querySelector('img')
    if (img) ui.openLightbox(img.currentSrc || img.src, img.alt, e.currentTarget)
  }

  return (
    <div className="pb-media" style={{ '--a': sum.toFixed(3) } as CSSProperties}>
      {items.map((s, i) => (
        <button
          key={p.media[i]}
          className={s.ratio < 1 ? 'pb-shot is-phone' : 'pb-shot'}
          type="button"
          style={{ flex: `${s.ratio} 1 0` }}
          aria-label={`Открыть скриншот ${p.name}`}
          onClick={zoom}
        >
          <img
            src={s.src}
            width={s.width}
            height={s.height}
            alt={`Скриншот ${p.name}`}
            loading="lazy"
            decoding="async"
            style={{ aspectRatio: s.ratio }}
          />
        </button>
      ))}
    </div>
  )
}
