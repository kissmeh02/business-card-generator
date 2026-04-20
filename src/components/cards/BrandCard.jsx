import BackBackground from '../backgrounds/BackBackground.jsx'

const LOGO_SRC = '/images/6phene-logo.png'

function BrandCard() {
  return (
    <div className="card back">
      <BackBackground />
      <div className="layout">
        <div className="back-logo-col">
          <img src={LOGO_SRC} alt="6Phene Inc. logo" />
        </div>
        <div className="back-vr" />
        <div className="back-text">
          <div className="back-brand">6PHENE INC.</div>
          <div className="back-sub">Graphene · Nano · Materials</div>
          <div className="back-rule" />
        </div>
      </div>
    </div>
  )
}

export default BrandCard
