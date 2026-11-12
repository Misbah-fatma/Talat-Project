export default function Logo({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-label="FCC logo">
      <circle cx="50" cy="50" r="46" fill="#0a2e33" stroke="#c9a45c" strokeWidth="4" />
      <polygon points="50,14 61,42 91,42 67,60 76,88 50,71 24,88 33,60 9,42 39,42" fill="none" stroke="#c9a45c" strokeWidth="3" />
      <text x="50" y="58" textAnchor="middle" fontSize="20" fontWeight="700" fill="#e6c98a" fontFamily="serif">FCC</text>
    </svg>
  )
}
