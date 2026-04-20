import { CARD_WIDTH, CARD_HEIGHT } from '../../templates/cardStyles.js'
import HexPattern from './HexPattern.jsx'

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
        <HexPattern id="hxb" opacity={0.07} />
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
