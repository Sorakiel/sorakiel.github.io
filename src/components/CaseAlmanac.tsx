import { almanacCase } from '../data/cases'
import Case from './Case'

// Заглушка PR 1. Лён, PR 4: целиком по SPEC §6.4 (данные в data/cases.ts).
export default function CaseAlmanac() {
  return (
    <Case id={almanacCase.id} headingId={almanacCase.headingId} ins="<Case almanac>">
      <div className="grid-12 case-head">
        <h3 id={almanacCase.headingId}>{almanacCase.title}</h3>
      </div>
    </Case>
  )
}
