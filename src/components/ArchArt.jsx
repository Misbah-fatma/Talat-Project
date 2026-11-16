// Drawn blueprint artwork used wherever a real photograph has not been supplied yet.
const B = '#F0E8DA', C = '#C9A45C'
const Grid = () => (
  <g stroke={B} strokeOpacity=".07" strokeWidth="1">
    {Array.from({ length: 17 }, (_, i) => <line key={'v' + i} x1={i * 50} y1="0" x2={i * 50} y2="600" />)}
    {Array.from({ length: 13 }, (_, i) => <line key={'h' + i} x1="0" y1={i * 50} x2="800" y2={i * 50} />)}
  </g>
)
const draw = { pathLength: 1, strokeDasharray: 1, className: 'draw' }

const scenes = {
  frame: () => (
    <g fill="none" stroke={B} strokeOpacity=".75" strokeWidth="3">
      {[0, 1, 2, 3, 4].map(i => <line key={i} {...draw} x1={120 + i * 140} y1="520" x2={120 + i * 140} y2="120" />)}
      {[0, 1, 2, 3].map(f => <line key={'f' + f} {...draw} x1="120" y1={520 - f * 100 - 20} x2="680" y2={520 - f * 100 - 20} />)}
      {[0, 1, 3].map(b => <path key={'d' + b} {...draw} d={`M${120 + b * 140} ${420} L${260 + b * 140} ${320}`} strokeOpacity=".4" strokeWidth="2" />)}
      {[1, 2].map(b => <path key={'e' + b} {...draw} d={`M${260 + b * 140} ${220} L${120 + b * 140 + 280 - 140} ${120 + 100}`} strokeOpacity=".4" strokeWidth="2" />)}
      <line x1="120" y1="560" x2="680" y2="560" stroke={C} strokeWidth="2" />
      <line x1="120" y1="550" x2="120" y2="570" stroke={C} strokeWidth="2" /><line x1="680" y1="550" x2="680" y2="570" stroke={C} strokeWidth="2" />
    </g>
  ),
  piping: () => (
    <g fill="none" strokeLinejoin="round">
      <path {...draw} d="M60 470 H300 L430 390 V210 H620 L750 130" stroke={B} strokeOpacity=".75" strokeWidth="22" />
      <path d="M60 470 H300 L430 390 V210 H620 L750 130" stroke="#0C3B2E" strokeWidth="14" />
      <path {...draw} d="M60 530 H520 L600 480 H750" stroke={B} strokeOpacity=".45" strokeWidth="12" />
      {[[300, 470], [430, 300], [620, 210]].map(([x, y], i) => <rect key={i} x={x - 8} y={y - 22} width="16" height="44" fill={B} fillOpacity=".8" transform={i === 1 ? `rotate(90 ${x} ${y})` : ''} />)}
      <path d="M120 470 H260" stroke={C} strokeWidth="2" strokeDasharray="10 10" className="flow" />
    </g>
  ),
  plant: () => (
    <g fill="none" stroke={B} strokeOpacity=".75" strokeWidth="3">
      {[[150, 280, 110, 240], [330, 330, 90, 190], [500, 300, 100, 220]].map(([x, y, w, h], i) => (
        <g key={i}><rect {...draw} x={x} y={y} width={w} height={h} /><ellipse cx={x + w / 2} cy={y} rx={w / 2} ry="16" /><line x1={x} y1={y + 60} x2={x + w} y2={y + 60} strokeOpacity=".3" /></g>
      ))}
      <rect {...draw} x="650" y="120" width="26" height="400" /><line x1="640" y1="120" x2="686" y2="120" />
      <path {...draw} d="M60 460 H740" /><path d="M60 420 H740" strokeOpacity=".4" />
      {[110, 280, 440, 620].map(x => <line key={x} x1={x} y1="420" x2={x} y2="520" strokeOpacity=".5" />)}
      <circle cx="663" cy="90" r="6" stroke={C} strokeWidth="2" />
    </g>
  ),
  scaffold: () => (
    <g fill="none" stroke={B} strokeOpacity=".75" strokeWidth="3">
      {[0, 1, 2, 3, 4, 5].map(i => <line key={i} {...draw} x1={110 + i * 112} y1="540" x2={110 + i * 112} y2="100" />)}
      {[0, 1, 2, 3, 4].map(l => <line key={'l' + l} x1="110" y1={520 - l * 105} x2="670" y2={520 - l * 105} strokeOpacity=".55" />)}
      {[0, 2, 4].map(i => <path key={'x' + i} d={`M${110 + i * 112} 520 L${222 + i * 112} 415 M${222 + i * 112} 520 L${110 + i * 112} 415`} strokeOpacity=".35" strokeWidth="2" />)}
      <rect x="110" y="310" width="560" height="8" fill={C} stroke="none" />
    </g>
  ),
}

export default function ArchArt({ kind = 'frame', caption }) {
  const Scene = scenes[kind] || scenes.frame
  return (
    <svg className="archart" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" role="img" aria-label={caption || 'Architectural line drawing'}>
      <rect width="800" height="600" fill="#0C3B2E" /><Grid /><Scene />
      {[[30, 30], [770, 30], [30, 570], [770, 570]].map(([x, y], i) => <path key={i} d={`M${x - 10} ${y} H${x + 10} M${x} ${y - 10} V${y + 10}`} stroke={B} strokeOpacity=".35" />)}
      {caption && <text x="400" y="585" textAnchor="middle" fill={B} fillOpacity=".4" fontSize="11" letterSpacing="3" fontFamily="Manrope, sans-serif">{caption.toUpperCase()}</text>}
    </svg>
  )
}
