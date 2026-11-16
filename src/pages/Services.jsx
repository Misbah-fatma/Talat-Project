import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PageHero from '../components/PageHero.jsx'
import Photo, { Parallax } from '../components/Photo.jsx'
import { Lines, Reveal } from '../components/animations.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import { groups } from '../data/services.js'
import { media } from '../data/media.js'

export default function Services() {
  usePageMeta('Services', 'Civil, structural steel, piping (metallic, FRP/GRP/RTR, HDPE), HVAC, fire protection, scaffolding, shutdown and maintenance services in Al Jubail.')
  const [active, setActive] = useState(groups[0].id)
  const { hash } = useLocation()

  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    groups.forEach(g => { const el = document.getElementById(g.id); el && io.observe(el) })
    return () => io.disconnect()
  }, [])
  useEffect(() => {
    if (!hash) return
    const t = setTimeout(() => { const el = document.querySelector(hash); if (el) window.__lenis ? window.__lenis.scrollTo(el, { offset: -80, duration: 1.4 }) : el.scrollIntoView() }, 1100)
    return () => clearTimeout(t)
  }, [hash])

  let n = 0
  return (
    <>
      <PageHero index="02" crumb="Services" title={'What\nwe do.'} sub="Twelve core specialties across construction, industry and infrastructure." />
      <div className="svc-layout">
        <aside className="svc-index" aria-label="Service disciplines"><ul>{groups.map((g, i) => <li key={g.id}><a href={`#${g.id}`} className={active === g.id ? 'on' : ''} data-cursor="Go" onClick={e => { e.preventDefault(); const el = document.getElementById(g.id); window.__lenis ? window.__lenis.scrollTo(el, { offset: -80 }) : el.scrollIntoView({ behavior: 'smooth' }) }}><small>{String(i + 1).padStart(2, '0')}</small>{g.title}</a></li>)}</ul></aside>
        <div className="svc-main">
          {groups.map((g, i) => (
            <section key={g.id} id={g.id} className="svc-block">
              <Parallax className="svc-art" amount={6}><Photo src={media[g.id]} art={g.art} alt={g.title} caption={`Fig. 0${i + 1} — ${g.title}`} /></Parallax>
              <small className="num">{String(i + 1).padStart(2, '0')}</small>
              <Lines text={g.title} className="h-l" /><Reveal delay={.1}><p className="body-l">{g.blurb}</p></Reveal>
              <ul className="spec">{g.details.map(([t, d]) => { n++; return <Reveal as="li" key={t}><small>{String(n).padStart(2, '0')}</small><h3>{t}</h3><p>{d}</p></Reveal> })}</ul>
            </section>
          ))}
          <div className="svc-more"><Reveal><p className="body-l">Need manpower, equipment or shutdown support?</p><Link to="/support" className="ulink" data-cursor="View">Project support services <ArrowRight size={16} /></Link></Reveal></div>
        </div>
      </div>
    </>
  )
}
