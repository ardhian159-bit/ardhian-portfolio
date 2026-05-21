import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import StatsBar from '@/components/sections/StatsBar'
import Projects from '@/components/sections/Projects'
import Experience from '@/components/sections/Experience'
import Skills from '@/components/sections/Skills'
import Contact from '@/components/sections/Contact'

export default function Page() {
  return (
    <>
      <a id="top" />
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <a id="work" />
        <Projects />
        <a id="experience" />
        <Experience />
        <a id="skills" />
        <Skills />
        <a id="contact" />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
