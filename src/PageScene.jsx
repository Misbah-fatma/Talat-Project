import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const GOLD = 0xc9a45c, GREEN = 0x1fbf8f, DEEP = 0x1b6f58
const std = (c, m = 0.8, r = 0.3) => new THREE.MeshStandardMaterial({ color: c, metalness: m, roughness: r })
const wire = (c, o = 0.8) => new THREE.MeshBasicMaterial({ color: c, wireframe: true, transparent: true, opacity: o })

// Each variant builds a themed 3D object and returns an update(t) function.
const builders = {
  // About: rotating star-in-ring emblem (company logo motif)
  about(g) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(2, 0.12, 16, 80), std(GOLD)); g.add(ring)
    const shape = new THREE.Shape()
    for (let i = 0; i < 10; i++) { const a = (i / 10) * Math.PI * 2 - Math.PI / 2, r = i % 2 ? 0.8 : 1.8; i ? shape.lineTo(Math.cos(a) * r, Math.sin(a) * r) : shape.moveTo(Math.cos(a) * r, Math.sin(a) * r) }
    const star = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: 0.3, bevelEnabled: true, bevelSize: 0.05, bevelThickness: 0.05 }), std(GOLD, 0.9, 0.2)); star.position.z = -0.15; g.add(star)
    const halo = new THREE.Mesh(new THREE.IcosahedronGeometry(2.8, 1), wire(GREEN, 0.25)); g.add(halo)
    return t => { g.rotation.y = Math.sin(t * 0.6) * 0.8; ring.rotation.z = t * 0.3; halo.rotation.x = t * 0.15; halo.rotation.y = t * 0.2 }
  },
  // Services: cluster of orbiting gears
  services(g) {
    const mk = (r, teeth, c) => {
      const gr = new THREE.Group(); gr.add(new THREE.Mesh(new THREE.TorusGeometry(r, r * 0.13, 12, 40), std(c)))
      for (let i = 0; i < teeth; i++) { const a = i / teeth * Math.PI * 2; const b = new THREE.Mesh(new THREE.BoxGeometry(r * .28, r * .28, r * .28), std(c)); b.position.set(Math.cos(a) * r * 1.2, Math.sin(a) * r * 1.2, 0); b.rotation.z = a; gr.add(b) }
      return gr
    }
    const a = mk(1.5, 12, GOLD), b = mk(1, 8, GREEN), c = mk(.7, 6, DEEP)
    a.position.set(0, 0, 0); b.position.set(2.5, 1.4, 0); c.position.set(-1.8, -1.9, 0); g.add(a, b, c)
    return t => { a.rotation.z = t * .5; b.rotation.z = -t * .75; c.rotation.z = t * 1.05; g.rotation.y = Math.sin(t * .5) * .5; g.rotation.x = .2 }
  },
  // Support: crane with swinging load
  support(g) {
    const m = std(GOLD), d = std(DEEP)
    const mast = new THREE.Mesh(new THREE.BoxGeometry(.3, 5, .3), m); mast.position.y = 0; g.add(mast)
    const jib = new THREE.Group(); jib.position.y = 2.5; g.add(jib)
    const arm = new THREE.Mesh(new THREE.BoxGeometry(5, .2, .25), m); arm.position.x = 1; jib.add(arm)
    const cw = new THREE.Mesh(new THREE.BoxGeometry(.7, .7, .5), d); cw.position.x = -1.2; cw.position.y = -.3; jib.add(cw)
    const cable = new THREE.Mesh(new THREE.CylinderGeometry(.02, .02, 2.5, 6), new THREE.MeshBasicMaterial({ color: 0xffffff })); cable.position.set(2.5, -1.25, 0); jib.add(cable)
    const load = new THREE.Mesh(new THREE.BoxGeometry(.9, .6, .9), std(GREEN, .5, .4)); load.position.set(2.5, -2.7, 0); jib.add(load)
    const base = new THREE.Mesh(new THREE.BoxGeometry(1.6, .3, 1.6), d); base.position.y = -2.6; g.add(base)
    return t => { jib.rotation.y = Math.sin(t * .5) * 1.1; load.position.y = -2.7 + Math.sin(t * 1.4) * .25; cable.scale.y = 1 + Math.sin(t * 1.4) * .1; g.position.y = -.2; g.rotation.x = .12 }
  },
  // HSE: shield with orbiting rings
  hse(g) {
    const s = new THREE.Shape(); s.moveTo(0, 2); s.bezierCurveTo(1.6, 1.8, 1.8, 1.7, 1.8, 0.6); s.bezierCurveTo(1.8, -1, .8, -1.8, 0, -2.3); s.bezierCurveTo(-.8, -1.8, -1.8, -1, -1.8, .6); s.bezierCurveTo(-1.8, 1.7, -1.6, 1.8, 0, 2)
    const shield = new THREE.Mesh(new THREE.ExtrudeGeometry(s, { depth: .35, bevelEnabled: true, bevelSize: .08, bevelThickness: .08 }), std(DEEP, .6, .3)); g.add(shield)
    const tick = new THREE.Mesh(new THREE.TorusGeometry(.7, .1, 8, 30, Math.PI * 1.5), std(GOLD)); tick.position.z = .45; g.add(tick)
    const r1 = new THREE.Mesh(new THREE.TorusGeometry(2.7, .03, 8, 100), new THREE.MeshBasicMaterial({ color: GREEN })); const r2 = r1.clone(); r2.scale.setScalar(1.2); r2.material = new THREE.MeshBasicMaterial({ color: GOLD }); g.add(r1, r2)
    return t => { g.rotation.y = Math.sin(t * .7) * .7; r1.rotation.x = t * .5; r1.rotation.y = t * .3; r2.rotation.x = -t * .4; r2.rotation.z = t * .35; tick.rotation.z = t * .6 }
  },
  // Certificates: floating certificate plates with seal
  certificates(g) {
    const mk = (c, x, y, z) => { const grp = new THREE.Group(); grp.add(new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.8, .06), std(0xf7f3e8, .1, .6)))
      const stripe = new THREE.Mesh(new THREE.BoxGeometry(2.6, .25, .08), std(c, .5, .3)); stripe.position.y = .75; grp.add(stripe)
      for (let i = 0; i < 3; i++) { const l = new THREE.Mesh(new THREE.BoxGeometry(1.4 - i * .25, .06, .08), std(0x9aa8a6, .1, .8)); l.position.set(-.3, .2 - i * .28, 0); grp.add(l) }
      const seal = new THREE.Mesh(new THREE.CylinderGeometry(.3, .3, .08, 24), std(GOLD, .9, .2)); seal.rotation.x = Math.PI / 2; seal.position.set(.8, -.6, .05); grp.add(seal)
      grp.position.set(x, y, z); g.add(grp); return grp }
    const a = mk(GREEN, -.8, .9, 0), b = mk(GOLD, .9, -.8, .6)
    return t => { a.rotation.y = Math.sin(t * .8) * .5; a.position.y = .9 + Math.sin(t * 1.2) * .15; b.rotation.y = Math.sin(t * .8 + 1) * .5 - .3; b.position.y = -.8 + Math.sin(t * 1.2 + 1.5) * .15; g.rotation.x = .15 }
  },
  // Contact: wireframe globe with location pin and orbiting signals
  contact(g) {
    const globe = new THREE.Mesh(new THREE.SphereGeometry(1.9, 24, 18), wire(GREEN, .45)); g.add(globe)
    const core = new THREE.Mesh(new THREE.SphereGeometry(1.8, 24, 18), new THREE.MeshStandardMaterial({ color: 0x0b3b36, metalness: .3, roughness: .6, transparent: true, opacity: .9 })); g.add(core)
    const pin = new THREE.Group(); const cone = new THREE.Mesh(new THREE.ConeGeometry(.25, .7, 16), std(GOLD)); cone.rotation.x = Math.PI; cone.position.y = .35
    const head = new THREE.Mesh(new THREE.SphereGeometry(.25, 16, 16), std(GOLD)); head.position.y = .8; pin.add(cone, head)
    const lat = .45, lon = .9; pin.position.set(Math.cos(lat) * Math.sin(lon) * 1.9, Math.sin(lat) * 1.9, Math.cos(lat) * Math.cos(lon) * 1.9)
    pin.lookAt(pin.position.clone().multiplyScalar(2)); pin.rotateX(Math.PI / 2); globe.add(pin)
    const orb = new THREE.Mesh(new THREE.SphereGeometry(.12, 12, 12), new THREE.MeshBasicMaterial({ color: GOLD })); g.add(orb)
    const ring = new THREE.Mesh(new THREE.TorusGeometry(2.6, .02, 8, 100), new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: .6 })); ring.rotation.x = 1.2; g.add(ring)
    return t => { globe.rotation.y = t * .3; core.rotation.y = t * .3; orb.position.set(Math.cos(t) * 2.6, Math.sin(t) * 2.6 * Math.cos(1.2), Math.sin(t) * 2.6 * Math.sin(1.2)); ring.rotation.z = t * .2 }
  },
}

export default function PageScene({ variant = 'about' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, 1, .1, 100); camera.position.set(0, 0, 9)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2)); el.appendChild(renderer.domElement)
    scene.add(new THREE.AmbientLight(0xffffff, .6))
    const k = new THREE.DirectionalLight(0xffe2a8, 1.5); k.position.set(4, 5, 6); scene.add(k)
    const r = new THREE.PointLight(GREEN, 30, 25); r.position.set(-5, 2, 3); scene.add(r)
    const group = new THREE.Group(); scene.add(group)
    const update = (builders[variant] || builders.about)(group)

    // sparks
    const N = 120, pos = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) pos.set([(Math.random() - .5) * 10, (Math.random() - .5) * 7, (Math.random() - .5) * 6], i * 3)
    const pg = new THREE.BufferGeometry(); pg.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const pts = new THREE.Points(pg, new THREE.PointsMaterial({ color: 0xe6c98a, size: .05, transparent: true, opacity: .8 })); scene.add(pts)

    const mouse = { x: 0, y: 0 }
    const resize = () => { const w = el.clientWidth, h = el.clientHeight; renderer.setSize(w, h); camera.aspect = w / h; camera.position.z = w < 700 ? 11 : 9; camera.updateProjectionMatrix() }
    const move = e => { mouse.x = (e.clientX / innerWidth - .5); mouse.y = (e.clientY / innerHeight - .5) }
    resize(); addEventListener('resize', resize); addEventListener('mousemove', move)
    const clock = new THREE.Clock(); let raf
    const loop = () => {
      raf = requestAnimationFrame(loop); const t = clock.getElapsedTime()
      update(t)
      group.position.x += (mouse.x * .8 - group.position.x) * .05
      group.position.y += (-mouse.y * .5 - group.position.y) * .05 + (variant === 'support' ? 0 : 0)
      pts.rotation.y = t * .03; pts.position.y = Math.sin(t * .5) * .1
      renderer.render(scene, camera)
    }
    loop()
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', resize); removeEventListener('mousemove', move); renderer.dispose(); el.removeChild(renderer.domElement) }
  }, [variant])
  return <div className="pagescene" ref={ref} aria-hidden="true" />
}
