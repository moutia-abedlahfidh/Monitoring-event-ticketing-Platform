import { useEffect, useState } from 'react'
import { api } from '../api/client'
import TicketCard from '../components/TicketCard'

export default function EventList() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    api
      .listEvents()
      .then(setEvents)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="empty-state">Lade Veranstaltungen …</p>

  if (error) {
    return <div className="status-banner error">Konnte Events nicht laden: {error}</div>
  }

  if (events.length === 0) {
    return <p className="empty-state">Aktuell sind keine Veranstaltungen geplant.</p>
  }

  return (
    <div>
      {events.map((event) => (
        <TicketCard key={event.id} event={event} />
      ))}
    </div>
  )
}
