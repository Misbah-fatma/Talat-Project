import { useEffect } from 'react'
export default function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | FAROHA Contracting Company LLC` : 'FAROHA Contracting Company LLC | Industrial & Infrastructure Contracting, Al Jubail'
    let m = document.querySelector('meta[name="description"]')
    if (!m) { m = document.createElement('meta'); m.name = 'description'; document.head.appendChild(m) }
    if (description) m.content = description
  }, [title, description])
}
