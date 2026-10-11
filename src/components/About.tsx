import { aboutParagraphs, portraitCaption } from '../data/about'
import Stack from './Stack'

/** `portraitSrc` - адрес фото. Пока его нет, на месте фото стоит заглушка. */
export default function About({ portraitSrc }: { portraitSrc?: string }) {
  return (
    <section className="sec wrap" id="about" aria-labelledby="aboutH">
      <div className="grid-12 section-head">
        <h2 id="aboutH">Обо мне</h2>
        <span className="caption">Коротко и по делу</span>
      </div>
      <div className="grid-12 about">
        <figure className="portrait rv" data-ins="<Portrait>">
          {portraitSrc ? (
            <img
              src={portraitSrc}
              alt={portraitCaption}
              width={800}
              height={1000}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="photo-placeholder" role="img" aria-label="Место для фото">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="8.5" r="4" />
                <path d="M4 20.5c.8-4 4-6.5 8-6.5s7.2 2.5 8 6.5" />
              </svg>
            </div>
          )}
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
