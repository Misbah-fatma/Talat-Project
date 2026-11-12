import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Animated 3D scene: a structural-steel frame assembling itself, a piping loop,
// a rotating gear/ring and floating spark particles. Reacts to the mouse.
export default function Hero3D() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x071f23, 12, 28)
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.set(7, 5, 9)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    el.appendChild(renderer.domElement)

    scene.add(new THREE.AmbientLight(0xffffff, 0.5))
    const key = new THREE.DirectionalLight(0xffe2a8, 1.4); key.position.set(6, 10, 6); scene.add(key)
    const rim = new THREE.PointLight(0x1fbf8f, 40, 30); rim.position.set(-6, 3, -4); scene.add(rim)

    const root = new THREE.Group(); scene.add(root)
    const steel = new THREE.MeshStandardMaterial({ color: 0xc9a45c, metalness: 0.85, roughness: 0.3 })
    const dark = new THREE.MeshStandardMaterial({ color: 0x1b6f58, metalness: 0.7, roughness: 0.35 })

    // grid floor
    const grid = new THREE.GridHelper(20, 20, 0xc9a45c, 0x1b4a4a); grid.position.y = -0.01
    grid.material.transparent = true; grid.material.opacity = 0.35; root.add(grid)

    // steel frame: columns, beams, braces — each piece "builds in" sequentially
    const pieces = []
    const W = 4, D = 3, floors = 3, H = 1.8
    const add = (geo, mat, pos, rot, delay) => {
      const m = new THREE.Mesh(geo, mat); m.position.copy(pos); if (rot) m.rotation.set(...rot)
      m.userData = { target: pos.clone(), delay }; m.position.y += 6; m.scale.setScalar(0.001)
      root.add(m); pieces.push(m)
    }
    let n = 0
    for (let f = 0; f < floors; f++) {
      const y = f * H
      for (const x of [-W / 2, W / 2]) for (const z of [-D / 2, D / 2])
        add(new THREE.BoxGeometry(0.22, H, 0.22), steel, new THREE.Vector3(x, y + H / 2, z), null, n++ * 0.12)
      const yb = y + H
      for (const z of [-D / 2, D / 2]) add(new THREE.BoxGeometry(W, 0.16, 0.2), dark, new THREE.Vector3(0, yb, z), null, n++ * 0.12)
      for (const x of [-W / 2, W / 2]) add(new THREE.BoxGeometry(0.2, 0.16, D), dark, new THREE.Vector3(x, yb, 0), null, n++ * 0.12)
      const len = Math.hypot(W, H)
      add(new THREE.BoxGeometry(len, 0.07, 0.07), steel, new THREE.Vector3(0, y + H / 2, D / 2), [0, 0, Math.atan2(H, W)], n++ * 0.12)
      add(new THREE.BoxGeometry(len, 0.07, 0.07), steel, new THREE.Vector3(0, y + H / 2, -D / 2), [0, 0, -Math.atan2(H, W)], n++ * 0.12)
      const slab = new THREE.Mesh(new THREE.BoxGeometry(W, 0.06, D), new THREE.MeshStandardMaterial({ color: 0x0d4a3a, transparent: true, opacity: 0.35 }))
      slab.position.set(0, yb, 0); slab.userData = { target: slab.position.clone(), delay: n++ * 0.12 }; slab.position.y += 6; slab.scale.setScalar(0.001)
      root.add(slab); pieces.push(slab)
    }

    // piping loop with flanges, beside the frame
    const pipeGroup = new THREE.Group(); pipeGroup.position.set(-5, 0, 1); root.add(pipeGroup)
    const path = new THREE.CurvePath()
    const pts = [[0, 0, 0], [0, 2.5, 0], [0, 2.5, 3], [0, 0.6, 3], [0, 0.6, 5]].map(p => new THREE.Vector3(...p))
    for (let i = 0; i < pts.length - 1; i++) path.add(new THREE.LineCurve3(pts[i], pts[i + 1]))
    const pipe = new THREE.Mesh(new THREE.TubeGeometry(path, 60, 0.18, 14, false), new THREE.MeshStandardMaterial({ color: 0x2bd1a0, metalness: 0.6, roughness: 0.25 }))
    pipeGroup.add(pipe)
    pts.forEach(p => { const fl = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.08, 20), steel); fl.position.copy(p); pipeGroup.add(fl) })
    // "flow" beads travelling the pipe
    const beads = []
    for (let i = 0; i < 8; i++) {
      const b = new THREE.Mesh(new THREE.SphereGeometry(0.11, 12, 12), new THREE.MeshBasicMaterial({ color: 0xfff1c7 }))
      b.userData.t = i / 8; pipeGroup.add(b); beads.push(b)
    }

    // spinning gear ring
    const gear = new THREE.Group(); gear.position.set(5, 2.4, -1); root.add(gear)
    gear.add(new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.16, 16, 48), steel))
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2
      const t = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.3), steel)
      t.position.set(Math.cos(a) * 1.3, Math.sin(a) * 1.3, 0); t.rotation.z = a; gear.add(t)
    }
    const inner = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.08, 12, 32), dark); gear.add(inner)

    // halo rings orbiting the build
    const halo = new THREE.Group(); halo.position.y = 2.6; root.add(halo)
    ;[[4.6, 0x1fbf8f, 0.5], [5.6, 0xc9a45c, 0.4]].forEach(([r, c, o], i) => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.025, 8, 120), new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: o }))
      ring.rotation.x = Math.PI / 2 + (i ? 0.35 : -0.25); halo.add(ring)
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 12), new THREE.MeshBasicMaterial({ color: c }))
      dot.userData = { r, s: i ? -0.6 : 0.8, tilt: ring.rotation.x }; ring.add(dot); ring.userData.dot = dot
    })

    // sparks
    const N = 300, pos = new Float32Array(N * 3), vel = []
    for (let i = 0; i < N; i++) { pos.set([(Math.random() - .5) * 18, Math.random() * 8, (Math.random() - .5) * 18], i * 3); vel.push(0.2 + Math.random() * 0.6) }
    const pg = new THREE.BufferGeometry(); pg.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const sparks = new THREE.Points(pg, new THREE.PointsMaterial({ color: 0xe6c98a, size: 0.06, transparent: true, opacity: 0.8 }))
    scene.add(sparks)

    // sizing + mouse
    const mouse = { x: 0, y: 0 }
    const resize = () => {
      const w = el.clientWidth, h = el.clientHeight
      renderer.setSize(w, h); camera.aspect = w / h
      camera.position.set(w < 700 ? 9 : 7, w < 700 ? 6 : 5, w < 700 ? 12 : 9)
      const wide = w >= 860
      root.scale.setScalar(wide ? 0.8 : 0.7)
      if (wide) camera.setViewOffset(w, h, -w * 0.18, 0, w, h); else camera.clearViewOffset()
      camera.updateProjectionMatrix()
    }
    const onMove = e => { mouse.x = (e.clientX / innerWidth - .5) * 2; mouse.y = (e.clientY / innerHeight - .5) * 2 }
    resize(); addEventListener('resize', resize); addEventListener('mousemove', onMove)

    const clock = new THREE.Clock(); let raf
    const ease = t => 1 - Math.pow(1 - t, 3)
    const tmp = new THREE.Vector3()
    const loop = () => {
      raf = requestAnimationFrame(loop)
      const t = clock.getElapsedTime()
      // assemble pieces (loops: rebuild every ~16s)
      const cycle = t % 16
      pieces.forEach(m => {
        const p = THREE.MathUtils.clamp((cycle - m.userData.delay) / 0.9, 0, 1)
        const out = cycle > 14 ? THREE.MathUtils.clamp((cycle - 14) / 2, 0, 1) : 0
        const e = ease(p) * (1 - out)
        m.scale.setScalar(Math.max(e, 0.001))
        m.position.set(m.userData.target.x, m.userData.target.y + (1 - ease(p)) * 6, m.userData.target.z)
      })
      root.rotation.y = t * 0.12 + mouse.x * 0.4
      root.rotation.x = mouse.y * 0.08
      halo.children.forEach(r => { const d = r.userData.dot; const a = t * d.userData.s; d.position.set(Math.cos(a) * d.userData.r, Math.sin(a) * d.userData.r, 0) })
      halo.rotation.y = t * 0.25
      gear.rotation.z = t * 0.8; gear.rotation.y = Math.sin(t * 0.4) * 0.5; inner.rotation.z = -t * 1.6
      beads.forEach(b => { b.userData.t = (b.userData.t + 0.0035) % 1; path.getPoint(b.userData.t, tmp); b.position.copy(tmp) })
      const arr = pg.attributes.position.array
      for (let i = 0; i < N; i++) { arr[i * 3 + 1] += vel[i] * 0.012; if (arr[i * 3 + 1] > 8) arr[i * 3 + 1] = 0 }
      pg.attributes.position.needsUpdate = true
      renderer.render(scene, camera)
    }
    loop()

    return () => {
      cancelAnimationFrame(raf); removeEventListener('resize', resize); removeEventListener('mousemove', onMove)
      renderer.dispose(); el.removeChild(renderer.domElement)
    }
  }, [])

  return <div className="hero3d" ref={ref} aria-hidden="true" />
}
