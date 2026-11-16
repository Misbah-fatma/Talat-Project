import { useEffect, useState } from 'react'
import { Download, X } from 'lucide-react'
import PageHero from '../components/PageHero.jsx'
import { Reveal } from '../components/animations.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import { company } from '../data/site.js'

const certs = [
  { title: 'Commercial Registration', issuer: 'Ministry of Commerce', img: '/certificates/commercial-registration.jpg', rows: [['Entity', 'Limited Liability Company (Single Person)'], ['Unified National No.', company.cr], ['Status', 'Active']] },
  { title: 'VAT Registration Certificate', issuer: 'Zakat, Tax and Customs Authority', img: '/certificates/vat-certificate.jpg', rows: [['VAT number', company.vat], ['Tax period', 'Quarterly'], ['CR number', company.cr]] },
]

export default function Certificates() {
  usePageMeta('Certificates', 'Commercial Registration and VAT Registration certificates of FAROHA Contracting Company LLC.')
  const [zoom, setZoom] = useState(null)
  useEffect(() => { const k = e => e.key === 'Escape' && setZoom(null); addEventListener('keydown', k); return () => removeEventListener('keydown', k) }, [])
  useEffect(() => { zoom ? window.__lenis?.stop() : window.__lenis?.start() }, [zoom])
  return (
    <>
      <PageHero index="06" crumb="Certificates" title={'Registered\nand verified.'} sub="Official company registrations." />
      <section className="sec beige"><div className="wrap certs">
        {certs.map((c, i) => (
          <Reveal key={c.title} className={`cert${i ? ' off' : ''}`}>
            <button className="cert-img" onClick={() => setZoom(c)} data-cursor="Enlarge" aria-label={`View ${c.title} full size`}><img src={c.img} alt={`${c.title} — ${c.issuer}`} loading="lazy" /></button>
            <h3>{c.title}</h3><p className="small-note">{c.issuer}</p>
            <dl>{c.rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
            <a className="ulink" href={c.img} download><Download size={16} /> Download</a>
          </Reveal>
        ))}
      </div></section>
      {zoom && <div className="lightbox" data-lenis-prevent onClick={() => setZoom(null)} role="dialog" aria-modal="true" aria-label={zoom.title}><button className="close" aria-label="Close"><X size={30} /></button><img src={zoom.img} alt={zoom.title} onClick={e => e.stopPropagation()} /></div>}
    </>
  )
}
