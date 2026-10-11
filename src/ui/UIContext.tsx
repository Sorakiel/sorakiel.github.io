import { useState, type ReactNode } from 'react'

import { createUIStore, UIContext } from './store'

/** Один раз создаёт хранилище интерфейса и отдаёт его через контекст. Хуки - в `useUI.ts`. */
export function UIProvider({ children }: { children: ReactNode }) {
  const [store] = useState(createUIStore)
  return <UIContext.Provider value={store}>{children}</UIContext.Provider>
}
