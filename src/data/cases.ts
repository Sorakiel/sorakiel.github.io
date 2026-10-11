// Кейсы Almanac и Parkovich. Тексты из docs/redesign/reference/src/markup.html.
import type { ShotKey } from './shots'

export type CaseFact = { value: string; text: string }
export type CaseSource = { label: string; href: string }
export type CaseNote = { title: string; text: string; sources?: CaseSource[] }
export type CaseLink = { label: string; href: string; variant: 'a' | 'b' }
export type CaseShot = { key: ShotKey; alt: string }

export type CaseData = {
  id: string
  headingId: string
  title: string
  intro: string
  sub: string
  facts: CaseFact[]
  notes: CaseNote[]
  links: CaseLink[]
  desktop: CaseShot
  phone: CaseShot
  caption: string
}

export const almanacCase: CaseData = {
  id: 'case-almanac',
  headingId: 'featH',
  title: 'Almanac',
  intro:
    'Собственный продукт: модульное приложение для самодисциплины. Ядро - экран «Сегодня» и прогресс, а привычки, тренировки, чтение, фокус и рефлексия подключаются как отдельные модули. Пользователь сам включает нужные и задаёт их порядок. Один код на React работает в браузере, на Android и на компьютере.',
  sub: 'с июля 2026 · v0.6 · React 19 · TypeScript · Supabase · TanStack Query · Capacitor · Tauri',
  desktop: { key: 'al-modules', alt: 'Almanac на десктопе: экран модулей с настройкой порядка' },
  phone: { key: 'al-phone', alt: 'Almanac на телефоне: экран «Сегодня»' },
  caption:
    'Модули на десктопе и «Сегодня» на телефоне. Настоящий интерфейс, данные демонстрационные.',
  facts: [
    { value: '300+', text: 'коммитов с июля 2026, всё сделано одним человеком' },
    { value: '140+', text: "pull request'ов, каждый проходит линтер, типы и тесты в CI" },
    {
      value: '7',
      text: 'модулей на общем ядре: включаются, выключаются и переставляются в настройках',
    },
    { value: '17', text: 'e2e-сценариев Playwright в CI, плюс 46 файлов unit-тестов' },
  ],
  notes: [
    {
      title: 'Офлайн без потерь',
      text: 'Отметка видна сразу. Без сети запись ждёт в очереди, переживает перезапуск и уходит, когда связь вернулась. Если сервер отказал, изменение откатывается.',
      sources: [
        {
          label: 'offlineMutations.ts',
          href: 'https://github.com/Sorakiel/almanac/blob/main/src/lib/offlineMutations.ts',
        },
        {
          label: 'offline-writes.spec.ts',
          href: 'https://github.com/Sorakiel/almanac/blob/main/tests/offline-writes.spec.ts',
        },
      ],
    },
    {
      title: 'Приватность в базе',
      text: 'Каждый видит только свои данные, даже если запрос из интерфейса ошибётся: это проверяет сам Postgres. 91 политика доступа.',
      sources: [
        {
          label: '0001_init.sql',
          href: 'https://github.com/Sorakiel/almanac/blob/main/supabase/migrations/0001_init.sql',
        },
      ],
    },
    {
      title: 'Три платформы из одного кода',
      text: 'Тот же React-код собирается в веб, Android-приложение и десктоп. Обновления приходят без переустановки.',
      sources: [
        {
          label: 'capacitor.config.ts',
          href: 'https://github.com/Sorakiel/almanac/blob/main/capacitor.config.ts',
        },
        {
          label: 'tauri.conf.json',
          href: 'https://github.com/Sorakiel/almanac/blob/main/src-tauri/tauri.conf.json',
        },
      ],
    },
  ],
  links: [
    {
      label: 'Открыть Almanac',
      href: 'https://almanac-sorakiels-projects.vercel.app',
      variant: 'a',
    },
    { label: 'Код на GitHub', href: 'https://github.com/Sorakiel/almanac', variant: 'b' },
  ],
}

export const parkovichCase: CaseData = {
  id: 'case-parkovich',
  headingId: 'featH2',
  title: 'Parkovich',
  intro:
    'Сервис поиска свободных парковочных мест для «умного города». Делаю фронтенд целиком: веб-приложение с картой, сайт и письма.',
  sub: 'май 2025 - сейчас · React 19 · TypeScript · Vite · React Router · Ant Design · Docker · nginx',
  desktop: { key: 'pk-site', alt: 'Сайт parkovich.ru' },
  phone: {
    key: 'pk-phone',
    alt: 'Экран веб-приложения Parkovich: схема парковки со свободными и занятыми местами',
  },
  caption: 'Сайт parkovich.ru и экран приложения со схемой парковки.',
  facts: [
    { value: '1,5', text: 'года во фронтенде сервиса, с мая 2025' },
    {
      value: '2',
      text: 'продукта: веб-приложение на parkovich.ru/app и сайт с мобильными версиями',
    },
    { value: '5', text: 'навигаторов для маршрута: Яндекс Карты и Навигатор, Google, 2ГИС, Apple' },
    { value: '100+', text: 'моих коммитов в веб-приложении, сайте и шаблоне письма' },
  ],
  notes: [
    {
      title: 'Своя карта парковки',
      text: 'Зоны и ряды мест рисуются по координатам из API собственным SVG-рендером, без картографических библиотек. Зум колесом и щипком, карта не уезжает за границы.',
    },
    {
      title: 'Живые статусы',
      text: 'Свободные места обновляются каждые 5 секунд, у парковки есть график занятости и время последнего обновления.',
    },
    {
      title: 'Продуктовая аналитика',
      text: 'События открытия карты, показа мест, маршрутов и ошибок загрузки уходят на бэкенд, чтобы команда видела, как сервисом пользуются.',
    },
  ],
  links: [
    { label: 'Открыть приложение', href: 'https://parkovich.ru/app', variant: 'a' },
    { label: 'Сайт parkovich.ru', href: 'https://parkovich.ru', variant: 'b' },
  ],
}
