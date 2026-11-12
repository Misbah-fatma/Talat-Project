import { useState, useEffect } from 'react'
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom'
import Logo from './Logo.jsx'
import { company, nav } from './data.js'

export default function Layout() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const [prog, setProg] = useState(0)

  useEffect(() => {
    const f = () => { setScrolled(window.scrollY > 20); const m = document.documentElement.scrollHeight - innerHeight; setProg(m > 0 ? scrollY / m : 0) }
    f(); window.addEventListener('scroll', f); return () => window.removeEventListener('scroll', f)
  }, [])

  // scroll to top + reveal animations on every page change
  useEffect(() => {
    window.scrollTo(0, 0); setOpen(false)
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add('in')), { threshold: 0.12 })
    document.querySelectorAll('.card, .value, .step, .banner, h2').forEach(el => { el.classList.add('reveal'); io.observe(el) })
    return () => io.disconnect()
  }, [pathname])

  const tilt = e => {
    const c = e.target.closest && e.target.closest('.card'); if (!c) return
    const r = c.getBoundingClientRect()
    c.style.transform = `perspective(700px) rotateX(${(-(e.clientY - r.top) / r.height + .5) * 10}deg) rotateY(${((e.clientX - r.left) / r.width - .5) * 10}deg) translateY(-4px)`
  }
  const untilt = e => { const c = e.target.closest && e.target.closest('.card'); if (c) c.style.transform = '' }

  return (
    <div onMouseMove={tilt} onMouseOut={untilt}>
      <div className="progress" style={{ transform: `scaleX(${prog})` }} />
      <header className={scrolled || pathname !== '/' ? 'header scrolled' : 'header'}>
        <div className="container head-in">
          <Link to="/" className="brand"><Logo /><span><b>{company.name}</b><small>{company.full}</small></span></Link>
          <button className="burger" onClick={() => setOpen(!open)} aria-label="Menu">☰</button>
          <nav className={open ? 'nav open' : 'nav'}>
            {nav.map(([path, l]) => <NavLink key={path} to={path} end={path === '/'}>{l}</NavLink>)}
          </nav>
        </div>
      </header>
      <Outlet />
      <footer className="footer">
        <div className="container foot-grid">
          <div>
            <div className="brand"><Logo size={36} /><span><b>{company.name}</b><small>{company.full}</small></span></div>
            <p>Safety-led delivery | Quality workmanship | Responsible growth</p>
          </div>
          <div><h4>Pages</h4>{nav.map(([p, l]) => <Link key={p} to={p}>{l}</Link>)}</div>
          <div><h4>Contact</h4><p>{company.address[0]}<br />{company.address[1]}</p><a href={`tel:${company.mobile.replace(/\s/g, '')}`}>{company.mobile}</a>{company.emails.map(e => <a key={e} href={`mailto:${e}`}>{e}</a>)}</div>
        </div>
        <p className="copy">© {new Date().getFullYear()} FAROHA Contracting Company LLC. All rights reserved.</p>
      </footer>
    </div>
  )
}
