# FAROHA Contracting Company LLC — Website

React + Vite, frontend only. Framer Motion (component animation), GSAP ScrollTrigger (scroll-linked effects), Lenis (smooth scroll), Swiper, Lucide, React Router, React Hook Form.

## Run
```
npm install
npm run dev      # development
npm run build    # production build -> dist/
```

## Adding real content (nothing is invented — empty sections stay hidden)
- `src/data/media.js` — photography slots (hero, overview, services…). Empty = blueprint artwork.
- `src/data/projects.js` — projects (home portfolio, /projects, /projects/:slug, galleries).
- `src/data/people.js` — leadership message, organisation structure, testimonials.
- `src/data/site.js` / `services.js` — company details and services copy.

Photos go in `public/images/`. `public/_redirects` handles SPA routing on Netlify.
