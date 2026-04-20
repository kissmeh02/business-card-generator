import BackBackground from '../backgrounds/BackBackground.jsx'
import { BRAND } from '../../config/constants.js'

function BrandCard({ showUv = false }) {
  return (
    <div className="card back">
      <BackBackground />
      <div className="layout">
        <div className={`back-logo-col${showUv ? ' uv-on' : ''}`}>
          <img src={BRAND.logoPath} alt={`${BRAND.name} logo`} />
        </div>
        <div className="back-vr" />
        <div className="back-text">
          <div className="back-brand">{BRAND.name}</div>
          <div className="back-sub">{BRAND.tagline}</div>
          <div className="back-rule" />
        </div>
      </div>
    </div>
  )
}

export default BrandCard
