import { useState } from 'react'
import { Plus } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Eyebrow, Lines, Reveal } from '../components/animations.jsx'
import { company } from '../data/site.js'

const faqs = [
  ['What services does FAROHA provide?', 'Civil and structural works, structural steel fabrication and erection, metallic, FRP/GRP/RTR and HDPE piping, mechanical and electrical works, HVAC, fire fighting and fire alarm, infrastructure, dewatering, shoring and piling, scaffolding, and shutdown and maintenance support.'],
  ['Where are you based and where do you work?', 'We are based in Al Jubail, Eastern Province, and support industrial, infrastructure and commercial projects in Saudi Arabia.'],
  ['How do I request a quote?', 'Use the quote button on any page, call us, or send an email. Share the scope, location and timeline and we will come back to you.'],
  ['Are you a registered, VAT-registered company?', `Yes. FAROHA Contracting Company LLC holds Commercial Registration ${company.cr} and VAT registration ${company.vat}. Both certificates are shown on our site.`],
  ['Can you supply manpower and equipment?', 'Yes — skilled technical manpower, site supervision and construction equipment can be provided and coordinated, subject to the scope of work.'],
  ['How do you manage safety and quality?', 'Risk assessments and method statements before high-risk activities, permit-to-work, lifting, excavation and confined-space controls as applicable, inspection against approved drawings and specifications, and material traceability with documented handover.'],
]

export default function FAQ({ n }) {
  const [open, setOpen] = useState(0)
  return (
    <section className="sec beige">
      <div className="wrap grid12">
        <div className="l5 sticky"><Eyebrow n={n}>FAQ</Eyebrow><Lines text={'Questions,\nanswered.'} className="h-xl" />
          <Reveal delay={.1}><p className="body-l">Can't find what you need? Call <a href={`tel:${company.mobile.replace(/\s/g, '')}`}><b>{company.mobile}</b></a> or <button className="inline-link" data-quote>request a quote</button>.</p></Reveal></div>
        <ul className="r6 faq">
          {faqs.map(([q, a], i) => (
            <li key={q} className={open === i ? 'on' : ''}>
              <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}><span>{q}</span><Plus size={20} /></button>
              <AnimatePresence initial={false}>{open === i && <motion.div className="faq-a" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .4, ease: [.22, .8, .24, 1] }}><p>{a}</p></motion.div>}</AnimatePresence>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
