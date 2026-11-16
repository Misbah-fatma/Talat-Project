import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Eyebrow, Lines, Reveal } from '../components/animations.jsx'
import Photo from '../components/Photo.jsx'
import { projects } from '../data/projects.js'
import { groups } from '../data/services.js'
import { media } from '../data/media.js'

// Shows real projects when they exist (src/data/projects.js); otherwise the four disciplines we deliver, with illustrative imagery.
export default function Portfolio({ n }) {
  const cats = ['All', ...new Set(projects.map(p => p.category))]
  const [cat, setCat] = useState('All')
  const list = projects.filter(p => cat === 'All' || p.category === cat).slice(0, 5)
  const items = projects.length
    ? list.map(p => ({ key: p.slug, to: `/projects/${p.slug}`, img: p.image, title: p.title, meta: [p.location, p.category, p.year].filter(Boolean).join(' · '), cta: 'View project' }))
    : groups.map(g => ({ key: g.id, to: `/services#${g.id}`, img: media[g.id], art: g.art, title: g.title, meta: g.items.slice(0, 3).join(' · '), cta: 'Explore service' }))
  return (
    <section className="sec paper">
      <div className="wrap">
        <Eyebrow n={n}>{projects.length ? 'Our portfolio' : 'Our work'}</Eyebrow>
        <Lines text={projects.length ? 'Projects that define our work.' : 'Work we deliver, to a standard.'} className="h-xl" />
        {projects.length > 0 && cats.length > 2 && <div className="filters" role="tablist">{cats.map(c => <button key={c} role="tab" aria-selected={cat === c} className={cat === c ? 'on' : ''} onClick={() => setCat(c)}>{c}</button>)}</div>}
        <div className="pgrid">{items.map((p, i) => (
          <Reveal key={p.key} className={`pcard s${i % 4}`}>
            <Link to={p.to}>
              <div className="pimg"><Photo src={p.img} art={p.art || 'frame'} alt={p.title} caption={p.title} /><div className="ov"><span>{p.cta} <ArrowUpRight size={18} /></span></div></div>
              <small>{p.meta}</small><h3>{p.title}</h3>
            </Link>
          </Reveal>))}</div>
        <p className="more">
          <Link to={projects.length ? '/projects' : '/services'} className="ulink">{projects.length ? 'All projects' : 'All services'} <ArrowRight size={16} /></Link>
          {!projects.length && <span className="note">Imagery is illustrative.</span>}
        </p>
      </div>
    </section>
  )
}
