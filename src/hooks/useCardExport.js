import { useState, useCallback } from 'react'
import {
  createPrintHtml,
  createUvPrintHtml,
  fetchLogoDataUrl,
} from '../templates/mooMiniCardTemplate.js'
import { downloadTextFile, openPrintWindow } from '../utils/fileExport.js'

const LOGO_URL = '/images/6phene-logo.png'

export function useCardExport(card) {
  const [isExporting, setIsExporting] = useState(false)
  const [exportError, setExportError] = useState(null)

  const runExport = useCallback(async (exportFn) => {
    setIsExporting(true)
    setExportError(null)
    try {
      const logoDataUrl = await fetchLogoDataUrl(LOGO_URL)
      exportFn(logoDataUrl)
    } catch (err) {
      setExportError(err.message || 'Export failed. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }, [])

  const downloadHtml = useCallback(() => {
    return runExport((logo) => {
      downloadTextFile('moo-mini-card-export.html', createPrintHtml(card, logo), 'text/html')
    })
  }, [card, runExport])

  const openPrintView = useCallback(() => {
    return runExport((logo) => {
      openPrintWindow(createPrintHtml(card, logo))
    })
  }, [card, runExport])

  const downloadUv = useCallback(() => {
    return runExport((logo) => {
      downloadTextFile('moo-mini-card-uv-mask.html', createUvPrintHtml(logo), 'text/html')
    })
  }, [runExport])

  const openUvView = useCallback(() => {
    return runExport((logo) => {
      openPrintWindow(createUvPrintHtml(logo))
    })
  }, [runExport])

  const clearError = useCallback(() => setExportError(null), [])

  return {
    isExporting,
    exportError,
    clearError,
    downloadHtml,
    openPrintView,
    downloadUv,
    openUvView,
  }
}
