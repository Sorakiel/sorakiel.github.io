import MetaItem from './MetaItem'

// Заглушка PR 1: итоговая разметка героя. Кварц, PR 2: проверка анимации строк и кнопок по эталону.
export default function Hero() {
  return (
    <section className="hero wrap" aria-label="Обо мне коротко">
      <div className="grid-12 meta">
        <MetaItem
          ins="<MetaItem>"
          caption="Кто"
          icon={
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="3.6" />
              <path d="M5 20c.9-3.7 3.6-5.6 7-5.6s6.1 1.9 7 5.6" />
            </svg>
          }
        >
          Frontend-разработчик
        </MetaItem>
        <MetaItem
          caption="Где"
          icon={
            <svg viewBox="0 0 24 24">
              <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
              <circle cx="12" cy="10" r="2.3" />
            </svg>
          }
        >
          Москва · удалённо или гибрид
        </MetaItem>
        <MetaItem
          caption="На чём"
          icon={
            <svg viewBox="0 0 24 24">
              <path d="M8.5 7L3.5 12l5 5M15.5 7l5 5-5 5M13.5 4.5l-3 15" />
            </svg>
          }
        >
          React · TypeScript · Vite
        </MetaItem>
        <MetaItem
          caption="Сейчас"
          icon={<i className="live"></i>}
          valueId="status"
          valueClassName="status"
        >
          Открыт к предложениям
        </MetaItem>
      </div>
      <div className="grid-12">
        <h1 className="title" id="title">
          <span className="ln">
            <span>Собираю интерфейсы,</span>
          </span>
          <span className="ln">
            <span>в которых видно</span>
          </span>
          <span className="ln">
            <span>
              <em>каждую деталь.</em>
            </span>
          </span>
        </h1>
      </div>
      <div className="grid-12 hero-low">
        <p className="lead">
          Около двух лет делаю сайты и веб-приложения на <b>React и TypeScript</b>. Веду фронтенд
          сервиса парковок <b>Parkovich</b> и развиваю собственный продукт <b>Almanac</b>: от
          первого макета до анимации, офлайна и тестов.
        </p>
        <div className="cta">
          <a className="btn btn-a" id="ctaWork" href="#work">
            Смотреть работы{' '}
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 5v14M6 13l6 6 6-6" />
            </svg>
          </a>
          <a className="btn btn-b" href="#contact">
            Связаться
          </a>
        </div>
      </div>
    </section>
  )
}
