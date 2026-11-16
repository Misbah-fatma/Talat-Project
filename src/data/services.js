import { specialties } from './site.js'

const desc = Object.fromEntries(specialties)

export const groups = [
  { id: 'construction', art: 'frame', title: 'Construction & Structural', blurb: 'Foundations, structures and site infrastructure delivered with disciplined execution.', items: ['Civil & Structural', 'Structural Steel Fabrication', 'Infrastructure Works', 'Dewatering, Shoring & Piling'] },
  { id: 'piping', art: 'piping', title: 'Piping Systems', blurb: 'Metallic, composite and HDPE piping fabricated, installed and maintained to specification.', items: ['Metallic Piping', 'FRP / GRP / RTR Piping', 'HDPE Lining & Piping'] },
  { id: 'services', art: 'plant', title: 'Building & Plant Services', blurb: 'Mechanical, electrical, HVAC and fire protection systems for industrial and commercial facilities.', items: ['Mechanical & Electrical', 'HVAC Services', 'Fire Fighting & Fire Alarm'] },
  { id: 'maintenance', art: 'scaffold', title: 'Maintenance & Support', blurb: 'Shutdown, turnaround and access support that keeps plants running safely.', items: ['Shutdown & Maintenance', 'Scaffolding Services'] },
].map(g => ({ ...g, details: g.items.map(t => [t, desc[t]]) }))
