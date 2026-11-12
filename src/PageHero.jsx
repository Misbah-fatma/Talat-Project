import PageScene from './PageScene.jsx'

export default function PageHero({ title, sub, variant }) {
  return (
    <section className="page-hero">
      {variant && <PageScene variant={variant} />}
      <div className="container"><p className="eyebrow">FAROHA Contracting</p><h1>{title}</h1>{sub && <p className="lead">{sub}</p>}</div>
    </section>
  )
}
