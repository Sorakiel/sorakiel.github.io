import { Fragment, type ReactNode } from 'react'

import type { Project } from '../data/projects'

function Row({
  label,
  className,
  children,
}: {
  label: string
  className?: string
  children: ReactNode
}) {
  return (
    <div className={className ? `pb-row ${className}` : 'pb-row'}>
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  )
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="pb-list">
      {items.map((x) => (
        <li key={x}>{x}</li>
      ))}
    </ul>
  )
}

/** Таблица в открытой строке: о проекте, задачи, что сделал, ключевое, стек, период, ссылки. */
export default function ProjectFacts({ project: p }: { project: Project }) {
  return (
    <dl className="pb">
      <Row label="О проекте" className="pb-lead">
        {p.lead}
      </Row>
      <Row label="Задачи">
        <List items={p.tasks} />
      </Row>
      <Row label="Что сделал">
        <List items={p.done} />
      </Row>
      {p.key && (
        <Row label="Ключевое" className="pb-key">
          {p.key}
        </Row>
      )}
      <Row label="Стек">
        <span className="chips">
          {p.stack.map((x) => (
            <span key={x}>{x}</span>
          ))}
        </span>
      </Row>
      <Row label="Период">{p.period}</Row>
      {p.links && (
        <Row label="Ссылки">
          {p.links.map((l, i) => (
            <Fragment key={l.href}>
              {i > 0 && ' · '}
              <a href={l.href} target="_blank" rel="noopener">
                {l.label}
              </a>
            </Fragment>
          ))}
        </Row>
      )}
      {p.caseId && (
        <div className="pb-row pb-foot">
          <dt></dt>
          <dd>
            <a className="pb-more" href={`#${p.caseId}`}>
              Подробнее в кейсе ниже <span aria-hidden="true">↓</span>
            </a>
          </dd>
        </div>
      )}
    </dl>
  )
}
