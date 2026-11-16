import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// Words brighten as you scroll past (GSAP scrub).
export default function ScrubText({ text, className = '' }) {
  const ref = useRef(null)
  useLayoutEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.sw', { opacity: .14 }, { opacity: 1, stagger: .12, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top 82%', end: 'bottom 50%', scrub: true } })
    }, ref)
    return () => ctx.revert()
  }, [])
  return <p ref={ref} className={`scrub ${className}`} aria-label={text}>{text.split(' ').map((w, i) => <span className="sw" aria-hidden="true" key={i}>{w} </span>)}</p>
}
