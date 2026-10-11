import { useState, type CSSProperties, type PointerEvent } from 'react'

import type { Project } from '../data/projects'
import { useUI } from '../ui/useUI'
import { peek } from '../overlays/peekController'
import ProjectFacts from './ProjectFacts'
import ProjectMedia from './ProjectMedia'

type Props = { project: Project; index: number }

/** Строка проекта: кнопка-заголовок и раскрывающаяся панель со скриншотами и таблицей. */
export default function ProjectRow({ project: p, index }: Props) {
  const ui = useUI()
  const [open, setOpen] = useState(false)
  const panelId = `rp${index}`

  function toggle() {
    if (ui.inspecting.current) return
    const next = !open
    if (next) peek.hide()
    setOpen(next)
  }

  // Превью у курсора: только мышь, только над закрытой строкой и не в режиме инспектора.
  function onEnter(e: PointerEvent) {
    if (open || ui.inspecting.current) return
    peek.show(p, e.clientX, e.clientY)
  }
  function onMove(e: PointerEvent) {
    if (open) peek.hide()
    else peek.move(e.clientX, e.clientY)
  }

  return (
    <li
      className={open ? 'project rv open' : 'project rv'}
      style={{ '--pc': p.color } as CSSProperties}
      onPointerEnter={onEnter}
      onPointerMove={onMove}
      onPointerLeave={peek.leave}
    >
      <button
        className="project-toggle"
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        data-ins={index === 0 ? '<ProjectRow>' : undefined}
        onClick={toggle}
      >
        <span className="project-year">{p.year}</span>
        <span className="project-name">
          <i aria-hidden="true"></i>
          {p.name}
        </span>
        <span className="project-desc">{p.summary}</span>
        <span className="project-role">{p.role}</span>
        <span className="project-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>
      <div className="project-panel" id={panelId}>
        <div>
          <div className="grid-12 project-body">
            <ProjectMedia project={p} />
            <ProjectFacts project={p} />
          </div>
        </div>
      </div>
    </li>
  )
}
