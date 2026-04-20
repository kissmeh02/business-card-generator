export const EMAIL_DOMAIN = '6Phene.com'

/** Fullwidth ＠ (U+FF20) for UI only — stored emails still use ASCII @ */
export const EMAIL_AT_DISPLAY = '\uFF20'

export function toPascalEmailLocal(input) {
  if (!input) return ''

  let str = String(input).trim()

  const atIdx = str.indexOf('@')
  if (atIdx >= 0) str = str.slice(0, atIdx)

  str = str.replace(/([a-z0-9])([A-Z])/g, '$1 $2')

  return str
    .split(/[\s._\-+]+/)
    .map((word) => word.replace(/[^a-zA-Z0-9]/g, ''))
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')
}

export function buildEmail(localPart) {
  if (!localPart) return ''
  return `${localPart}@${EMAIL_DOMAIN}`
}

export function normalizeEmail(input) {
  return buildEmail(toPascalEmailLocal(input))
}

export function getEmailLocalPart(email) {
  if (!email) return ''
  const at = email.indexOf('@')
  return at >= 0 ? email.slice(0, at) : email
}

export function deriveEmail(name) {
  return normalizeEmail(name)
}
