import {
  EMAIL_AT_DISPLAY,
  EMAIL_DOMAIN,
  buildEmail,
  getEmailLocalPart,
  toPascalEmailLocal,
} from '../utils/email.js'

function CardForm({ card, onChange, onReset }) {
  const handleChange = (event) => {
    const { name, value } = event.target
    onChange(name, value)
  }

  const localPart = getEmailLocalPart(card.email)

  const handleEmailChange = (event) => {
    const cleaned = event.target.value.replace(/@.*/g, '')
    onChange('email', buildEmail(cleaned))
  }

  const normalizeEmailLocal = (value) => {
    const normalized = toPascalEmailLocal(value)
    onChange('email', buildEmail(normalized))
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
              autoComplete="off"
              spellCheck={false}
            />
            <span className="email-suffix">
              {EMAIL_AT_DISPLAY}
              {EMAIL_DOMAIN}
            </span>
          </div>
          <p className="field-hint">
            Type just the name part — <strong>firstlast</strong>,{' '}
            <strong>first last</strong>, <strong>first.last</strong>, or{' '}
            <strong>firstLast</strong> all work. Press <code>Enter</code> or
            tab away and we&apos;ll PascalCase it. The{' '}
            <code>
              {EMAIL_AT_DISPLAY}
              {EMAIL_DOMAIN}
            </code>{' '}
            domain is locked.
          </p>
        </label>
      </div>

      <div className="form-actions">
        <button type="button" className="secondary-button" onClick={onReset}>
          Reset sample data
        </button>
      </div>
    </section>
  )
}

export default CardForm
