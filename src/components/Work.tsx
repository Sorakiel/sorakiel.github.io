import CaseAlmanac from './CaseAlmanac'
import CaseParkovich from './CaseParkovich'

// Заглушка PR 1: итоговая оболочка раздела. Ясень, PR 3: список проектов в ol#rows
// (ProjectRow, ProjectMedia, ProjectFacts). Кейсы ниже делает Лён, PR 4.
export default function Work() {
  return (
    <section className="sec wrap" id="work" aria-labelledby="workH">
      <div className="grid-12 section-head">
        <h2 id="workH" data-ins="section#work">
          Работы
        </h2>
        <span className="caption">5 проектов · 2024 - сейчас</span>
      </div>
      <ol className="projects" id="rows"></ol>
      <CaseAlmanac />
      <CaseParkovich />
    </section>
  )
}
