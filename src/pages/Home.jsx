import Hero from '../sections/Hero.jsx'
import TrustBar from '../sections/TrustBar.jsx'
import Overview from '../sections/Overview.jsx'
import Strengths from '../sections/Strengths.jsx'
import Industries from '../sections/Industries.jsx'
import ServicesPanels from '../sections/ServicesPanels.jsx'
import Portfolio from '../sections/Portfolio.jsx'
import Values from '../sections/Values.jsx'
import Process from '../sections/Process.jsx'
import Leadership from '../sections/Leadership.jsx'
import People from '../sections/People.jsx'
import Credentials from '../sections/Credentials.jsx'
import Testimonials from '../sections/Testimonials.jsx'
import FAQ from '../sections/FAQ.jsx'
import ContactCTA from '../sections/ContactCTA.jsx'
import usePageMeta from '../hooks/usePageMeta.js'

export default function Home() {
  usePageMeta('', 'FAROHA Contracting Company LLC — civil, structural, mechanical, piping and infrastructure contracting in Al Jubail, Saudi Arabia.')
  let i = 0
  const n = () => `${String(++i).padStart(2, '0')} /`
  return (
    <>
      <Hero />
      <TrustBar />
      <Overview n={n()} />
      <Strengths n={n()} />
      <Industries n={n()} />
      <ServicesPanels n={n()} />
      <Portfolio n={n()} />
      <Values n={n()} />
      <Process n={n()} />
      <Leadership n={n()} />
      <People n={n()} />
      <Credentials n={n()} />
      <Testimonials n={n()} />
      <FAQ n={n()} />
      <ContactCTA />
    </>
  )
}
