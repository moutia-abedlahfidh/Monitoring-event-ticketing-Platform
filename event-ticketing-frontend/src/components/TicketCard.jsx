import { Link } from 'react-router-dom'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export default function TicketCard({ event }) {
  const lowSeats = event.availableSeats > 0 && event.availableSeats <= 10
  const soldOut = event.availableSeats === 0

  return (
    <Link to={`/events/${event.id}`} className="ticket">
      <div className="info">
        <span className="date">
          {formatDate(event.date)} · {event.city}
        </span>
        <h3>{event.title}</h3>
        <span className="meta">{event.venue}</span>
      </div>
      <div className="stub">
        <span className="price">ab {event.priceFrom.toFixed(2)} €</span>
        <span className={`seats ${lowSeats ? 'low' : ''}`}>
          {soldOut ? 'ausverkauft' : `${event.availableSeats} Plätze`}
        </span>
      </div>
    </Link>
  )
}
