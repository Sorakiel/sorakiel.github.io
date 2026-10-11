import { contacts, footer } from '../data/contacts'
import ContactRow from './ContactRow'

export default function Contact() {
  return (
    <section className="contact wrap" id="contact" aria-labelledby="contactH">
      <h2 className="big" id="contactH" data-ins="h2.big">
        Напишите
        <br />
        мне.
      </h2>
      <div className="clist">
        {contacts.map((contact) => (
          <ContactRow key={contact.label} contact={contact} />
        ))}
      </div>
      <div className="foot">
        <span>{footer.copyright}</span>
        <span>{footer.hint}</span>
      </div>
    </section>
  )
}
