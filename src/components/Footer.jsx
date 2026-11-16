import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { company, mainNav } from '../data/site.js'

export default function Footer() {
  return (
    <motion.footer className="foot" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 1, ease: [.22, .8, .24, 1] }}>
      <div className="wrap foot-top">
        <div className="foot-brand">
          <b className="wm">FAROHA<i /></b>
          <p>Engineering · Construction · Technical & Industrial Services. Safety-led delivery, quality workmanship and responsible growth.</p>
          <a href="/contact" data-quote className="ulink">Request a free quote <ArrowUpRight size={18} /></a>
        </div>
        <div><h4>Company</h4>{mainNav.map(([p, l]) => <Link key={p} to={p}>{l}</Link>)}</div>
        <div><h4>Contact</h4>
          <p>{company.address[0]}<br />{company.address[1]}</p>
          <a href={`tel:${company.mobile.replace(/\s/g, '')}`}>{company.mobile}</a>
          {company.emails.map(e => <a key={e} href={`mailto:${e}`}>{e}</a>)}
        </div>
        <div><h4>Registration</h4><p>Commercial Registration<br />{company.cr}</p><p>VAT No.<br />{company.vat}</p></div>
      </div>
      <div className="foot-word" aria-hidden="true">FAROHA</div>
      <div className="wrap foot-base"><span>© {new Date().getFullYear()} FAROHA Contracting Company LLC. All rights reserved.</span><span>Al Jubail · Kingdom of Saudi Arabia</span></div>
    </motion.footer>
  )
}
