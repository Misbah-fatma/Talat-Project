import { motion } from 'framer-motion'
import { Eyebrow, Lines, Reveal } from '../components/animations.jsx'
import Photo, { Parallax } from '../components/Photo.jsx'
import ScrubText from '../components/ScrubText.jsx'
import { leadership } from '../data/people.js'

export default function Leadership({ n }) {
  return (
    <section className="sec paper">
      <div className="wrap grid12">
        <div className="l5">
          <motion.div initial="hide" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
            <motion.div className="portrait" variants={{ hide: { clipPath: 'inset(0 100% 0 0)' }, show: { clipPath: 'inset(0 0% 0 0)' } }} transition={{ duration: 1.3, ease: [.76, 0, .24, 1] }}>
              <Parallax amount={5}><Photo src={leadership.photo} art="frame" alt="" /></Parallax>
            </motion.div>
          </motion.div>
        </div>
        <div className="r6">
          <Eyebrow n={n}>Leadership message</Eyebrow>
          <Lines text="A message from our leadership." className="h-l" />
          <ScrubText className="quote" text={leadership.message} />
          <Reveal><p className="sign"><b>{leadership.name}</b><span>{leadership.designation}</span></p></Reveal>
        </div>
      </div>
    </section>
  )
}
