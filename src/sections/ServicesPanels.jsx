import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Plus } from 'lucide-react'
import { Eyebrow, Lines } from '../components/animations.jsx'
import Photo from '../components/Photo.jsx'
import { groups } from '../data/services.js'
import { media } from '../data/media.js'

export default function ServicesPanels({ n }) {
  const [i, setI] = useState(0)
  const g = groups[i]
  return (
    <section className="sec navy">
      <div className="wrap">
        <Eyebrow n={n} light>What we do</Eyebrow>
        <Lines text="Comprehensive contracting solutions." className="h-xl" />
        <div className="sp">
          <ul className="sp-list">
            {groups.map((x, k) => (
              <li key={x.id} className={k === i ? 'on' : ''}>
                <button onClick={() => setI(k)} aria-expanded={k === i}><small>{String(k + 1).padStart(2, '0')}</small><h3>{x.title}</h3><Plus size={22} /></button>
                <AnimatePresence initial={false}>
                  {k === i && (
                    <motion.div className="sp-body" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .5, ease: [.22, .8, .24, 1] }}>
                      <div>
                        <p>{x.blurb}</p>
                        <ul>{x.items.map(t => <li key={t}>{t}</li>)}</ul>
                        <Link to={`/services#${x.id}`} className="ulink light">View details <ArrowRight size={16} /></Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
          <div className="sp-img" aria-hidden="true">
            <AnimatePresence mode="wait">
              <motion.div key={g.id} className="sp-frame" initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: .7, ease: [.22, .8, .24, 1] }}>
                <Photo src={media[g.id]} art={g.art} alt="" caption={`Fig. 0${i + 1} — ${g.title}`} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="sp-cta"><p>Not sure which service you need?</p><button className="btn light" data-quote>Talk to our team</button></div>
      </div>
    </section>
  )
}
