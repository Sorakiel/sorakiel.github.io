import type { Contact } from '../data/contacts'
import { useUI } from '../ui/useUI'

/** Строка контактов: подпись, значение (ссылка, текст или заглушка) и действие («Скопировать» или «Открыть»). */
export default function ContactRow({ contact }: { contact: Contact }) {
  const ui = useUI()

  function copy(value: string) {
    const done = () => ui.toast('Скопировано: ' + value)
    const fail = () => ui.toast(value)
    try {
      navigator.clipboard.writeText(value).then(done, fail)
    } catch {
      fail()
    }
  }

  let value: React.ReactNode = contact.value
  if (contact.placeholder) value = <span className="ph">{contact.value}</span>
  else if (contact.href)
    value = (
      <a href={contact.href} target="_blank" rel="noopener">
        {contact.value}
      </a>
    )

  return (
    <div className="contact-row">
      <span className="caption">{contact.label}</span>
      <span className="contact-value">{value}</span>
      <span className="contact-action">
        {contact.copy !== undefined && (
          <button
            className="pill"
            type="button"
            data-copy={contact.copy}
            onClick={() => copy(contact.copy!)}
          >
            Скопировать
          </button>
        )}
        {contact.open && (
          <a className="pill" href={contact.open} target="_blank" rel="noopener">
            Открыть
          </a>
        )}
      </span>
    </div>
  )
}
