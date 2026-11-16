import { Lines, Reveal } from './animations.jsx'

export default function PageHero({ title, sub, crumb, index }) {
  return (
    <section className="phero">
      {index && <div className="phero-num" aria-hidden="true">{index}</div>}
      <div className="wrap">
        <Reveal mount className="eyebrow light"><i>FAROHA</i><span>{crumb}</span></Reveal>
        <Lines mount as="h1" text={title} delay={.1} />
        {sub && <Reveal mount delay={.5} as="p" className="lead">{sub}</Reveal>}
      </div>
    </section>
  )
}
