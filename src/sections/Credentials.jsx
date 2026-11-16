import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Keyboard } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { ArrowRight, X, Expand } from 'lucide-react'
import { Eyebrow, Lines } from '../components/animations.jsx'
import { certificates } from '../data/certificates.js'

export default function Credentials({ n }) {
  const [zoom, setZoom] = useState(null)
  useEffect(() => { const k = e => e.key === 'Escape' && setZoom(null); addEventListener('keydown', k); return () => removeEventListener('keydown', k) }, [])
  useEffect(() => { zoom ? window.__lenis?.stop() : window.__lenis?.start() }, [zoom])
  return (
    <section className="sec paper cred">
      <div className="wrap">
        <Eyebrow n={n}>Credentials</Eyebrow>
        <Lines text={'Registered, licensed\nand verified.'} className="h-xl" />
        <Swiper className="cswiper" modules={[Navigation, Pagination, Keyboard]} navigation pagination={{ clickable: true }} keyboard grabCursor slidesPerView={1.08} spaceBetween={24} breakpoints={{ 900: { slidesPerView: 1.5, spaceBetween: 40 } }}>
          {certificates.map(c => (
            <SwiperSlide key={c.title}>
              <article className="ccard">
                <button className="cframe" onClick={() => setZoom(c)} aria-label={`View ${c.title} full size`}><img src={c.img} alt={`${c.title} — ${c.issuer}`} loading="lazy" /><span><Expand size={16} /> Enlarge</span></button>
                <div className="cbody"><h3>{c.title}</h3><p>{c.issuer}</p>
                  <dl>{c.facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl></div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
        <p className="more"><Link to="/certificates" className="ulink">All certificates <ArrowRight size={16} /></Link></p>
      </div>
      {zoom && <div className="lightbox" data-lenis-prevent onClick={() => setZoom(null)} role="dialog" aria-modal="true" aria-label={zoom.title}><button className="close" aria-label="Close"><X size={30} /></button><img src={zoom.img} alt={zoom.title} onClick={e => e.stopPropagation()} /></div>}
    </section>
  )
}
