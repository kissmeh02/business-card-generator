import FrontBackground from '../backgrounds/FrontBackground.jsx'

const LOGO_SRC = '/images/6phene-logo.png'

function EmailText({ email }) {
  const idx = email.indexOf('@')
  if (idx === -1) return email
  return (
    <>
      {email.slice(0, idx)}
      <span className="at-sign">@</span>
      {email.slice(idx + 1)}
    </>
  )
}

function DetailCard({ card, contactSize }) {
  const style = contactSize ? { '--contact-size': contactSize } : undefined

  return (
    <div className="card front" style={style}>
      <FrontBackground />
      <div className="layout">
        <div className="logo-col">
          <img src={LOGO_SRC} alt="6Phene Inc. logo" />
        </div>
        <div className="vr" />
        <div className="text-col">
          <div className="person-block">
            <div className="rule" />
            <div className="name">{card.name || 'Your Name'}</div>
            <div className="title">{card.position || 'Your Title'}</div>
            <div className="rule2" />
            <div className="contact">
              <span className="contact-line contact-email">
                <EmailText email={card.email || 'you@example.com'} />
              </span>
              <span className="contact-line contact-phone">
                {card.phone || '+1 (000) 000-0000'}
              </span>
            </div>
            <span className="website">6Phene.com</span>
          </div>
        </div>
      </div>
      <div className="tagline">Advanced Graphene Nanotechnology</div>
    </div>
  )
}

export default DetailCard
