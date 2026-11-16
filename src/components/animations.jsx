import { useContext, useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { Ready } from './ready.js'

export const ease = [.22, .8, .24, 1]

// Masked line/word reveal. Framer Motion owns entrance reveals.
export function Lines({ text, as: Tag = 'h2', className = '', delay = 0, stagger = .06, mount = false }) {
  const ready = useContext(Ready)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -8% 0px' })
  const go = mount ? ready : inView
  let i = 0
  return (
    <Tag ref={ref} className={`lines ${className}`} aria-label={text.replace(/\n/g, ' ')}>
      {text.split('\n').map((ln, li) => (
        <span className="line" key={li} aria-hidden="true">
          {ln.split(' ').map((w, wi) => (
            <span className="mask" key={wi}>
              <motion.span style={{ display: 'inline-block' }} initial={{ y: '115%' }} animate={{ y: go ? 0 : '115%' }} transition={{ duration: 1.05, delay: delay + (i++) * stagger, ease }}>{w}&nbsp;</motion.span>
            </span>
          ))}
        </span>
      ))}
    </Tag>
  )
}

export function Reveal({ children, delay = 0, y = 30, className = '', as = 'div', mount = false, ...rest }) {
  const M = motion[as]; const ready = useContext(Ready)
  const props = mount ? { animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y } } : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-60px' } }
  return <M className={className} initial={{ opacity: 0, y }} {...props} transition={{ duration: .9, delay, ease }} {...rest}>{children}</M>
}

export function Counter({ to, suffix = '' }) {
  const ref = useRef(null); const inView = useInView(ref, { once: true }); const [v, setV] = useState(0)
  useEffect(() => { if (inView) { const c = animate(0, to, { duration: 1.8, ease: 'easeOut', onUpdate: x => setV(Math.round(x)) }); return () => c.stop() } }, [inView, to])
  return <span ref={ref}>{v}{suffix}</span>
}

export const Eyebrow = ({ n, children, light }) => (
  <Reveal className={`eyebrow${light ? ' light' : ''}`}>{n && <i>{n}</i>}<span>{children}</span></Reveal>
)
