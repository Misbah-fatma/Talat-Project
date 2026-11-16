import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PageHero from '../components/PageHero.jsx'
import Photo from '../components/Photo.jsx'
import { Reveal } from '../components/animations.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import { projects } from '../data/projects.js'
import { groups } from '../data/services.js'

export default function Projects() {
  usePageMeta('Projects', 'Project portfolio of FAROHA Contracting Company LLC.')
  const cats = ['All', ...new Set(projects.map(p => p.category))]
  const [cat, setCat] = useState('All')
  const list = projects.filter(p => cat === 'All' || p.category === cat)
  return (
    <>
      <PageHero index="04" crumb="Projects" title={'Our work\nspeaks.'} sub="Selected projects and the capabilities behind them." />
      <section className="sec beige"><div className="wrap">
        {projects.length ? (<>
          <div className="filters" role="tablist">{cats.map(c => <button key={c} role="tab" aria-selected={cat === c} className={cat === c ? 'on' : ''} onClick={() => setCat(c)}>{c}</button>)}</div>
          <div className="pgrid">{list.map((p, i) => (
            <Reveal key={p.slug} className={`pcard s${i % 4}`}><Link to={`/projects/${p.slug}`} data-cursor="View project"><div className="pimg"><Photo src={p.image} art="frame" alt={p.title} caption={p.title} /></div><small>{p.category} · {p.location}</small><h3>{p.title}</h3></Link></Reveal>
          ))}</div>
        </>) : (
          <Reveal className="empty"><p className="body-l">Project case studies and photography are being prepared.</p><p>To discuss our experience on projects similar to yours, get in touch and we'll share relevant references.</p><Link to="/contact" className="ulink" data-cursor="Contact">Ask about our experience <ArrowRight size={16} /></Link></Reveal>
        )}
      </div></section>
      <section className="sec paper"><div className="wrap">
        <ul className="cap-rows">{groups.map((g, i) => <Reveal as="li" key={g.id}><Link to={`/services#${g.id}`} data-cursor="Explore"><small>{String(i + 1).padStart(2, '0')}</small><h3>{g.title}</h3><p>{g.items.join(' · ')}</p></Link></Reveal>)}</ul>
      </div></section>
    </>
  )
}
