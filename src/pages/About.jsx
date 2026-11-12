import PageHero from '../PageHero.jsx'
import Section from '../Section.jsx'
import { values, focus } from '../data.js'

export default function About() {
  return (
    <>
      <PageHero variant="about" title="Who We Are" sub="A multi-disciplinary industrial and infrastructure contracting company" />
      <Section title="Company Overview">
        <p className="wide">FAROHA Contracting Company LLC is a Saudi Arabia-based contracting company focused on integrated technical and industrial services. We support projects across civil, structural, mechanical, electrical, piping and infrastructure works. Our approach is built around responsive execution, practical engineering, coordinated site delivery and long-term client relationships.</p>
        <div className="grid g2 mt2">
          <div className="card"><h3>Our Vision</h3><p>To be a trusted contracting partner contributing to resilient industrial assets, high-performing infrastructure and sustainable development in Saudi Arabia.</p></div>
          <div className="card"><h3>Our Mission</h3><p>To deliver safe, efficient and quality-driven construction and maintenance solutions through skilled people, responsible practices and disciplined execution.</p></div>
        </div>
      </Section>
      <Section alt title="Our Values">
        <div className="values">{values.map(([t, d]) => <div key={t} className="value"><b>{t}</b><span>{d}</span></div>)}</div>
      </Section>
      <Section title="Our Operating Focus">
        <ul className="tags big">{focus.map(f => <li key={f}>{f}</li>)}</ul>
      </Section>
    </>
  )
}
