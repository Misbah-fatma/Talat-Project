import PageHero from '../components/PageHero.jsx'
import ScrubText from '../components/ScrubText.jsx'
import { Eyebrow, Lines, Reveal } from '../components/animations.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import { values, focus, milestones } from '../data/site.js'

export default function About() {
  usePageMeta('About', 'About FAROHA Contracting Company LLC — vision, mission, values and company milestones.')
  return (
    <>
      <PageHero index="01" crumb="About" title={'More than\nconstruction.'} sub="A multi-disciplinary industrial and infrastructure contracting company." />
      <section className="sec beige">
        <div className="wrap grid12"><div className="c-3"><Eyebrow n="01 /">Overview</Eyebrow></div>
          <div className="c-9"><ScrubText className="statement" text="We support projects across civil, structural, mechanical, electrical, piping and infrastructure works. Our approach is built around responsive execution, practical engineering, coordinated site delivery and long-term client relationships." /></div></div>
      </section>
      <section className="sec navy">
        <div className="wrap vm2">
          <div><Eyebrow n="02 /" light>Our vision</Eyebrow><Lines text={'Resilient assets.\nSustainable development.'} className="h-l" /><Reveal delay={.1}><p className="body-l">To be a trusted contracting partner contributing to resilient industrial assets, high-performing infrastructure and sustainable development in Saudi Arabia.</p></Reveal></div>
          <div><Eyebrow n="03 /" light>Our mission</Eyebrow><Lines text={'Safe. Efficient.\nQuality-driven.'} className="h-l" /><Reveal delay={.1}><p className="body-l">To deliver safe, efficient and quality-driven construction and maintenance solutions through skilled people, responsible practices and disciplined execution.</p></Reveal></div>
        </div>
      </section>
      <section className="sec beige">
        <div className="wrap"><Eyebrow n="04 /">Our values</Eyebrow>
          <ul className="vlist">{values.map(([t, d], i) => <Reveal as="li" key={t} data-cursor="•"><small>{String(i + 1).padStart(2, '0')}</small><h3>{t}</h3><p>{d}</p></Reveal>)}</ul></div>
      </section>
      <section className="sec paper">
        <div className="wrap"><Eyebrow n="05 /">Milestones</Eyebrow><p className="small-note">Dates taken from our official registration certificates.</p>
          <ol className="mile">{milestones.map(([d, t, x]) => <Reveal as="li" key={d}><time>{d}</time><div><h3>{t}</h3><p>{x}</p></div></Reveal>)}</ol></div>
      </section>
      <section className="sec navy">
        <div className="wrap"><Eyebrow n="06 /" light>Operating focus</Eyebrow>
          <ul className="focus">{focus.map((f, i) => <Reveal as="li" key={f} delay={i * .05}>{f}</Reveal>)}</ul></div>
      </section>
    </>
  )
}
