function HexPattern({ id, opacity = 0.09 }) {
  return (
    <pattern
      id={id}
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
        opacity={opacity}
      />
    </pattern>
  )
}

export default HexPattern
