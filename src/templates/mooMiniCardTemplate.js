import {
  CARD_WIDTH,
  CARD_HEIGHT,
  CARD_PRINT_WIDTH,
  CARD_PRINT_HEIGHT,
  cardCss,
} from './cardStyles.js'
import { deriveEmail } from '../utils/email.js'
import { BRAND } from '../config/constants.js'

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function frontBgSvg() {
  return `
    <svg class="bg" viewBox="0 0 ${CARD_WIDTH} ${CARD_HEIGHT}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="rg1" cx="16%" cy="50%" r="44%">
          <stop offset="0%" stop-color="#00e5ff" stop-opacity="0.05"/>
          <stop offset="100%" stop-color="#00e5ff" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="vg1" cx="50%" cy="50%" r="95%">
          <stop offset="50%" stop-color="#000000" stop-opacity="0"/>
          <stop offset="72%" stop-color="#000000" stop-opacity="0.2"/>
          <stop offset="88%" stop-color="#000000" stop-opacity="0.5"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0.8"/>
        </radialGradient>
        <pattern id="hx" x="0" y="0" width="20" height="23.1" patternUnits="userSpaceOnUse">
          <polygon points="10,0.7 18.3,5.5 18.3,15.1 10,19.9 1.7,15.1 1.7,5.5"
            fill="none" stroke="#00e5ff" stroke-width="0.28" opacity="0.09"/>
        </pattern>
        <mask id="hxm"><rect width="${CARD_WIDTH}" height="${CARD_HEIGHT}" fill="url(#hxg)"/></mask>
        <linearGradient id="hxg" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="white" stop-opacity="0"/>
          <stop offset="50%" stop-color="white" stop-opacity="0.05"/>
          <stop offset="100%" stop-color="white" stop-opacity="0.42"/>
        </linearGradient>
      </defs>
      <rect width="${CARD_WIDTH}" height="${CARD_HEIGHT}" fill="#0b1319"/>
      <rect width="${CARD_WIDTH}" height="${CARD_HEIGHT}" fill="url(#hx)" mask="url(#hxm)"/>
      <rect width="${CARD_WIDTH}" height="${CARD_HEIGHT}" fill="url(#rg1)"/>
      <rect width="${CARD_WIDTH}" height="${CARD_HEIGHT}" fill="url(#vg1)"/>
    </svg>
  `.trim()
}

function backBgSvg() {
  return `
    <svg class="bg" viewBox="0 0 ${CARD_WIDTH} ${CARD_HEIGHT}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="rg2" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stop-color="#00e5ff" stop-opacity="0.04"/>
          <stop offset="100%" stop-color="#00e5ff" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="vg2" cx="50%" cy="50%" r="95%">
          <stop offset="65%" stop-color="#000000" stop-opacity="0"/>
          <stop offset="82%" stop-color="#000000" stop-opacity="0.06"/>
          <stop offset="93%" stop-color="#000000" stop-opacity="0.18"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0.35"/>
        </radialGradient>
        <pattern id="hxb" x="0" y="0" width="20" height="23.1" patternUnits="userSpaceOnUse">
          <polygon points="10,0.7 18.3,5.5 18.3,15.1 10,19.9 1.7,15.1 1.7,5.5"
            fill="none" stroke="#00e5ff" stroke-width="0.28" opacity="0.07"/>
        </pattern>
      </defs>
      <rect width="${CARD_WIDTH}" height="${CARD_HEIGHT}" fill="#060b10"/>
      <rect width="${CARD_WIDTH}" height="${CARD_HEIGHT}" fill="url(#hxb)"/>
      <rect width="${CARD_WIDTH}" height="${CARD_HEIGHT}" fill="url(#rg2)"/>
      <rect width="${CARD_WIDTH}" height="${CARD_HEIGHT}" fill="url(#vg2)"/>
      <polyline points="0,22 0,0 22,0" fill="none" stroke="#00e5ff" stroke-width="0.9" opacity="0.17"/>
      <polyline points="${CARD_WIDTH},22 ${CARD_WIDTH},0 ${CARD_WIDTH - 22},0" fill="none" stroke="#00e5ff" stroke-width="0.9" opacity="0.17"/>
      <polyline points="0,${CARD_HEIGHT - 22} 0,${CARD_HEIGHT} 22,${CARD_HEIGHT}" fill="none" stroke="#00e5ff" stroke-width="0.9" opacity="0.17"/>
      <polyline points="${CARD_WIDTH},${CARD_HEIGHT - 22} ${CARD_WIDTH},${CARD_HEIGHT} ${CARD_WIDTH - 22},${CARD_HEIGHT}" fill="none" stroke="#00e5ff" stroke-width="0.9" opacity="0.17"/>
    </svg>
  `.trim()
}

export function buildDetailCardHtml(card, logoSrc) {
  const name = escapeHtml(card.name || 'Your Name')
  const position = escapeHtml(card.position || 'Your Title')
  const phone = escapeHtml(card.phone || '+1 (000) 000-0000')
  const emailValue = card.email || deriveEmail(card.name) || 'You@6Phene.com'
  const email = escapeHtml(emailValue).replace('@', '<span class="at-sign">@</span>')

  return `
<div class="card front">
  ${frontBgSvg()}
  <div class="layout">
    <div class="logo-col"><img src="${logoSrc}" alt="${BRAND.name} logo"/></div>
    <div class="vr"></div>
    <div class="text-col">
      <div class="person-block">
        <div class="rule"></div>
        <div class="name">${name}</div>
        <div class="title">${position}</div>
        <div class="rule2"></div>
        <div class="contact">
          <span class="contact-line contact-email">${email}</span>
          <span class="contact-line contact-phone">${phone}</span>
        </div>
        <span class="website">${BRAND.website}</span>
      </div>
    </div>
  </div>
  <div class="tagline">${BRAND.detailTagline}</div>
</div>`.trim()
}

export function buildBrandCardHtml(logoSrc) {
  return `
<div class="card back">
  ${backBgSvg()}
  <div class="layout">
    <div class="back-logo-col"><img src="${logoSrc}" alt="${BRAND.name} logo"/></div>
    <div class="back-vr"></div>
    <div class="back-text">
      <div class="back-brand">${BRAND.name}</div>
      <div class="back-sub">${BRAND.tagline}</div>
      <div class="back-rule"></div>
    </div>
  </div>
</div>`.trim()
}

export function createPrintHtml(card, logoSrc) {
  const front = buildBrandCardHtml(logoSrc)
  const back = buildDetailCardHtml(card, logoSrc)

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(card.name || BRAND.name)} - Moo Mini Card Export</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Rajdhani:wght@500;600;700&family=Space+Mono:wght@400&display=swap" rel="stylesheet" />
  <style>
    ${cardCss}

    body {
      margin: 0;
      background: #0a0e11;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 36px;
      padding: 56px 24px 72px;
      font-family: 'Montserrat', sans-serif;
    }

    .group {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .lbl {
      font-family: 'Space Mono', monospace;
      font-size: 8.5px;
      letter-spacing: 0.3em;
      color: #263340;
      text-transform: uppercase;
      margin-bottom: 12px;
      text-align: center;
    }

    .print-card {
      width: ${CARD_PRINT_WIDTH};
      height: ${CARD_PRINT_HEIGHT};
    }
    .print-card .card {
      width: 100%;
      height: 100%;
      transform-origin: top left;
    }

    @page {
      size: ${CARD_PRINT_WIDTH} ${CARD_PRINT_HEIGHT};
      margin: 0;
    }

    @media print {
      body {
        background: transparent;
        padding: 0;
        gap: 0;
      }
      .lbl { display: none; }
      .group { page-break-after: always; margin: 0; }
      .group:last-child { page-break-after: auto; }
      .print-card { width: ${CARD_PRINT_WIDTH}; height: ${CARD_PRINT_HEIGHT}; }
    }
  </style>
</head>
<body>
  <div class="group">
    <div class="lbl">Front &mdash; shared brand</div>
    <div class="print-card">${front}</div>
  </div>
  <div class="group">
    <div class="lbl">Back &mdash; ${escapeHtml(card.name || '')} &middot; ${escapeHtml(card.position || '')}</div>
    <div class="print-card">${back}</div>
  </div>
</body>
</html>`
}

function buildBackUvHtml(logoSrc) {
  return `
<div class="uv-card uv-back">
  <div class="uv-logo-col uv-back-logo">
    <img src="${logoSrc}" alt="" />
  </div>
</div>`.trim()
}

export function createUvPrintHtml(logoSrc) {
  const backUv = buildBackUvHtml(logoSrc)

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(BRAND.name)} - Moo Mini Card Spot UV Mask</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      margin: 0;
      background: #e5e7eb;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 36px;
      padding: 56px 24px 72px;
      font-family: 'Courier New', monospace;
      color: #475569;
    }

    .uv-doc-intro {
      max-width: 600px;
      background: white;
      padding: 20px 24px;
      border-radius: 8px;
      line-height: 1.55;
      font-size: 13px;
    }
    .uv-doc-intro h1 {
      font-size: 15px;
      color: #0f172a;
      margin-bottom: 8px;
      letter-spacing: 0.04em;
    }

    .uv-group {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .uv-lbl {
      font-size: 10px;
      letter-spacing: 0.3em;
      color: #64748b;
      text-transform: uppercase;
      margin-bottom: 10px;
      text-align: center;
    }

    .uv-print-card {
      width: ${CARD_PRINT_WIDTH};
      height: ${CARD_PRINT_HEIGHT};
      background: white;
    }
    .uv-print-card .uv-card {
      width: 100%;
      height: 100%;
    }

    .uv-card {
      width: ${CARD_WIDTH}px;
      height: ${CARD_HEIGHT}px;
      position: relative;
      background: white;
      overflow: hidden;
    }

    .uv-logo-col {
      position: absolute;
      top: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .uv-back-logo {
      left: 0;
      width: 150px;
    }
    .uv-back-logo img {
      width: 142px;
      height: 142px;
    }

    .uv-card img,
    .uv-card canvas {
      object-fit: contain;
      display: block;
    }

    .uv-filter-svg {
      position: absolute;
      width: 0;
      height: 0;
      overflow: hidden;
      pointer-events: none;
    }

    @page {
      size: ${CARD_PRINT_WIDTH} ${CARD_PRINT_HEIGHT};
      margin: 0;
    }

    @media print {
      body {
        background: transparent;
        padding: 0;
        gap: 0;
      }
      .uv-doc-intro,
      .uv-lbl { display: none; }
      .uv-group { page-break-after: always; margin: 0; }
      .uv-group:last-child { page-break-after: auto; }
      .uv-print-card { width: ${CARD_PRINT_WIDTH}; height: ${CARD_PRINT_HEIGHT}; }
    }
  </style>
</head>
<body>
  <div class="uv-doc-intro">
    <h1>Spot UV mask &mdash; ${escapeHtml(BRAND.name)} Moo Mini (back only)</h1>
    <p>
      <strong>Back of card only.</strong> Black &equals; 100% UV coating,
      White &equals; no coating. The UV mask matches the exact logo shape
      preserving all detail. The front of the card has no UV coating. Upload
      this file to Moo as the spot UV artwork at 2.8&quot; &times; 1.1&quot;.
      Print-to-PDF in any Chromium browser to export a ready-to-upload PDF.
    </p>
  </div>
  <div class="uv-group">
    <div class="uv-lbl">Back UV &mdash; detail side</div>
    <div class="uv-print-card">${backUv}</div>
  </div>
  <script>
    (function () {
      var img = document.querySelector('.uv-back-logo img');
      if (!img) return;
      function convert() {
        var scale = 4;
        var w = img.naturalWidth || img.width;
        var h = img.naturalHeight || img.height;
        var cw = w * scale;
        var ch = h * scale;
        var canvas = document.createElement('canvas');
        canvas.width = cw;
        canvas.height = ch;
        canvas.style.width = (parseInt(getComputedStyle(img).width) || 142) + 'px';
        canvas.style.height = (parseInt(getComputedStyle(img).height) || 142) + 'px';
        var ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, cw, ch);
        var data = ctx.getImageData(0, 0, cw, ch);
        var px = data.data;
        for (var i = 0; i < px.length; i += 4) {
          var a = px[i + 3];
          if (a > 0) {
            px[i] = 0;
            px[i + 1] = 0;
            px[i + 2] = 0;
            px[i + 3] = a;
          }
        }
        ctx.putImageData(data, 0, 0);
        img.replaceWith(canvas);
      }
      if (img.complete && img.naturalWidth) convert();
      else img.addEventListener('load', convert);
    })();
  </script>
</body>
</html>`
}

const logoCache = new Map()

export async function fetchLogoDataUrl(logoUrl) {
  if (logoCache.has(logoUrl)) return logoCache.get(logoUrl)

  const response = await fetch(logoUrl)
  if (!response.ok) throw new Error(`Failed to load logo (${response.status})`)
  const blob = await response.blob()

  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })

  logoCache.set(logoUrl, dataUrl)
  return dataUrl
}
