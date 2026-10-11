import { projects } from '../data/projects'
import CaseAlmanac from './CaseAlmanac'
import CaseParkovich from './CaseParkovich'
import ProjectRow from './ProjectRow'

// Раздел «Работы»: список проектов, ниже кейсы (PR 4).
export default function Work() {
  return (
    <section className="sec wrap" id="work" aria-labelledby="workH">
      <div className="grid-12 section-head">
        <h2 id="workH" data-ins="section#work">
          Работы
        </h2>
        <span className="caption">5 проектов · 2024 - сейчас</span>
      </div>
      <ol className="projects" id="rows">
        {projects.map((p, i) => (
          <ProjectRow key={p.name} project={p} index={i} />
        ))}
      </ol>
      <CaseAlmanac />
      <CaseParkovich />
    </section>
  )
}
