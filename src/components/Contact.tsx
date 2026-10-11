// Заглушка PR 1: оболочка раздела. Лён, PR 5: строки (ContactRow, data/contacts.ts) и футер (SPEC §6.7).
export default function Contact() {
  return (
    <section className="contact wrap" id="contact" aria-labelledby="contactH">
      <h2 className="big" id="contactH" data-ins="h2.big">
        Напишите
        <br />
        мне.
      </h2>
      <div className="clist"></div>
    </section>
  )
}
