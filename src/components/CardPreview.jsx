import BrandCard from './cards/BrandCard.jsx'
import DetailCard from './cards/DetailCard.jsx'

function PrintGuides() {
  return (
    <>
      <div className="print-guide print-guide-bleed" />
      <div className="print-guide print-guide-safety" />
      <div className="print-guide-label print-guide-label-bleed">
        Bleed · 3mm
      </div>
      <div className="print-guide-label print-guide-label-safety">
        Safety · 3mm
      </div>
    </>
  )
}

function CardPreview({
  card,
  side,
  label,
  contactSize,
  showGuides = false,
  showUv = false,
}) {
  const defaultLabel =
    side === 'front' ? 'Front · Moo Mini 2.8" × 1.1"' : 'Back · Moo Mini 2.8" × 1.1"'

  return (
    <article className="preview-card">
      <div className="preview-copy">
        <p className="lbl">{label ?? defaultLabel}</p>
      </div>

      <div className="mini-card-frame">
        <div className="card-stage">
          {side === 'front' ? (
            <BrandCard showUv={showUv} />
          ) : (
            <DetailCard
              card={card}
              contactSize={contactSize}
              showUv={showUv}
            />
          )}
          {showGuides && <PrintGuides />}
        </div>
      </div>
    </article>
  )
}

export default CardPreview
