import { ShieldCheck, Scale, BadgeCheck, Target, Users, Leaf, TrendingUp } from 'lucide-react'
import { Eyebrow, Lines, Reveal } from '../components/animations.jsx'
import { values } from '../data/site.js'

const icons = { 'Safety First': ShieldCheck, Integrity: Scale, Quality: BadgeCheck, Accountability: Target, Teamwork: Users, 'Environmental Responsibility': Leaf, 'Continuous Improvement': TrendingUp }

export default function Values({ n }) {
  return (
    <section className="sec beige">
      <div className="wrap">
        <Eyebrow n={n}>Why FAROHA</Eyebrow>
        <Lines text="The standards that define us." className="h-xl" />
        <ul className="vgrid">
          {values.map(([t, d], i) => { const I = icons[t] || BadgeCheck; return (
            <Reveal as="li" key={t} delay={(i % 4) * .08}><I size={30} strokeWidth={1.3} /><h3>{t}</h3><p>{d}</p></Reveal>
          ) })}
        </ul>
      </div>
    </section>
  )
}
