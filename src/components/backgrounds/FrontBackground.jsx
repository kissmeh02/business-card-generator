import { CARD_WIDTH, CARD_HEIGHT } from '../../templates/cardStyles.js'
import HexPattern from './HexPattern.jsx'

function FrontBackground() {
  return (
    <svg
      className="bg"
      viewBox={`0 0 ${CARD_WIDTH} ${CARD_HEIGHT}`}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="rg1" cx="16%" cy="50%" r="44%">
          <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="vg1" cx="50%" cy="50%" r="95%">
          <stop offset="50%" stopColor="#000000" stopOpacity="0" />
          <stop offset="72%" stopColor="#000000" stopOpacity="0.2" />
          <stop offset="88%" stopColor="#000000" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.8" />
        </radialGradient>
        <HexPattern id="hx" opacity={0.09} />
        <mask id="hxm">
          <rect width={CARD_WIDTH} height={CARD_HEIGHT} fill="url(#hxg)" />
        </mask>
        <linearGradient id="hxg" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="50%" stopColor="white" stopOpacity="0.05" />
          <stop offset="100%" stopColor="white" stopOpacity="0.42" />
        </linearGradient>
      </defs>
      <rect width={CARD_WIDTH} height={CARD_HEIGHT} fill="#0b1319" />
      <rect
        width={CARD_WIDTH}
        height={CARD_HEIGHT}
        fill="url(#hx)"
        mask="url(#hxm)"
      />
      <rect width={CARD_WIDTH} height={CARD_HEIGHT} fill="url(#rg1)" />
      <rect width={CARD_WIDTH} height={CARD_HEIGHT} fill="url(#vg1)" />
    </svg>
  )
}

export default FrontBackground
