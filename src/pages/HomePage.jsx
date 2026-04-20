import { useState, useEffect, useCallback } from 'react'
import CardForm from '../components/CardForm.jsx'
import CardPreview from '../components/CardPreview.jsx'
import { defaultCard } from '../data/defaultCard.js'
import { useCardExport } from '../hooks/useCardExport.js'
import { BRAND } from '../config/constants.js'

const STORAGE_KEY = 'bcg-card-data'

function loadSavedCard() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch {
    // ignore corrupt data
  }
  return defaultCard
}

function HomePage() {
  const [card, setCard] = useState(loadSavedCard)
  const [showGuides, setShowGuides] = useState(false)
  const [showUvPreview, setShowUvPreview] = useState(false)
  const [exportSuccess, setExportSuccess] = useState(null)

  // Undo/redo history stored as state so render can read it
  const [history, setHistory] = useState(() => [loadSavedCard()])
  const [historyIndex, setHistoryIndex] = useState(0)

  // Persist to localStorage on change
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(card)) } catch { /* noop */ }
  }, [card])

  // Clear success toast after 3s
  useEffect(() => {
    if (!exportSuccess) return
    const timer = setTimeout(() => setExportSuccess(null), 3000)
    return () => clearTimeout(timer)
  }, [exportSuccess])

  const {
    isExporting,
    exportError,
    clearError,
    downloadHtml: rawDownloadHtml,
    openPrintView: rawOpenPrintView,
    downloadUv: rawDownloadUv,
    openUvView: rawOpenUvView,
  } = useCardExport(card)

  const withSuccess = useCallback((fn, message) => {
    return async () => {
      await fn()
      setExportSuccess(message)
    }
  }, [])

  const downloadHtml = useCallback(() => withSuccess(rawDownloadHtml, 'Downloaded print-ready HTML')(), [withSuccess, rawDownloadHtml])
  const openPrintView = useCallback(() => withSuccess(rawOpenPrintView, 'Opened print view')(), [withSuccess, rawOpenPrintView])
  const downloadUv = useCallback(() => withSuccess(rawDownloadUv, 'Downloaded Spot UV mask')(), [withSuccess, rawDownloadUv])
  const openUvView = useCallback(() => withSuccess(rawOpenUvView, 'Opened Spot UV preview')(), [withSuccess, rawOpenUvView])

  const handleFieldChange = (field, value) => {
    const next = { ...card, [field]: value }
    setCard(next)
    setHistory((prev) => {
      const truncated = prev.slice(0, historyIndex + 1)
      truncated.push(next)
      if (truncated.length > 50) truncated.shift()
      return truncated
    })
    setHistoryIndex((prev) => Math.min(prev + 1, 49))
  }

  const handleUndo = useCallback(() => {
    setHistoryIndex((prev) => {
      if (prev <= 0) return prev
      const newIdx = prev - 1
      setCard(history[newIdx])
      return newIdx
    })
  }, [history])

  const handleRedo = useCallback(() => {
    setHistoryIndex((prev) => {
      if (prev >= history.length - 1) return prev
      const newIdx = prev + 1
      setCard(history[newIdx])
      return newIdx
    })
  }, [history])

  const handleReset = () => {
    setCard(defaultCard)
    setHistory((prev) => {
      const truncated = prev.slice(0, historyIndex + 1)
      truncated.push(defaultCard)
      return truncated
    })
    setHistoryIndex((prev) => prev + 1)
  }

  const canUndo = historyIndex > 0
  const canRedo = historyIndex < history.length - 1

  return (
    <main className="app-shell">
      <section className="hero-panel panel">
        <p className="eyebrow">{BRAND.name} · Moo Mini Card generator</p>
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
            onUndo={handleUndo}
            onRedo={handleRedo}
            canUndo={canUndo}
            canRedo={canRedo}
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

            {exportSuccess && (
              <div className="export-success" role="status">
                <p>{exportSuccess}</p>
              </div>
            )}

            <div className="button-stack">
              <button
                type="button"
                className="primary-button"
                onClick={downloadHtml}
                disabled={isExporting}
              >
                {isExporting ? 'Preparing\u2026' : 'Download print-ready HTML'}
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
                aria-label="Toggle bleed and safety print guides"
                checked={showGuides}
                onChange={(event) => setShowGuides(event.target.checked)}
              />
              Show bleed &amp; safety guides
            </label>

            <label className="guide-toggle">
              <input
                type="checkbox"
                aria-label="Toggle spot UV coating preview on logo"
                aria-describedby={showUvPreview ? 'uv-preview-desc' : undefined}
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
            <p id="uv-preview-desc" className="preview-note">
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
              contactSize="10px"
              showGuides={showGuides}
            />
          </div>
        </section>
      </section>
    </main>
  )
}

export default HomePage
