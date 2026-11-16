import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Eyebrow, Lines, Reveal } from '../components/animations.jsx'
import Photo, { Parallax } from '../components/Photo.jsx'
import { media } from '../data/media.js'

export default function Overview({ n }) {
  return (
    <section className="sec beige">
      <div className="wrap grid12 center-y">
        <div className="l6">
          <motion.div initial="hide" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
            <motion.div className="tall-img" variants={{ hide: { clipPath: 'inset(100% 0 0 0)' }, show: { clipPath: 'inset(0% 0 0 0)' } }} transition={{ duration: 1.3, ease: [.76, 0, .24, 1] }}>
              <Parallax><Photo src={media.overview} art="frame" alt="" caption="Fig. 02 — Frame elevation" /></Parallax>
            </motion.div>
          </motion.div>
        </div>
        <div className="r5">
          <Eyebrow n={n}>Company overview</Eyebrow>
          <Lines text={'Building trust through\nquality and commitment.'} className="h-xl" />
          <Reveal delay={.15}>
            <p className="body-l">FAROHA Contracting Company LLC is a Saudi Arabia-based contracting company focused on integrated technical and industrial services. We support projects across civil, structural, mechanical, electrical, piping and infrastructure works.</p>
            <p className="body-l tight">Our approach is built around responsive execution, practical engineering, coordinated site delivery and long-term client relationships.</p>
            <Link to="/about" className="ulink">Our vision & values <ArrowRight size={16} /></Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
