import { almanacCase as data } from '../data/cases'
import Case, { CaseFacts, CaseNotes, CaseShot } from './Case'

/** Кейс Almanac: скриншоты, цифры, заметки со ссылками на код (SPEC §6.4). */
export default function CaseAlmanac() {
  return (
    <Case data={data} ins="<Case almanac>">
      <figure className="shots shots-al">
        <CaseShot shot={data.desktop} className="shot-d" />
        <CaseShot shot={data.phone} className="shot-m" />
        <figcaption>{data.caption}</figcaption>
      </figure>
      <CaseFacts data={data} />
      <CaseNotes notes={data.notes} />
    </Case>
  )
}
