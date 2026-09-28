import { Link } from 'react-router-dom'

export default function Portal() {
  return (
    <div className="panel">
      <h2 style={{ marginBottom: 12 }}>Dein Portal</h2>
      <p style={{ color: 'var(--ink-muted)', marginBottom: 20 }}>
        Willkommen! Hier kommen später deine Buchungen und Tickets hin.
      </p>
      <Link to="/" className="btn-secondary" style={{ textDecoration: 'none' }}>
        Zu den Veranstaltungen
      </Link>
    </div>
  )
}