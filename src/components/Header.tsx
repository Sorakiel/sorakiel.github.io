// Заглушка PR 1: итоговая разметка шапки без поведения.
// Кварц, PR 2: прилипание и линия при прокрутке (.sc), тема с круговой заливкой.
// Кварц, PR 6: кнопка инспектора (aria-pressed, клавиша I).
export default function Header() {
  return (
    <header className="hdr" id="hdr">
      <div className="wrap">
        <a className="me" href="#top" aria-label="Никита Васильев, наверх">
          <span className="mk" aria-hidden="true">
            НВ
          </span>
          <span>Никита Васильев</span>
        </a>
        <nav className="nav" aria-label="Разделы">
          <a href="#work">Работы</a>
          <a href="#about">Обо мне</a>
          <a href="#contact">Контакты</a>
        </nav>
        <div className="tools">
          <button
            className="ibtn"
            id="insBtn"
            type="button"
            aria-pressed="false"
            title="Инспектор: как свёрстана страница (клавиша I)"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 9V5a1 1 0 0 1 1-1h4M20 9V5a1 1 0 0 0-1-1h-4M4 15v4a1 1 0 0 0 1 1h4" />
              <path d="M12 12l8 3-3.5 1.5L15 20z" />
            </svg>
            <span className="tx">Инспектор</span>
            <kbd>I</kbd>
          </button>
          <button className="ibtn round" id="themeBtn" type="button" aria-label="Сменить тему">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="8" />
              <path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor" stroke="none" />
            </svg>
          </button>
          <a className="btn btn-a" href="#contact">
            Написать
          </a>
        </div>
      </div>
    </header>
  )
}
