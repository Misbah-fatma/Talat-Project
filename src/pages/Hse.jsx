import PageHero from '../PageHero.jsx'
import Section from '../Section.jsx'
import { sustain, hse, quality } from '../data.js'

export default function Hse() {
  return (
    <>
      <PageHero variant="hse" title="Sustainability & HSE" sub="Responsible construction for long-term value" />
      <Section>
        <div className="grid g3">
          <div className="card"><h3>Sustainable Construction</h3><ul>{sustain.map(s => <li key={s}>{s}</li>)}</ul></div>
          <div className="card"><h3>Health, Safety & Environment</h3><ul>{hse.map(s => <li key={s}>{s}</li>)}</ul></div>
          <div className="card"><h3>Quality Commitment</h3><ul>{quality.map(s => <li key={s}>{s}</li>)}</ul></div>
        </div>
        <div className="banner">Practical engineering. Safer sites. Responsible resources. Reliable outcomes.</div>
      </Section>
    </>
  )
}
