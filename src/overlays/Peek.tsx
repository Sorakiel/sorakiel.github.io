// Заглушка. Ясень, PR 3: превью у курсора. Позиция и появление через ref и rAF, без стейта React
// (SPEC §6.3). Содержимое: div.preview.pv-img > img.
export default function Peek() {
  return <div className="cursor-preview" id="peek" aria-hidden="true"></div>
}
