// Unsigned management message — written from the company profile's vision, mission and values.
// Replace `name` / `designation` / `photo` when you want it signed by a named leader.
export const leadership = {
  name: 'The Management Team',
  designation: 'FAROHA Contracting Company LLC',
  photo: '/images/leadership.jpg',
  message: `A contracting company is judged by what it leaves behind: safe sites, sound structures and clients who come back. At FAROHA we set out to be a trusted partner for industrial and infrastructure projects in Saudi Arabia, and we hold ourselves to a simple standard — understand the scope, plan it properly, execute it safely, and hand it over with the records to prove it. We take pride in practical engineering, in skilled people who care about the detail, and in being responsive when a project needs us. Whether it is a shutdown, a piping installation or a new structure, we treat your project as our own. We welcome the opportunity to work with you.`,
}

// How delivery is organised — functions taken from the company profile (no names or headcounts claimed).
export const team = [
  { id: 'mgmt', name: 'Management', role: 'Direction, commercial oversight and client relationships.', icon: 'Landmark' },
  { id: 'eng', name: 'Engineering & Planning', role: 'Scope review, method statements, drawings and programme.', icon: 'DraftingCompass', parent: 'mgmt' },
  { id: 'site', name: 'Site Operations', role: 'Supervision, skilled technical manpower and equipment.', icon: 'HardHat', parent: 'mgmt' },
  { id: 'hse', name: 'HSE & Quality', role: 'Risk assessment, permits, inspection and material traceability.', icon: 'ShieldCheck', parent: 'mgmt' },
]

// What every client can expect from us (company commitments — not third-party testimonials).
export const commitments = [
  { quote: 'Safety comes first on every site — risk assessments and method statements before any high-risk activity.', tag: 'Safety' },
  { quote: 'Work is executed against approved drawings, specifications and inspection plans.', tag: 'Quality' },
  { quote: 'Material traceability and documented handover, so you receive the records with the work.', tag: 'Documentation' },
  { quote: 'Responsive execution and coordinated site delivery, built for long-term relationships.', tag: 'Service' },
]
