import PageHero from '../PageHero.jsx'
import Section from '../Section.jsx'
import { support, steps } from '../data.js'

export default function Support() {
  return (
    <>
      <PageHero variant="support" title="Industrial & Project Support" sub="Flexible site execution and project delivery services" />
      <Section>
        <div className="grid g3">{support.map(([t, d]) => <div className="card" key={t}><h3>{t}</h3><p>{d}</p></div>)}</div>
      </Section>
      <Section alt title="Project Delivery Approach">
        <div className="steps">{steps.map((s, i) => <div key={i} className="step"><span>{i + 1}</span><p>{s}</p></div>)}</div>
      </Section>
    </>
  )
}
