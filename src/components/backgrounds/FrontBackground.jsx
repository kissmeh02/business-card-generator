import { CARD_WIDTH, CARD_HEIGHT } from '../../templates/cardStyles.js'

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
          <stop offset="55%" stopColor="#000000" stopOpacity="0" />
          <stop offset="78%" stopColor="#000000" stopOpacity="0.15" />
          <stop offset="92%" stopColor="#000000" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.7" />
        </radialGradient>
        <pattern
          id="hx"
          x="0"
          y="0"
          width="20"
          height="23.1"
          patternUnits="userSpaceOnUse"
        >
          <polygon
            points="10,0.7 18.3,5.5 18.3,15.1 10,19.9 1.7,15.1 1.7,5.5"
            fill="none"
            stroke="#00e5ff"
            strokeWidth="0.28"
            opacity="0.09"
          />
        </pattern>
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
