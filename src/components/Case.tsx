import type { KeyboardEvent, MouseEvent, ReactNode } from 'react'

import type { CaseData, CaseNote, CaseShot as CaseShotData } from '../data/cases'
import { shots } from '../data/shots'
import { useUI } from '../ui/useUI'

type Props = {
  data: CaseData
  /** подпись компонента для инспектора (data-ins) */
  ins: string
  /** всё между шапкой и кнопками: у каждого кейса свой порядок */
  children: ReactNode
}

/** Карточка кейса: шапка, содержимое кейса и кнопки-ссылки (SPEC §6.4, §6.5). */
export default function Case({ data, ins, children }: Props) {
  return (
    <article className="case rv" id={data.id} aria-labelledby={data.headingId} data-ins={ins}>
      <div className="grid-12 case-head">
        <h3 id={data.headingId}>{data.title}</h3>
        <p>{data.intro}</p>
        <span className="sub">{data.sub}</span>
      </div>
      {children}
      <div className="case-links">
        {data.links.map((link) => (
          <a
            key={link.href}
            className={`btn btn-${link.variant}`}
            href={link.href}
            target="_blank"
            rel="noopener"
          >
            {link.label}
          </a>
        ))}
      </div>
    </article>
  )
}

/** Четыре цифры кейса. */
export function CaseFacts({ data }: { data: CaseData }) {
  return (
    <div className="grid-12 facts">
      {data.facts.map((fact) => (
        <div key={fact.value}>
          <b>{fact.value}</b>
          <span>{fact.text}</span>
        </div>
      ))}
    </div>
  )
}

/** Заметки кейса; у Almanac под текстом ссылки на файлы в коде. */
export function CaseNotes({
  notes,
  className = 'notes',
}: {
  notes: CaseNote[]
  className?: string
}) {
  return (
    <div className={className}>
      {notes.map((note) => (
        <div key={note.title}>
          <h4>{note.title}</h4>
          <p>{note.text}</p>
          {note.sources && (
            <div className="srcs">
              {note.sources.map((source) => (
                <a
                  key={source.href}
                  className="src"
                  href={source.href}
                  target="_blank"
                  rel="noopener"
                >
                  {source.label}
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

/** Скриншот кейса: открывается в лайтбоксе по клику, Enter и Space. */
export function CaseShot({ shot, className }: { shot: CaseShotData; className: string }) {
  const ui = useUI()
  const { src, width, height } = shots[shot.key]

  function open(e: MouseEvent<HTMLImageElement> | KeyboardEvent<HTMLImageElement>) {
    ui.openLightbox(src, shot.alt, e.currentTarget)
  }

  return (
    <img
      className={`${className} zoomable`}
      src={src}
      width={width}
      height={height}
      alt={shot.alt}
      role="button"
      tabIndex={0}
      loading="lazy"
      decoding="async"
      onClick={open}
      onKeyDown={(e) => {
        if (e.key !== 'Enter' && e.key !== ' ') return
        e.preventDefault()
        open(e)
      }}
    />
  )
}
