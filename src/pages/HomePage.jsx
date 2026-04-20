import { useState } from 'react'
import CardForm from '../components/CardForm.jsx'
import CardPreview from '../components/CardPreview.jsx'
import { defaultCard } from '../data/defaultCard.js'
import { useCardExport } from '../hooks/useCardExport.js'

function HomePage() {
  const [card, setCard] = useState(defaultCard)
  const [showGuides, setShowGuides] = useState(false)
  const [showUvPreview, setShowUvPreview] = useState(false)

  const {
    isExporting,
    exportError,
    clearError,
    downloadHtml,
    openPrintView,
    downloadUv,
    openUvView,
  } = useCardExport(card)

  const handleFieldChange = (field, value) => {
    setCard((current) => ({ ...current, [field]: value }))
  }

  const handleReset = () => {
    setCard(defaultCard)
  }

  return (
    <main className="app-shell">
      <section className="hero-panel panel">
        <p className="eyebrow">6PHENE · Moo Mini Card generator</p>
        <h1>Business Card Generator</h1>
        <p className="lead">
          Fill in the contact details and the front/back of the 2.8&quot; ×
          1.1&quot; Moo mini card update in real time. Export a print-ready HTML
          file to send to Moo.
        </p>
      </section>

      <section className="workspace-grid">
        <div className="editor-column">
          <CardForm
            card={card}
            onChange={handleFieldChange}
            onReset={handleReset}
          />

          <section className="panel export-panel">
            <div className="section-heading">
              <p className="eyebrow">Export</p>
              <h2>Generate files</h2>
              <p className="support-copy">
                The print-ready HTML embeds the logo so it is fully
                self-contained. Open in a browser and print to PDF at 2.8&quot;
                × 1.1&quot; for Moo.
              </p>
            </div>

            {exportError && (
              <div className="export-error" role="alert">
                <p>{exportError}</p>
                <button type="button" onClick={clearError}>Dismiss</button>
              </div>
            )}

            <div className="button-stack">
              <button
                type="button"
                className="primary-button"
                onClick={downloadHtml}
                disabled={isExporting}
              >
                {isExporting ? 'Preparing…' : 'Download print-ready HTML'}
              </button>
              <button
                type="button"
                className="secondary-button"
                onClick={openPrintView}
                disabled={isExporting}
              >
                Open print view
              </button>
              <button
                type="button"
                className="secondary-button"
                onClick={downloadUv}
                disabled={isExporting}
              >
                Download Spot UV mask
              </button>
              <button
                type="button"
                className="secondary-button"
                onClick={openUvView}
                disabled={isExporting}
              >
                Preview Spot UV mask
              </button>
            </div>

            <p className="export-note">
              Spot UV mask: Moo&apos;s UV coating layer. Black areas receive
              gloss UV; white stays matte. UV is applied only to the logo on
              the back of the card — the front is left uncoated.
            </p>
          </section>
        </div>

        <section className="panel preview-panel">
          <div className="section-heading">
            <p className="eyebrow">Live preview</p>
            <h2>Front and back artwork</h2>
            <p className="support-copy">
              The preview uses the exact layout that will ship to Moo. Toggle
              the print guides to see Moo&apos;s 3 mm bleed and safety zones.
            </p>
          </div>

          <div className="preview-toggles">
            <label className="guide-toggle">
              <input
                type="checkbox"
                checked={showGuides}
                onChange={(event) => setShowGuides(event.target.checked)}
              />
              Show bleed &amp; safety guides
            </label>

            <label className="guide-toggle">
              <input
                type="checkbox"
                checked={showUvPreview}
                onChange={(event) => setShowUvPreview(event.target.checked)}
              />
              Preview spot UV on logo
            </label>
          </div>

          {showGuides && (
            <div className="guide-legend">
              <span className="guide-legend-item guide-legend-bleed">
                <span className="guide-legend-swatch" />
                Bleed (3 mm outside trim)
              </span>
              <span className="guide-legend-item guide-legend-safety">
                <span className="guide-legend-swatch" />
                Safety (3 mm inside trim)
              </span>
            </div>
          )}

          {showUvPreview && (
            <p className="preview-note">
              Simulating glossy UV coating on the hex logo. The rest of the
              card stays matte. This is preview-only — actual gloss depends on
              Moo&apos;s coating run.
            </p>
          )}

          <div className="preview-stack">
            <CardPreview
              card={card}
              side="front"
              showGuides={showGuides}
              showUv={showUvPreview}
            />
            <CardPreview
              card={card}
              side="back"
              contactSize="10.5px"
              showGuides={showGuides}
              showUv={showUvPreview}
            />
          </div>
        </section>
      </section>
    </main>
  )
}

export default HomePage
