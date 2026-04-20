# 6Phene Business Card Generator

React + Vite app for generating print-ready **Moo Mini** business cards (2.8" x 1.1") for 6Phene Inc.

## Features

- Live preview of front and back card artwork
- Real-time form editing with auto-formatted email
- Print bleed and safety guide overlays
- Spot UV mask generation for logo coating
- One-click HTML export with embedded assets
- Print-to-PDF workflow for Moo upload

## Tech Stack

- **React 19** with Vite 8
- Pure CSS styling (no UI framework)
- SVG backgrounds with hex pattern and vignette
- Canvas-based UV mask rendering at 4x resolution

## Getting Started

```bash
npm install
npm run dev
```

## Export Workflow

1. Fill in card details in the form
2. Click **Download print-ready HTML** or **Open print view**
3. Print to PDF at 2.8" x 1.1" in a Chromium browser
4. Upload to Moo as custom artwork

## Project Structure

```
src/
  components/        # UI components
    backgrounds/     # SVG background renderers
    cards/           # Card face components
  data/              # Default card data
  hooks/             # Custom React hooks
  pages/             # Page-level components
  styles/            # Global CSS
  templates/         # Print/export HTML generators
  utils/             # Email, file export helpers
```

## Links

- [Notion Project Board](https://www.notion.so/)
- [Live Site](https://kissmeh02.github.io/business-card-generator/)

## License

Private - 6Phene Inc.
