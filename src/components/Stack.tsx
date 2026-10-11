import { stack } from '../data/stack'

// Заглушка PR 1: итоговая разметка dl.stack. Лён, PR 5: проверка по эталону.
export default function Stack() {
  return (
    <dl className="stack rv" data-ins="<Stack>">
      {stack.map((group) => (
        <div key={group.label}>
          <dt className="caption">{group.label}</dt>
          <dd>{group.text}</dd>
        </div>
      ))}
    </dl>
  )
}
