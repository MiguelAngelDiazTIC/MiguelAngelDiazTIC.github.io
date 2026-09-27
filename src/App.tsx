import { useEffect } from 'react'
import { BentoGrid } from './components/BentoGrid'
import { Contact, Footer } from './components/Contact'
import { Experience } from './components/Experience'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { TechTests } from './components/TechTests'
import { useTheme } from './useTheme'
import { useLang } from './i18n/useLang'
import { startMotion } from './motion'

function App() {
  const { theme, toggle } = useTheme()
  const { t } = useLang()

  useEffect(() => startMotion(), [])

  return (
    <>
      <a className="skip-link" href="#contenido">
        {t('skipToContent')}
      </a>
      <Navbar theme={theme} onToggleTheme={toggle} />
      <main id="contenido" tabIndex={-1}>
        <Hero />
        <BentoGrid />
        <Projects />
        <TechTests />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
