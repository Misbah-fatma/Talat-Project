import PageHero from '../components/PageHero.jsx'
import { Eyebrow, Reveal } from '../components/animations.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import { support, steps } from '../data/site.js'

export default function Support() {
  usePageMeta('Project Support', 'Construction and site development, equipment and manpower support, and industrial maintenance.')
  return (
    <>
      <PageHero index="03" crumb="Project support" title={'Support that\nkeeps sites moving.'} sub="Flexible site execution and project delivery services." />
      <section className="sec beige"><div className="wrap">
        <Eyebrow n="01 /">Services</Eyebrow>
        <ul className="big-rows">{support.map(([t, d], i) => <Reveal as="li" key={t} data-cursor="•"><small>{String(i + 1).padStart(2, '0')}</small><h3>{t}</h3><p>{d}</p></Reveal>)}</ul>
      </div></section>
      <section className="sec navy"><div className="wrap">
        <Eyebrow n="02 /" light>Delivery approach</Eyebrow>
        <ol className="flow-steps">{steps.map((s, i) => <Reveal as="li" key={i} delay={i * .08}><b>{String(i + 1).padStart(2, '0')}</b><p>{s}</p></Reveal>)}</ol>
      </div></section>
    </>
  )
}
