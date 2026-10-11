import type { ReactNode } from 'react'

type Props = {
  id: string
  /** id заголовка h3, на него ссылается aria-labelledby */
  headingId: string
  /** подпись компонента для инспектора (data-ins) */
  ins: string
  children?: ReactNode
}

// Заглушка PR 1: карточка кейса. Лён, PR 4: содержимое (шапка, цифры, заметки, скриншоты, кнопки).
export default function Case({ id, headingId, ins, children }: Props) {
  return (
    <article className="case rv" id={id} aria-labelledby={headingId} data-ins={ins}>
      {children}
    </article>
  )
}
