import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ArrowUpRight, Loader2 } from 'lucide-react'
import PageHero from '../components/PageHero.jsx'
import { Reveal } from '../components/animations.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import { company, specialties } from '../data/site.js'
import { sendLead } from '../lib/sendLead.js'

const services = [...specialties.map(s => s[0]), 'Equipment & Manpower Support', 'Other']

export default function Contact() {
  usePageMeta('Contact', 'Request a quote or consultation from FAROHA Contracting Company LLC, Al Jubail, Saudi Arabia.')
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const [status, setStatus] = useState('idle')
  const viaEmail = async d => { setStatus('sending'); try { await sendLead(d, 'Contact page'); setStatus('sent') } catch { setStatus('error') } }

  return (
    <>
      <PageHero index="07" crumb="Contact" title={'Let’s start\na conversation.'} sub="Tell us about your project — we'll come back to you." />
      <section className="sec beige"><div className="wrap grid12">
        <Reveal className="c-7">
          <form className="form" onSubmit={handleSubmit(async d => { await viaEmail(d); })} noValidate>
            <input type="text" tabIndex="-1" autoComplete="off" aria-hidden="true" className="hp" {...register('_honey')} />
            <label>Full name<input {...register('name', { required: 'Please enter your name' })} aria-invalid={!!errors.name} />{errors.name && <em>{errors.name.message}</em>}</label>
            <div className="two">
              <label>Phone<input type="tel" {...register('phone')} /></label>
              <label>Email<input type="email" {...register('email', { pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' } })} />{errors.email && <em>{errors.email.message}</em>}</label>
            </div>
            <label>Service required<select {...register('service')} defaultValue={services[0]}>{services.map(s => <option key={s}>{s}</option>)}</select></label>
            <label>Project details<textarea rows="5" {...register('message', { required: 'Tell us a little about the project' })} aria-invalid={!!errors.message} />{errors.message && <em>{errors.message.message}</em>}</label>
            <div className="form-actions">
              <button className="btn dark" type="submit" disabled={status === 'sending'}>{status === 'sending' ? <><Loader2 size={18} className="spin" /> Sending…</> : <>Send message <ArrowUpRight size={18} /></>}</button>
            </div>
            {status === 'sent' && <p className="ok">Thank you — your message has been sent. We will contact you shortly.</p>}
            {status === 'error' && <p className="qm-err" role="alert">We couldn't send your message just now. Please try again, or email <a href={`mailto:${company.emails[1]}`}>{company.emails[1]}</a> directly.</p>}
          </form>
        </Reveal>
        <Reveal className="c-4 off-1 details" delay={.1}>
          <h4>Office</h4><p>{company.address[0]}<br />{company.address[1]}</p>
          <h4>Phone</h4><a href={`tel:${company.mobile.replace(/\s/g, '')}`}>{company.mobile}</a>
          <h4>Email</h4>{company.emails.map(e => <a key={e} href={`mailto:${e}`}>{e}</a>)}
          <h4>Registration</h4><p>C.R. {company.cr}<br />VAT {company.vat}</p>
        </Reveal>
      </div></section>
      <section className="map"><iframe title="FAROHA location in Al Jubail" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Al+Merqab,+Al+Jubail+35514,+Saudi+Arabia&output=embed" /></section>
    </>
  )
}
