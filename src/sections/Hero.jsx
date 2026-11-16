import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Lines, Reveal } from '../components/animations.jsx'
import Photo from '../components/Photo.jsx'
import { media } from '../data/media.js'

export default function Hero() {
  return (
    <section className="hero">
      <motion.div className="hero-bg" initial={{ scale: 1.14 }} animate={{ scale: 1 }} transition={{ duration: 3, ease: [.22, .8, .24, 1] }}>
        {media.hero ? <Photo src={media.hero} alt="" eager /> : <div className="hero-art"><Photo art="frame" caption="Fig. 01 — Structural frame" /></div>}
      </motion.div>
      <div className="hero-shade" />
      <div className="wrap hero-in">
        <Reveal mount className="eyebrow light"><i>—</i><span>Building the future with confidence</span></Reveal>
        <Lines mount as="h1" className="hero-h" text={'Excellence in every structure.\nConfidence in every partnership.'} delay={.15} stagger={.07} />
        <Reveal mount delay={.9} as="p" className="lead">Delivering quality-driven contracting solutions with precision and commitment.</Reveal>
        <Reveal mount delay={1.1} className="hero-ctas"><Link to="/about" className="btn light">Discover FAROHA <ArrowUpRight size={18} /></Link><button className="btn line" data-quote>Request a quote</button></Reveal>
      </div>
      <div className="wrap hero-base"><span>Al Jubail · Eastern Province · Kingdom of Saudi Arabia</span><span className="scroll-cue">Scroll<i /></span></div>
    </section>
  )
}
