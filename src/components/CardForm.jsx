import { useState } from 'react'
import {
  EMAIL_AT_DISPLAY,
  EMAIL_DOMAIN,
  buildEmail,
  getEmailLocalPart,
  toPascalEmailLocal,
} from '../utils/email.js'

function CardForm({ card, onChange, onReset, onUndo, onRedo, canUndo, canRedo }) {
  const [emailTouched, setEmailTouched] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    onChange(name, value)
  }

  const localPart = getEmailLocalPart(card.email)
  const previewEmail = emailTouched && localPart
    ? `${toPascalEmailLocal(localPart)}@${EMAIL_DOMAIN}`
    : null

  const handleEmailChange = (event) => {
    const cleaned = event.target.value.replace(/@.*/g, '')
    onChange('email', buildEmail(cleaned))
    setEmailTouched(true)
  }

  const normalizeEmailLocal = (value) => {
    const normalized = toPascalEmailLocal(value)
    onChange('email', buildEmail(normalized))
    setEmailTouched(false)
  }

  const handleEmailBlur = (event) => {
    normalizeEmailLocal(event.target.value)
  }

  const handleEmailKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      normalizeEmailLocal(event.currentTarget.value)
      event.currentTarget.blur()
    }
  }

  return (
    <section className="panel form-panel">
      <div className="section-heading">
        <p className="eyebrow">Card details</p>
        <h2>Fill in the business card</h2>
        <p className="support-copy">
          Update the fields below and the front/back previews will refresh
          instantly.
        </p>
      </div>

      <div className="form-grid">
        <label className="field">
          <span>Name</span>
          <input
            type="text"
            name="name"
            value={card.name}
            onChange={handleChange}
            placeholder="Kavan Kissoon"
            maxLength={30}
            aria-label="Full name as printed on card"
          />
          <p className="field-hint">
            Type as you want it printed on the card (e.g.{' '}
            <strong>Kavan Kissoon</strong>).
          </p>
        </label>

        <label className="field">
          <span>Position</span>
          <input
            type="text"
            name="position"
            value={card.position}
            onChange={handleChange}
            placeholder="CEO"
            maxLength={40}
            aria-label="Job title or position"
          />
        </label>

        <label className="field">
          <span>Phone number</span>
          <input
            type="tel"
            name="phone"
            value={card.phone}
            onChange={handleChange}
            placeholder="(555) 123-4567"
            maxLength={20}
            aria-label="Phone number"
          />
        </label>

        <label className="field email-field">
          <span>Email</span>
          <div className="email-input-wrap">
            <input
              type="text"
              name="email-local"
              value={localPart}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              onKeyDown={handleEmailKeyDown}
              placeholder="FirstLast"
              maxLength={30}
              autoComplete="off"
              spellCheck={false}
              aria-label="Email local part before @ sign"
            />
            <span className="email-suffix">
              {EMAIL_AT_DISPLAY}
              {EMAIL_DOMAIN}
            </span>
          </div>
          {previewEmail && (
            <p className="email-preview" aria-live="polite">
              Will format as: <strong>{previewEmail}</strong>
            </p>
          )}
          <p className="field-hint">
            Type just the name part — <strong>firstlast</strong>,{' '}
            <strong>first last</strong>, <strong>first.last</strong>, or{' '}
            <strong>firstLast</strong> all work. Tab away to auto-format.
            The{' '}
            <code>
              {EMAIL_AT_DISPLAY}
              {EMAIL_DOMAIN}
            </code>{' '}
            domain is locked.
          </p>
        </label>
      </div>

      <div className="form-actions">
        <div className="form-actions-row">
          <button
            type="button"
            className="secondary-button"
            onClick={onUndo}
            disabled={!canUndo}
            aria-label="Undo last change"
          >
            Undo
          </button>
          <button
            type="button"
            className="secondary-button"
            onClick={onRedo}
            disabled={!canRedo}
            aria-label="Redo last undone change"
          >
            Redo
          </button>
        </div>
        <button type="button" className="secondary-button" onClick={onReset}>
          Reset sample data
        </button>
      </div>
    </section>
  )
}

export default CardForm
