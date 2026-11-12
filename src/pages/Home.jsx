import { Link } from 'react-router-dom'
import Hero3D from '../Hero3D.jsx'
import Section from '../Section.jsx'
import { company, specialties, support, steps, values, focus } from '../data.js'

const stats = [['12', 'Core Specialties'], ['4', 'Step Delivery Approach'], ['24/7', 'Responsive Support'], ['KSA', 'Based in Al Jubail']]
const More = ({ to, children }) => <p className="center"><Link className="btn gold" to={to}>{children}</Link></p>

export default function Home() {
  return (
    <>
      <section className="hero">
        <Hero3D />
        <div className="container hero-in">
          <p className="eyebrow">Engineering | Construction | Technical & Industrial Services</p>
          <h1><span className="w">Building</span> <span className="w d1">With</span> <span className="gold-t w d2">Purpose</span></h1>
          <p className="lead">Industrial contracting, infrastructure, maintenance and support from Al Jubail, Eastern Province, Kingdom of Saudi Arabia.</p>
          <div className="cta"><Link className="btn gold" to="/services">Our Services</Link><Link className="btn ghost" to="/contact">Get in Touch</Link></div>
          <div className="pills">{['Safety', 'Quality', 'Responsibility', 'Sustainable Growth'].map(p => <span key={p}>{p}</span>)}</div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true"><div className="track">{[...specialties, ...specialties].map(([t], i) => <span key={i}>{t}<i>◆</i></span>)}</div></div>

      <section className="stats"><div className="container statgrid">{stats.map(([n, l]) => <div key={l}><b>{n}</b><span>{l}</span></div>)}</div></section>

      {/* About — short */}
      <Section title="Who We Are" sub="A multi-disciplinary industrial and infrastructure contracting company">
        <p className="wide">FAROHA Contracting Company LLC is a Saudi Arabia-based contracting company focused on integrated technical and industrial services across civil, structural, mechanical, electrical, piping and infrastructure works.</p>
        <div className="grid g3 mt2">
          <div className="card"><h3>Our Vision</h3><p>A trusted contracting partner contributing to resilient industrial assets and sustainable development in Saudi Arabia.</p></div>
          <div className="card"><h3>Our Mission</h3><p>Safe, efficient and quality-driven construction and maintenance through skilled people and disciplined execution.</p></div>
          <div className="card"><h3>Our Values</h3><ul className="tight">{values.slice(0, 4).map(([t]) => <li key={t}>{t}</li>)}<li>…and more</li></ul></div>
        </div>
        <More to="/about">More About Us</More>
      </Section>

      {/* Services — all 12 as compact tiles */}
      <Section alt title="Core Specialties" sub="Integrated solutions across construction, industry and infrastructure">
        <div className="mini">
          {specialties.map(([t], i) => <Link to="/services" className="mini-tile card" key={t}><span className="num">{String(i + 1).padStart(2, '0')}</span><b>{t}</b></Link>)}
        </div>
        <More to="/services">Service Details</More>
      </Section>

      {/* Support — short */}
      <Section title="Industrial & Project Support" sub="Flexible site execution and project delivery services">
        <div className="grid g3">{support.map(([t]) => <div className="card" key={t}><h3>{t}</h3></div>)}</div>
        <div className="steps mt2">{steps.map((s, i) => <div key={i} className="step"><span>{i + 1}</span><p>{s}</p></div>)}</div>
        <More to="/support">Project Support Details</More>
      </Section>

      {/* HSE — short */}
      <Section alt title="Sustainability & HSE" sub="Responsible construction for long-term value">
        <div className="grid g3">
          <div className="card"><h3>Sustainable Construction</h3><p>Efficient material planning, water-conscious methods, waste segregation and lifecycle-minded solutions.</p></div>
          <div className="card"><h3>Health, Safety & Environment</h3><p>Risk assessments, permit-to-work, toolbox talks, suitable PPE and incident reporting.</p></div>
          <div className="card"><h3>Quality Commitment</h3><p>Execution against approved drawings and specifications with material traceability and documented handover.</p></div>
        </div>
        <More to="/hse">HSE Details</More>
      </Section>

      {/* Certificates — thumbnails */}
      <Section title="Certificates" sub="Official company registrations">
        <div className="thumbs">
          <Link to="/certificates" className="card thumb"><img src="/certificates/commercial-registration.jpg" alt="Commercial Registration" loading="lazy" /><b>Commercial Registration</b></Link>
          <Link to="/certificates" className="card thumb"><img src="/certificates/vat-certificate.jpg" alt="VAT Registration Certificate" loading="lazy" /><b>VAT Registration Certificate</b></Link>
        </div>
        <More to="/certificates">View Certificates</More>
      </Section>

      {/* Contact — short */}
      <Section alt title="Contact Us" sub="Connect with our team for contracting and industrial service requirements">
        <div className="two">
          <div className="card">
            <h3>{company.name} {company.full}</h3>
            <p>{company.address[0]}<br />{company.address[1]}</p>
            <p><b>Mobile:</b> <a href={`tel:${company.mobile.replace(/\s/g, '')}`}>{company.mobile}</a></p>
            <p><b>Email:</b> {company.emails.map((e, i) => <span key={e}>{i > 0 && ' | '}<a href={`mailto:${e}`}>{e}</a></span>)}</p>
            <p><b>C.R.:</b> {company.cr} &nbsp; <b>VAT:</b> {company.vat}</p>
          </div>
          <div className="card">
            <h3>Our Operating Focus</h3>
            <ul className="tags">{focus.map(f => <li key={f}>{f}</li>)}</ul>
            <p className="mt2"><Link className="btn gold" to="/contact">Send an Enquiry</Link></p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="banner big">Practical engineering. Safer sites. Responsible resources. Reliable outcomes.
          <div><Link className="btn gold" to="/contact">Request a Quote</Link></div></div>
      </Section>
    </>
  )
}
