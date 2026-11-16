import { BadgeCheck, FileCheck2, MapPin, Phone } from 'lucide-react'
import { company } from '../data/site.js'

const items = [
  [BadgeCheck, 'Registered company', `C.R. ${company.cr}`],
  [FileCheck2, 'VAT registered', company.vat],
  [MapPin, 'Based in Al Jubail', 'Eastern Province, KSA'],
  [Phone, 'Quotes by phone or email', company.mobile],
]
export default function TrustBar() {
  return (
    <section className="trust"><div className="wrap trust-in">
      {items.map(([I, t, d]) => <div key={t}><I size={26} strokeWidth={1.4} /><p><b>{t}</b><span>{d}</span></p></div>)}
    </div></section>
  )
}
