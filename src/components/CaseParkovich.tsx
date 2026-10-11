import { parkovichCase } from '../data/cases'
import Case from './Case'

// Заглушка PR 1. Лён, PR 4: целиком по SPEC §6.5 (данные в data/cases.ts).
export default function CaseParkovich() {
  return (
    <Case id={parkovichCase.id} headingId={parkovichCase.headingId} ins="<Case parkovich>">
      <div className="grid-12 case-head">
        <h3 id={parkovichCase.headingId}>{parkovichCase.title}</h3>
      </div>
    </Case>
  )
}
