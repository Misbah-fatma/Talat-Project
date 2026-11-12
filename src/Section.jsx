export default function Section({ title, sub, children, alt }) {
  return (
    <section className={alt ? 'section alt' : 'section'}>
      <div className="container">
        {title && <><h2>{title}</h2>{sub && <p className="sub">{sub}</p>}<div className="bar" /></>}
        {children}
      </div>
    </section>
  )
}
