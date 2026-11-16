import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { company, nav, mainNav } from '../data/site.js'

const Wordmark = () => <b className="wm">FAROHA<i /></b>

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => { const f = () => setSolid(window.scrollY > 60); f(); addEventListener('scroll', f, { passive: true }); return () => removeEventListener('scroll', f) }, [])
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [open])
  useEffect(() => { const k = e => e.key === 'Escape' && setOpen(false); addEventListener('keydown', k); return () => removeEventListener('keydown', k) }, [])
  useEffect(() => { open ? window.__lenis?.stop() : window.__lenis?.start() }, [open])

  return (
    <>
      <header className={`nb${solid || open ? ' solid' : ''}`}>
        <div className="nb-in">
          <Link to="/" aria-label="FAROHA home"><Wordmark /></Link>
          <nav className="nb-links" aria-label="Main">{mainNav.map(([p, l]) => <NavLink key={p} to={p} end={p === '/'}>{l}</NavLink>)}</nav>
          <button className="nb-quote" data-quote>Get a quote</button>
          <button className="nb-btn" onClick={() => setOpen(o => !o)} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'}>
            <span>{open ? 'Close' : 'Menu'}</span><em className={open ? 'x' : ''} />
          </button>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div className="menu" data-lenis-prevent role="dialog" aria-modal="true" aria-label="Site menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} exit={{ clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: .7, ease: [.76, 0, .24, 1] }}>
            <nav className="menu-links" aria-label="All pages">
              {nav.map(([p, l], i) => (
                <div className="mask" key={p}>
                  <motion.div initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ delay: .25 + i * .05, duration: .8, ease: [.22, .8, .24, 1] }}>
                    <NavLink to={p} end={p === '/'}><small>{String(i + 1).padStart(2, '0')}</small>{l}</NavLink>
                  </motion.div>
                </div>
              ))}
            </nav>
            <div className="menu-info">
              <button className="btn light" data-quote>Get a free quote</button>
              <div><h4>Contact</h4><a href={`tel:${company.mobile.replace(/\s/g, '')}`}>{company.mobile}</a>{company.emails.map(e => <a key={e} href={`mailto:${e}`}>{e}</a>)}</div>
              <div><h4>Office</h4><p>{company.address[0]}<br />{company.address[1]}</p></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
