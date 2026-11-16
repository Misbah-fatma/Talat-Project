import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Keyboard } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import PageHero from '../components/PageHero.jsx'
import Photo from '../components/Photo.jsx'
import { Reveal } from '../components/animations.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import { projects } from '../data/projects.js'

export default function ProjectDetails() {
  const { slug } = useParams()
  const i = projects.findIndex(x => x.slug === slug); const p = projects[i]
  const [open, setOpen] = useState(null)
  usePageMeta(p ? p.title : 'Project', p?.summary)
  useEffect(() => { const k = e => e.key === 'Escape' && setOpen(null); addEventListener('keydown', k); return () => removeEventListener('keydown', k) }, [])
  useEffect(() => { open !== null ? window.__lenis?.stop() : window.__lenis?.start() }, [open])
  if (!p) return <><PageHero crumb="Projects" title="Project not found" /><section className="sec beige"><div className="wrap"><Link className="ulink" to="/projects"><ArrowLeft size={16} /> All projects</Link></div></section></>
  const next = projects[(i + 1) % projects.length]
  const gallery = p.gallery || []
  return (
    <>
      <PageHero crumb={p.category} title={p.title} sub={[p.location, p.year].filter(Boolean).join(' · ')} />
      <section className="proj-full"><Photo src={p.image} art="frame" alt={p.title} eager /></section>
      <section className="sec beige"><div className="wrap grid12">
        <Reveal className="c-7"><p className="statement">{p.summary}</p></Reveal>
        <Reveal className="c-4 off-1 details" delay={.1}><h4>Client</h4><p>{p.client}</p><h4>Scope</h4><ul>{p.scope?.map(s => <li key={s}>{s}</li>)}</ul></Reveal>
      </div></section>
      {gallery.length > 0 && (
        <section className="sec paper gal"><div className="wrap">
          <Swiper modules={[Navigation, Keyboard]} navigation keyboard slidesPerView={1.15} spaceBetween={20} breakpoints={{ 800: { slidesPerView: 2.2 } }}>
            {gallery.map((g, k) => <SwiperSlide key={k}><button className="gal-item" onClick={() => setOpen(k)} data-cursor="Enlarge"><img src={g.src} alt={g.caption || p.title} loading="lazy" />{g.caption && <span>{g.caption}</span>}</button></SwiperSlide>)}
          </Swiper>
        </div></section>
      )}
      {open !== null && (
        <div className="lightbox wide" data-lenis-prevent role="dialog" aria-modal="true">
          <button className="close" onClick={() => setOpen(null)} aria-label="Close"><X size={30} /></button>
          <Swiper modules={[Navigation, Keyboard]} navigation keyboard initialSlide={open} slidesPerView={1}>
            {gallery.map((g, k) => <SwiperSlide key={k}><figure><img src={g.src} alt={g.caption || p.title} />{g.caption && <figcaption>{g.caption}</figcaption>}</figure></SwiperSlide>)}
          </Swiper>
        </div>
      )}
      {projects.length > 1 && <Link to={`/projects/${next.slug}`} className="next-proj" data-cursor="Next"><small>Next project</small><h3>{next.title} <ArrowRight size={28} /></h3></Link>}
    </>
  )
}
