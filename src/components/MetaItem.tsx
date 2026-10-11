import type { ReactNode } from 'react'

type Props = {
  icon: ReactNode
  caption: string
  children: ReactNode
  /** подпись компонента для инспектора (data-ins) */
  ins?: string
  valueId?: string
  valueClassName?: string
}

// Пункт меты в герое: плашка с иконкой, подпись и значение.
export default function MetaItem({ icon, caption, children, ins, valueId, valueClassName }: Props) {
  return (
    <div data-ins={ins}>
      <span className="meta-icon" aria-hidden="true">
        {icon}
      </span>
      <span className="meta-text">
        <span className="caption">{caption}</span>
        <b id={valueId} className={valueClassName}>
          {children}
        </b>
      </span>
    </div>
  )
}
