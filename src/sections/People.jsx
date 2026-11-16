import { Landmark, DraftingCompass, HardHat, ShieldCheck, Users } from 'lucide-react'
import { Eyebrow, Lines, Reveal } from '../components/animations.jsx'
import Photo from '../components/Photo.jsx'
import { team } from '../data/people.js'

const icons = { Landmark, DraftingCompass, HardHat, ShieldCheck }
const levelOf = (m, byId) => { let l = 0, c = m; while (c.parent && byId[c.parent]) { l++; c = byId[c.parent] } return l }

export default function People({ n }) {
  const byId = Object.fromEntries(team.map(m => [m.id, m]))
  const levels = []
  team.forEach(m => { const l = levelOf(m, byId); (levels[l] = levels[l] || []).push(m) })
  return (
    <section className="sec beige">
      <div className="wrap">
        <Eyebrow n={n}>Our people</Eyebrow>
        <Lines text={'The people behind\nevery achievement.'} className="h-xl" />
        <Reveal delay={.1}><p className="body-l">Every project is delivered by four coordinated functions, working from the first review of scope to the final handover.</p></Reveal>
        <div className="org">
          {levels.map((row, l) => (
            <div className="org-row" key={l}>
              {row.map((m, i) => { const I = icons[m.icon] || Users; return (
                <Reveal key={m.id} delay={i * .08} className="person">
                  <div className="avatar">{m.photo ? <Photo src={m.photo} art="frame" alt={m.name} /> : <I size={40} strokeWidth={1.2} />}</div>
                  <h3>{m.name}</h3><p>{m.role}</p>
                </Reveal>) })}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
