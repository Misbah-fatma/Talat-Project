import { useState } from 'react'
import PageHero from '../PageHero.jsx'
import Section from '../Section.jsx'
import { company, focus } from '../data.js'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const submit = e => {
    e.preventDefault()
    const d = new FormData(e.target)
    const body = `Name: ${d.get('name')}\nPhone: ${d.get('phone')}\n\n${d.get('message')}`
    window.location.href = `mailto:${company.emails[1]}?subject=${encodeURIComponent('Enquiry from ' + d.get('name'))}&body=${encodeURIComponent(body)}`
    setSent(true)
  }
  return (
    <>
      <PageHero variant="contact" title="Contact & Company Details" sub="Connect with our team for contracting and industrial service requirements" />
      <Section>
        <div className="two">
          <div className="card">
            <h3>{company.name} {company.full}</h3>
            <p>{company.address[0]}<br />{company.address[1]}</p>
            <p><b>Mobile:</b> <a href={`tel:${company.mobile.replace(/\s/g, '')}`}>{company.mobile}</a></p>
            <p><b>Email:</b> {company.emails.map((e, i) => <span key={e}>{i > 0 && ' | '}<a href={`mailto:${e}`}>{e}</a></span>)}</p>
            <p><b>C.R.:</b> {company.cr}<br /><b>VAT:</b> {company.vat}</p>
            <h4>Our Operating Focus</h4>
            <ul className="tags">{focus.map(f => <li key={f}>{f}</li>)}</ul>
          </div>
          <form className="card form" onSubmit={submit}>
            <h3>Send an Enquiry</h3>
            <input name="name" placeholder="Your name" required />
            <input name="phone" placeholder="Phone" />
            <textarea name="message" rows="5" placeholder="Tell us about your project" required />
            <button className="btn gold" type="submit">Send Message</button>
            {sent && <p className="ok">Opening your email app…</p>}
          </form>
        </div>
      </Section>
    </>
  )
}
