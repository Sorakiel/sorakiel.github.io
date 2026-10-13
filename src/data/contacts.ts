// Строки блока «Контакты». Тексты из docs/redesign/reference/src/markup.html.

export type Contact = {
  label: string
  value: string
  /** если есть - значение это ссылка в новой вкладке */
  href?: string
  /** что кладёт в буфер кнопка «Скопировать» */
  copy?: string
  /** кнопка «Открыть» (ссылка в новой вкладке) */
  open?: string
  /** значение-заглушка, ждёт ссылку от Никиты */
  placeholder?: boolean
}

export const contacts: Contact[] = [
  {
    label: 'Telegram',
    value: '@sorakield',
    href: 'https://t.me/sorakield',
    copy: '@sorakield',
  },
  {
    label: 'Почта',
    value: 'sorakield@gmail.com',
    copy: 'sorakield@gmail.com',
  },
  {
    label: 'GitHub',
    value: 'github.com/Sorakiel',
    href: 'https://github.com/Sorakiel',
    open: 'https://github.com/Sorakiel',
  },
  {
    label: 'ВКонтакте',
    value: 'vk.com/sorakiel',
    href: 'https://vk.com/sorakiel',
    open: 'https://vk.com/sorakiel',
  },
  {
    label: 'Резюме',
    value: 'Скачать PDF',
    href: '/nikita-vasilev-resume.pdf',
    open: '/nikita-vasilev-resume.pdf',
  },
]

export const footer = {
  copyright: '© 2026 Никита Васильев',
  hint: 'Свёрстано вручную. Нажмите I, чтобы посмотреть как.',
}
