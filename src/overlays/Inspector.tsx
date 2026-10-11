// Заглушка PR 1: слои инспектора. Кварц, PR 6: сетка, три рамки, подсказка, HUD, курсор
// вступления; логика в lib/inspector.ts и lib/intro.ts.
// HUD и курсор скрыты, пока нет inspector.css.
export default function Inspector() {
  return (
    <>
      <div className="grid-ov" aria-hidden="true">
        <div className="wrap">
          <div className="grid-12">
            {Array.from({ length: 12 }, (_, i) => (
              <i key={i}></i>
            ))}
          </div>
        </div>
      </div>
      <div className="ins" id="ins" aria-hidden="true">
        <div className="ib-m" id="ibM"></div>
        <div className="ib-p" id="ibP"></div>
        <div className="ib-c" id="ibC"></div>
      </div>
      <div className="tip" id="tip" aria-hidden="true"></div>
      <div className="hud" id="hud" aria-hidden="true" hidden>
        <span id="hudVp">0×0</span>
        <span id="hudY">y 0</span>
        <span>
          <b id="hudFps">60</b> fps
        </span>
      </div>
      <div className="cursor" id="cur" aria-hidden="true" hidden>
        <svg viewBox="0 0 24 24">
          <path
            d="M5 3l14 7-6 1.8L10.5 18z"
            fill="#fff"
            stroke="#111"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </>
  )
}
