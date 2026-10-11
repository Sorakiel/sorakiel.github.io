import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@fontsource/wix-madefor-display/500.css'
import '@fontsource/wix-madefor-display/600.css'
import '@fontsource/wix-madefor-display/700.css'
import '@fontsource/wix-madefor-display/800.css'
import '@fontsource/wix-madefor-text/400.css'
import '@fontsource/wix-madefor-text/500.css'
import '@fontsource/wix-madefor-text/600.css'
import '@fontsource/martian-mono/400.css'
import '@fontsource/martian-mono/500.css'

import './styles/tokens.css'
import './styles/base.css'
import './styles/header.css'
import './styles/hero.css'
import './styles/work.css'
import './styles/case.css'
import './styles/about.css'
import './styles/contact.css'
import './styles/inspector.css'
import './styles/lightbox.css'
import './styles/peek.css'
import './styles/toast.css'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
