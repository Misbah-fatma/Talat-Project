import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Photo, { Parallax } from '../components/Photo.jsx'
import { Lines, Reveal } from '../components/animations.jsx'
import { media } from '../data/media.js'

export default function ContactCTA() {
  return (
    <section className="cta">
      <Parallax className="cta-bg" amount={7}><Photo src={media.cta} art="plant" alt="" caption="Fig. 05 — Plant elevation" /></Parallax>
      <div className="cta-shade" />
      <div className="wrap cta-in">
        <Lines text={'Let’s build something\nmeaningful.'} className="h-xxl" />
        <Reveal delay={.2}><p className="lead">Get in touch with the FAROHA team.</p><div className="hero-ctas"><button className="btn light" data-quote>Get a free quote <ArrowUpRight size={18} /></button><Link to="/contact" className="btn line">Contact our team</Link></div></Reveal>
      </div>
    </section>
  )
}
