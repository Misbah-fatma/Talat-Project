import PageHero from '../PageHero.jsx'
import Section from '../Section.jsx'
import { specialties } from '../data.js'

export default function Services() {
  return (
    <>
      <PageHero variant="services" title="Core Specialties" sub="Integrated solutions across construction, industry and infrastructure" />
      <Section>
        <div className="grid">
          {specialties.map(([t, d], i) => <div className="card svc" key={t}><span className="num">{String(i + 1).padStart(2, '0')}</span><h3>{t}</h3><p>{d}</p></div>)}
        </div>
      </Section>
    </>
  )
}
