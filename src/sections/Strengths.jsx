import { Eyebrow, Lines, Counter, Reveal } from '../components/animations.jsx'

// Only facts that appear in the company profile / certificates.
const stats = [
  [12, 'Core specialties', 'Civil, structural, mechanical, electrical, piping and infrastructure works.'],
  [4, 'Service disciplines', 'Construction, piping systems, building & plant services, maintenance.'],
  [4, 'Delivery steps', 'From scope and risk review through to close-out and handover.'],
  [2, 'Official registrations', 'Commercial Registration and VAT registration certificates.'],
]

export default function Strengths({ n }) {
  return (
    <section className="sec navy">
      <div className="wrap">
        <Eyebrow n={n} light>Our strengths</Eyebrow>
        <Lines text="Capability, organised." className="h-xl" />
        <div className="strength-grid">
          {stats.map(([v, l, d], i) => (
            <Reveal key={l} delay={i * .1}><b><Counter to={v} /></b><h3>{l}</h3><p>{d}</p></Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
