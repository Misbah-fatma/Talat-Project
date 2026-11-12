import { useState, useEffect } from 'react'
import PageHero from '../PageHero.jsx'
import Section from '../Section.jsx'
import { company } from '../data.js'

const certs = [
  {
    title: 'Commercial Registration', issuer: 'Ministry of Commerce', img: '/certificates/commercial-registration.jpg',
    rows: [['Entity', 'Limited Liability Company (Single Person)'], ['Unified National No.', company.cr], ['Status', 'Active']],
  },
  {
    title: 'VAT Registration Certificate', issuer: 'Zakat, Tax and Customs Authority', img: '/certificates/vat-certificate.jpg',
    rows: [['VAT Number', company.vat], ['Tax Period', 'Quarterly'], ['CR No.', company.cr]],
  },
]

export default function Certificates() {
  const [zoom, setZoom] = useState(null)
  useEffect(() => {
    const k = e => e.key === 'Escape' && setZoom(null)
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k)
  }, [])

  return (
    <>
      <PageHero variant="certificates" title="Certificates" sub="Official company registrations" />
      <Section>
        <div className="certs">
          {certs.map(c => (
            <div className="card cert" key={c.title}>
              <h3>{c.title}</h3>
              <p><b>{c.issuer}</b></p>
              <button className="cert-img" onClick={() => setZoom(c)} aria-label={`View ${c.title} full size`}>
                <img src={c.img} alt={`${c.title} – ${c.issuer}`} loading="lazy" />
                <span>Click to enlarge</span>
              </button>
              <dl>{c.rows.map(([k, v]) => <div className="row" key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
              <a className="btn gold sm" href={c.img} download>Download</a>
            </div>
          ))}
        </div>
      </Section>

      {zoom && (
        <div className="lightbox" onClick={() => setZoom(null)} role="dialog" aria-modal="true">
          <button className="close" aria-label="Close">×</button>
          <img src={zoom.img} alt={zoom.title} onClick={e => e.stopPropagation()} />
        </div>
      )}
    </>
  )
}
