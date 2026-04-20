import { CARD_WIDTH, CARD_HEIGHT } from '../../templates/cardStyles.js'

function BackBackground() {
  return (
    <svg
      className="bg"
      viewBox={`0 0 ${CARD_WIDTH} ${CARD_HEIGHT}`}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="rg2" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="vg2" cx="50%" cy="50%" r="95%">
          <stop offset="65%" stopColor="#000000" stopOpacity="0" />
          <stop offset="82%" stopColor="#000000" stopOpacity="0.06" />
          <stop offset="93%" stopColor="#000000" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.35" />
        </radialGradient>
        <pattern
          id="hxb"
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
            opacity="0.07"
          />
        </pattern>
      </defs>
      <rect width={CARD_WIDTH} height={CARD_HEIGHT} fill="#060b10" />
      <rect width={CARD_WIDTH} height={CARD_HEIGHT} fill="url(#hxb)" />
      <rect width={CARD_WIDTH} height={CARD_HEIGHT} fill="url(#rg2)" />
      <rect width={CARD_WIDTH} height={CARD_HEIGHT} fill="url(#vg2)" />
      <polyline
        points="0,22 0,0 22,0"
        fill="none"
        stroke="#00e5ff"
        strokeWidth="0.9"
        opacity="0.17"
      />
      <polyline
        points={`${CARD_WIDTH},22 ${CARD_WIDTH},0 ${CARD_WIDTH - 22},0`}
        fill="none"
        stroke="#00e5ff"
        strokeWidth="0.9"
        opacity="0.17"
      />
      <polyline
        points={`0,${CARD_HEIGHT - 22} 0,${CARD_HEIGHT} 22,${CARD_HEIGHT}`}
        fill="none"
        stroke="#00e5ff"
        strokeWidth="0.9"
        opacity="0.17"
      />
      <polyline
        points={`${CARD_WIDTH},${CARD_HEIGHT - 22} ${CARD_WIDTH},${CARD_HEIGHT} ${CARD_WIDTH - 22},${CARD_HEIGHT}`}
        fill="none"
        stroke="#00e5ff"
        strokeWidth="0.9"
        opacity="0.17"
      />
    </svg>
  )
}

export default BackBackground
