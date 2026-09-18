import { Link, useLocation, useParams } from 'react-router-dom'

export default function Confirmation() {
  const { bookingId } = useParams()
  const location = useLocation()
  const { result, event } = location.state ?? {}

  if (!result) {
    // Direkter Aufruf der URL ohne State (z.B. Reload) — Backend könnte hier
    // stattdessen GET /api/bookings/{id} zum Nachladen anbieten.
    return (
      <div className="status-banner error">
        Keine Buchungsdaten gefunden. Bitte den Buchungsvorgang erneut starten.
      </div>
    )
  }

  const failed = result.status !== 'CONFIRMED'

  return (
    <div className="panel">
      {failed ? (
        <>
          <h2>Zahlung fehlgeschlagen</h2>
          <p style={{ color: 'var(--ink-muted)', margin: '12px 0 20px' }}>
            Die Reservierung für Buchung {bookingId} konnte nicht abgeschlossen werden.
          </p>
        </>
      ) : (
        <>
          <p style={{ color: 'var(--ink-muted)' }}>Ticket bestätigt für {event?.title}</p>
          <div className="confirmation-code">{result.ticketCode}</div>
          <p style={{ color: 'var(--ink-muted)' }}>Eine Bestätigung wurde an deine E-Mail gesendet.</p>
        </>
      )}
      <Link to="/" className="btn-secondary" style={{ display: 'inline-block', marginTop: 20, textDecoration: 'none' }}>
        Zurück zur Übersicht
      </Link>
    </div>
  )
}
