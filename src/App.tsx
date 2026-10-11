import About from './components/About'
import Contact from './components/Contact'
import Header from './components/Header'
import Hero from './components/Hero'
import Work from './components/Work'
import Inspector from './overlays/Inspector'
import Lightbox from './overlays/Lightbox'
import Peek from './overlays/Peek'
import Toast from './overlays/Toast'
import { UIProvider } from './ui/UIContext'

export default function App() {
  return (
    <UIProvider>
      <Header />
      <main id="top">
        <Hero />
        <Work />
        <About />
        <Contact />
      </main>
      <Inspector />
      <Peek />
      <Lightbox />
      <Toast />
    </UIProvider>
  )
}
