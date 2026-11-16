import PageHero from '../components/PageHero.jsx'
import { Eyebrow, Lines, Reveal } from '../components/animations.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import { sustain, hse, quality } from '../data/site.js'

const chapters = [['Health, safety & environment', hse], ['Quality commitment', quality], ['Sustainable construction', sustain]]

export default function Hse() {
  usePageMeta('Safety & Quality', 'Health, safety, environment, quality and sustainability commitments at FAROHA Contracting.')
  return (
    <>
      <PageHero index="05" crumb="Safety & quality" title={'Responsible\nconstruction.'} sub="Safety, quality and sustainability for long-term value." />
      {chapters.map(([t, items], i) => (
        <section key={t} className={`sec ${i % 2 ? 'paper' : 'beige'}`}>
          <div className="wrap grid12">
            <div className="c-5 sticky"><Eyebrow n={`0${i + 1} /`}>Chapter</Eyebrow><Lines text={t} className="h-l" /></div>
            <ul className="c-6 off-1 chap">{items.map(x => <Reveal as="li" key={x}>{x}</Reveal>)}</ul>
          </div>
        </section>
      ))}
      <section className="sec navy"><div className="wrap"><Lines text={'Practical engineering.\nSafer sites.\nResponsible resources.\nReliable outcomes.'} className="h-xl" /></div></section>
    </>
  )
}
