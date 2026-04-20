export const CARD_WIDTH = 538
export const CARD_HEIGHT = 211
export const CARD_PRINT_WIDTH = '2.8in'
export const CARD_PRINT_HEIGHT = '1.1in'

export const cardCss = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --g: 'Montserrat','Gill Sans','Century Gothic',sans-serif;
  --m: 'Space Mono', monospace;
  --s: 'Saira Stencil One', sans-serif;
  --cyan: #00e5ff;
  --white: #eef4f7;
  --silver: #6a8a9a;
}

.card {
  width: ${CARD_WIDTH}px;
  height: ${CARD_HEIGHT}px;
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid rgba(0,229,255,0.06);
  box-shadow: 0 12px 48px rgba(0,0,0,0.85);
  transition: transform .35s cubic-bezier(.22,.8,.22,1), box-shadow .35s;
}
.card:hover {
  transform: translateY(-4px) scale(1.009);
  box-shadow: 0 24px 64px rgba(0,0,0,0.9), 0 0 100px rgba(0,229,255,0.07);
}
.card .bg {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
}

.front { background: #0b1319; }
.front .layout {
  position: absolute; inset: 0;
  display: flex;
  align-items: center;
}

.logo-col {
  width: 150px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.logo-col img {
  width: 142px;
  height: 142px;
  object-fit: contain;
  transition: filter 0.4s ease, transform 0.4s ease;
}
.logo-col.uv-on img {
  filter:
    drop-shadow(0 0 28px rgba(0,229,255,0.78))
    drop-shadow(0 0 10px rgba(0,229,255,0.55))
    drop-shadow(0 0 3px rgba(255,255,255,0.55))
    brightness(1.22) contrast(1.08) saturate(1.18);
  transform: scale(1.018);
}

.vr {
  display: none;
}

.text-col {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px 26px 14px 14px;
  min-width: 0;
}

.tagline {
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  font-family: var(--g);
  font-weight: 400;
  font-size: 8.5px;
  letter-spacing: 0.16em;
  color: var(--cyan);
  text-transform: uppercase;
  white-space: nowrap;
  opacity: 0.9;
  text-align: center;
  pointer-events: none;
}

.brand-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.brand {
  font-family: var(--g);
  font-weight: 700;
  font-size: 16.5px;
  letter-spacing: 0.18em;
  color: var(--white);
  text-transform: uppercase;
  line-height: 1;
  text-align: center;
}

.person-block {
  display: flex;
  flex-direction: column;
  gap: 0;
  text-align: right;
}
.rule  { width: 100%; height: 1px; background: linear-gradient(270deg,rgba(0,229,255,.18),transparent 80%); margin-bottom: 10px; }
.rule2 { width: 100%; height: 1px; background: linear-gradient(270deg,rgba(0,229,255,.1),transparent 70%); margin: 9px 0; }
.name {
  font-family: var(--g);
  font-weight: 700;
  font-size: 15px;
  letter-spacing: 0.03em;
  color: var(--white);
  line-height: 1.15;
  text-transform: uppercase;
}
.title {
  font-family: var(--g);
  font-weight: 500;
  font-size: 13.5px;
  letter-spacing: 0.04em;
  color: var(--cyan);
  margin-top: 4px;
  opacity: 0.9;
}
.contact {
  font-family: var(--m);
  font-size: var(--contact-size, 10.5px);
  color: #c9dbe4;
  letter-spacing: 0.04em;
  line-height: 1.7;
}
.contact .contact-line {
  display: block;
}
.contact .contact-phone {
  font-family: var(--s);
  font-weight: 700;
  letter-spacing: -0.04em;
  font-variant-numeric: tabular-nums;
}
.contact .contact-email {
  font-family: var(--s);
}
.contact .at-sign {
  font-family: var(--s);
  font-size: 1.1em;
}
.website {
  font-family: var(--m);
  font-size: 10px;
  color: #b6d4e0;
  letter-spacing: 0.12em;
  display: block;
  text-align: right;
  margin-top: 3px;
}

.back { background: #0a1117; }
.back .layout {
  position: absolute; inset: 0;
  display: flex;
  align-items: center;
  padding: 0 28px 0 24px;
}
.back-logo-col {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 162px;
}
.back-logo-col img {
  width: 155px;
  height: 155px;
  object-fit: contain;
  transition: filter 0.4s ease, transform 0.4s ease;
}
.back-logo-col.uv-on img {
  filter:
    drop-shadow(0 0 32px rgba(0,229,255,0.82))
    drop-shadow(0 0 12px rgba(0,229,255,0.6))
    drop-shadow(0 0 4px rgba(255,255,255,0.55))
    brightness(1.22) contrast(1.08) saturate(1.18);
  transform: scale(1.018);
}
.back-vr {
  width: 1px;
  height: 130px;
  flex-shrink: 0;
  background: linear-gradient(180deg, transparent, rgba(0,229,255,0.14) 25%, rgba(0,229,255,0.14) 75%, transparent);
  margin: 0 20px;
}
.back-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  text-align: right;
}
.back-brand {
  font-family: var(--g);
  font-weight: 700;
  font-size: 22px;
  letter-spacing: 0.14em;
  color: var(--white);
  line-height: 1;
}
.back-sub {
  font-family: var(--g);
  font-weight: 300;
  font-size: 6.3px;
  letter-spacing: 0.2em;
  color: var(--cyan);
  text-transform: uppercase;
  margin-top: 5px;
  opacity: 0.7;
  white-space: nowrap;
}
.back-rule {
  width: 100%;
  height: 1px;
  background: linear-gradient(270deg,rgba(0,229,255,.18),transparent 80%);
  margin: 9px 0;
}
.back-url {
  font-family: var(--m);
  font-size: 7.5px;
  letter-spacing: 0.1em;
  color: #3e5a6a;
}

.card-stage {
  position: relative;
  display: block;
  width: ${CARD_WIDTH}px;
  height: ${CARD_HEIGHT}px;
}
.print-guide {
  position: absolute;
  pointer-events: none;
  z-index: 10;
  border-style: dashed;
  border-width: 1px;
}
.print-guide-bleed {
  border-color: rgba(244, 63, 94, 0.85);
  inset: -23px;
}
.print-guide-safety {
  border-color: rgba(34, 211, 238, 0.85);
  inset: 23px;
}
.print-guide-label {
  position: absolute;
  pointer-events: none;
  z-index: 11;
  font-family: var(--m);
  font-size: 8px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  background: rgba(7, 13, 18, 0.9);
  padding: 2px 6px;
  border-radius: 3px;
  white-space: nowrap;
}
.print-guide-label-bleed {
  color: rgba(244, 63, 94, 0.95);
  top: -34px;
  left: -23px;
}
.print-guide-label-safety {
  color: rgba(34, 211, 238, 0.95);
  bottom: -22px;
  right: 24px;
}
`
