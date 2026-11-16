import { useState, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ArchArt from './ArchArt.jsx'
gsap.registerPlugin(ScrollTrigger)

export default function Photo({ src, art = 'frame', alt = '', caption, className = '', eager }) {
  const [bad, setBad] = useState(false)
  return (
    <div className={`photo ${className}`}>
      {src && !bad ? <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} onError={() => setBad(true)} /> : <ArchArt kind={art} caption={caption} />}
    </div>
  )
}

// GSAP owns scroll-linked motion: slow vertical parallax inside a masked frame.
export function Parallax({ children, className = '', amount = 8 }) {
  const wrap = useRef(null), inner = useRef(null)
  useLayoutEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.fromTo(inner.current, { yPercent: -amount }, { yPercent: amount, ease: 'none', scrollTrigger: { trigger: wrap.current, start: 'top bottom', end: 'bottom top', scrub: true } })
    }, wrap)
    return () => ctx.revert()
  }, [amount])
  return <div ref={wrap} className={`parallax ${className}`}><div ref={inner} className="parallax-in">{children}</div></div>
}
