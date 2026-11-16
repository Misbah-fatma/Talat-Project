import { ArrowUpRight } from 'lucide-react'
import { Eyebrow, Lines, Reveal } from '../components/animations.jsx'

const steps = [
  ['Tell us about your project', 'Share the scope, location and timeline by phone, email or the quote form.'],
  ['We review scope and risks', 'Our team studies the drawings, interfaces and site conditions before pricing.'],
  ['You receive a clear quote', 'A defined scope, approach and commercial offer — no surprises.'],
  ['We deliver and hand over', 'Supervised execution, inspection, progress reporting and documented handover.'],
]

export default function Process({ n }) {
  return (
    <section className="sec navy">
      <div className="wrap">
        <Eyebrow n={n} light>How to work with us</Eyebrow>
        <Lines text={'From first call\nto final handover.'} className="h-xl" />
        <ol className="proc">
          {steps.map(([t, d], i) => <Reveal as="li" key={t} delay={i * .1}><b>{String(i + 1).padStart(2, '0')}</b><h3>{t}</h3><p>{d}</p></Reveal>)}
        </ol>
        <Reveal delay={.2}><button className="btn light" data-quote>Start with a free quote <ArrowUpRight size={18} /></button></Reveal>
      </div>
    </section>
  )
}
