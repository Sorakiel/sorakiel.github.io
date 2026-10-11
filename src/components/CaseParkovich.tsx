import { parkovichCase as data } from '../data/cases'
import Case, { CaseFacts, CaseNotes, CaseShot } from './Case'

/** Кейс Parkovich: цифры, заметки слева, сайт и телефон справа (SPEC §6.5). */
export default function CaseParkovich() {
  return (
    <Case data={data} ins="<Case parkovich>">
      <CaseFacts data={data} />
      <div className="case-grid">
        <CaseNotes notes={data.notes} className="notes notes-col" />
        <figure className="shots shots-pk">
          <CaseShot shot={data.desktop} className="shot-d" />
          <CaseShot shot={data.phone} className="shot-ph" />
          <figcaption>{data.caption}</figcaption>
        </figure>
      </div>
    </Case>
  )
}
