import { aboutParagraphs, portraitCaption } from '../data/about'
import Stack from './Stack'

// Заглушка PR 1: оболочка раздела. Лён, PR 5: портрет-заглушка с поддержкой `src`
// (figure.portrait > img вместо div.photo-placeholder), абзацы, стек (SPEC §6.6).
export default function About() {
  return (
    <section className="sec wrap" id="about" aria-labelledby="aboutH">
      <div className="grid-12 section-head">
        <h2 id="aboutH">Обо мне</h2>
        <span className="caption">Коротко и по делу</span>
      </div>
      <div className="grid-12 about">
        <figure className="portrait rv" data-ins="<Portrait>">
          <figcaption>{portraitCaption}</figcaption>
        </figure>
        <div className="about-text rv">
          {aboutParagraphs.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
        <Stack />
      </div>
    </section>
  )
}
