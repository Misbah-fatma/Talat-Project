import { Suspense, useEffect, useRef, useState } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SmoothScroll from './SmoothScroll.jsx'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import LeadModal from './LeadModal.jsx'
import { Ready } from './ready.js'
import { company } from '../data/site.js'

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches

const toTop = () => { window.__lenis ? window.__lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0) }

export default function Layout() {
  const outlet = useOutlet()
  const { pathname } = useLocation()
  const [curtain, setCurtain] = useState(null)
  const first = useRef(true)

  useEffect(() => { if (first.current) { first.current = false; return } setCurtain(pathname) }, [pathname])


  return (
    <Ready.Provider value={true}>
      <SmoothScroll />
      <Navbar />
      {curtain && !reduced() && (
        <motion.div key={curtain} className="curtain" aria-hidden="true"
          initial={{ y: '100%' }} animate={{ y: ['100%', '0%', '0%', '-100%'] }} transition={{ duration: 1.35, times: [0, .38, .55, 1], ease: [.76, 0, .24, 1] }}>
          <span>FAROHA</span>
        </motion.div>
      )}
      <AnimatePresence mode="wait" onExitComplete={toTop}>
        <motion.main key={pathname} id="main" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: .6, delay: first.current ? 0 : .25 } }}
          exit={{ opacity: 0, transition: { duration: .15, delay: reduced() ? 0 : .42 } }} onAnimationComplete={() => ScrollTrigger.refresh()}>
          <Suspense fallback={null}>{outlet}</Suspense>
        </motion.main>
      </AnimatePresence>
      <Footer />
      <LeadModal />
      <div className="mbar"><a href={`tel:${company.mobile.replace(/\s/g, '')}`}>Call now</a><button data-quote>Get a quote</button></div>
    </Ready.Provider>
  )
}
