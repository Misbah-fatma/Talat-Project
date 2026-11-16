import { Factory, Route, Building2, Wrench, Settings, Truck, ArrowUpRight } from 'lucide-react'
import { Eyebrow, Lines, Reveal } from '../components/animations.jsx'

const sectors = [
  [Factory, 'Industrial & Petrochemical Facilities', 'Piping, steel, mechanical and shutdown works for process plants.'],
  [Route, 'Infrastructure & Utilities', 'Roads, drainage, underground utilities and site development.'],
  [Building2, 'Commercial & Industrial Construction', 'Civil, structural and building-services works for facilities.'],
  [Wrench, 'Maintenance & Shutdowns', 'Planned maintenance, turnaround support and plant repairs.'],
  [Settings, 'Technical Services', 'Fabrication, installation, coating support and inspection.'],
  [Truck, 'Equipment & Manpower Support', 'Skilled technical manpower, supervision and equipment, subject to scope.'],
]

export default function Industries({ n }) {
  return (
    <section className="sec beige">
      <div className="wrap">
        <Eyebrow n={n}>Sectors we serve</Eyebrow>
        <Lines text={'Built for industry,\ninfrastructure and commerce.'} className="h-xl" />
        <ul className="vgrid sector-grid">
          {sectors.map(([I, t, d], i) => (
            <Reveal as="li" key={t} delay={(i % 3) * .08}>
              <I size={30} strokeWidth={1.3} /><h3>{t}</h3><p>{d}</p>
              <button className="ulink sm" data-quote>Get a quote <ArrowUpRight size={14} /></button>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
