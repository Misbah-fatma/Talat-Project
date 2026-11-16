import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Phone, Mail, Check, Loader2 } from 'lucide-react'
import { company, specialties } from '../data/site.js'
import { sendLead } from '../lib/sendLead.js'

const services = [...specialties.map(s => s[0]), 'Equipment & Manpower Support', 'Other']
const get = k => { try { return sessionStorage.getItem(k) } catch { return null } }
const set = k => { try { sessionStorage.setItem(k, '1') } catch {} }

// Lead-capture pop-up. Opens from any [data-quote] element, and once per visit automatically
// (after ~14s, on exit intent, or after scrolling most of the page). Never on the contact page.
export default function LeadModal() {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const { pathname } = useLocation()
  const first = useRef(null)
  const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm()

  const show = () => { setStatus('idle'); setOpen(true); set('faroha-quote-seen') }
  const close = () => setOpen(false)

  useEffect(() => {
    const onClick = e => { const t = e.target.closest?.('[data-quote]'); if (t) { e.preventDefault(); show() } }
    document.addEventListener('click', onClick); return () => document.removeEventListener('click', onClick)
  }, [])

  useEffect(() => {
    if (pathname === '/contact' || get('faroha-quote-seen')) return
    const auto = () => { if (!get('faroha-quote-seen')) show() }
    const t = setTimeout(auto, 14000)
    const exit = e => { if (e.clientY <= 0 && matchMedia('(pointer:fine)').matches) auto() }
    const scroll = () => { const m = document.documentElement.scrollHeight - innerHeight; if (m > 0 && scrollY / m > .6) auto() }
    document.addEventListener('mouseleave', exit); addEventListener('scroll', scroll, { passive: true })
    return () => { clearTimeout(t); document.removeEventListener('mouseleave', exit); removeEventListener('scroll', scroll) }
  }, [pathname])

  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    if (!open) return
    window.__lenis?.stop(); document.body.style.overflow = 'hidden'
    const k = e => e.key === 'Escape' && close(); addEventListener('keydown', k)
    setTimeout(() => first.current?.focus(), 350)
    return () => { window.__lenis?.start(); document.body.style.overflow = ''; removeEventListener('keydown', k) }
  }, [open])

  const submit = async d => {
    setStatus('sending')
    try { await sendLead(d, 'Quote pop-up'); setStatus('sent'); reset() } catch { setStatus('error') }
  }
  const mailtoFallback = () => {
    const d = getValues()
    return `mailto:${company.emails[1]}?subject=${encodeURIComponent('Quote request — ' + (d.service || 'Enquiry'))}&body=${encodeURIComponent(`Name: ${d.name || ''}\nPhone: ${d.phone || ''}\nService: ${d.service || ''}\n\n${d.message || ''}`)}`
  }
  const { ref: nameRef, ...nameReg } = register('name', { required: 'Please enter your name' })

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="qm-back" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .3 }} onMouseDown={e => e.target === e.currentTarget && close()} data-lenis-prevent>
          <motion.div className="qm" role="dialog" aria-modal="true" aria-labelledby="qm-title" initial={{ y: 40, opacity: 0, scale: .97 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 30, opacity: 0 }} transition={{ duration: .5, ease: [.22, .8, .24, 1] }}>
            <button className="qm-x" onClick={close} aria-label="Close"><X size={22} /></button>
            <aside className="qm-side">
              <p className="eyebrow light"><i>—</i><span>Free consultation</span></p>
              <h2 id="qm-title">Planning a project?</h2>
              <p>Tell us what you need and our team will come back to you with a clear, no-obligation quote.</p>
              <ul><li><Check size={16} /> Civil, steel, piping, MEP & maintenance</li><li><Check size={16} /> Safety-led, specification-driven delivery</li><li><Check size={16} /> Fast, responsive communication</li></ul>
              <a className="qm-call" href={`tel:${company.mobile.replace(/\s/g, '')}`}><Phone size={18} /> {company.mobile}</a>
            </aside>
            <div className="qm-main">
              {status === 'sent' ? (
                <div className="qm-done"><Check size={34} /><h3>Request sent.</h3><p>Thank you — our team will contact you shortly. For an immediate response, call <a href={`tel:${company.mobile.replace(/\s/g, '')}`}>{company.mobile}</a>.</p><button className="btn dark" onClick={close}>Close</button></div>
              ) : (
                <form className="form" onSubmit={handleSubmit(submit)} noValidate>
                  <input type="text" tabIndex="-1" autoComplete="off" aria-hidden="true" className="hp" {...register('_honey')} />
                  <label>Full name<input {...nameReg} ref={e => { nameRef(e); first.current = e }} aria-invalid={!!errors.name} autoComplete="name" />{errors.name && <em>{errors.name.message}</em>}</label>
                  <div className="two">
                    <label><span>Phone number</span><input type="tel" autoComplete="tel" {...register('phone', { required: 'Please enter a phone number', minLength: { value: 7, message: 'Enter a valid number' } })} aria-invalid={!!errors.phone} />{errors.phone && <em>{errors.phone.message}</em>}</label>
                    <label><span>Email </span><input type="email" autoComplete="email" {...register('email', { pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' } })} aria-invalid={!!errors.email} />{errors.email && <em>{errors.email.message}</em>}</label>
                  </div>
                  <label>Service required<select {...register('service')} defaultValue={services[0]}>{services.map(s => <option key={s}>{s}</option>)}</select></label>
                  <label><span>Project details <small>(optional)</small></span><textarea rows="3" {...register('message')} /></label>
                  {status === 'error' && <p className="qm-err" role="alert">We couldn't send your request just now. Please try again, <a href={mailtoFallback()}>email us directly</a> or call {company.mobile}.</p>}
                  <div className="qm-actions">
                    <button className="btn dark" type="submit" disabled={status === 'sending'}>{status === 'sending' ? <><Loader2 size={18} className="spin" /> Sending…</> : <><Mail size={18} /> Send request</>}</button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
