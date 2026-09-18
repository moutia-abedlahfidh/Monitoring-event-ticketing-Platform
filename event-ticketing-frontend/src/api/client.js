// Erwartete Backend-Endpunkte (über API-Gateway, z.B. Spring Cloud Gateway auf :8080)
// GET  /api/events                 -> EventSummary[]
// GET  /api/events/{eventId}       -> EventDetail (inkl. Ticket-Kategorien)
// POST /api/bookings               -> Booking anlegen, reserviert Plätze zeitlich befristet
// POST /api/bookings/{id}/payment  -> Mock-Zahlung abschließen, gibt Ticket-Code zurück
//
// Passe BASE_URL an dein Gateway an, falls du nicht über den Vite-Proxy läufst.
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!res.ok) {
    let message = `Fehler ${res.status}`
    try {
      const body = await res.json()
      message = body.message ?? message
    } catch {
      // kein JSON-Body, Standardmeldung behalten
    }
    throw new Error(message)
  }

  if (res.status === 204) return null
  return res.json()
}

export const api = {
  listEvents: () => request('/events'),
  getEvent: (eventId) => request(`/events/${eventId}`),
  createBooking: (payload) =>
    request('/bookings', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  payBooking: (bookingId, payload) =>
    request(`/bookings/${bookingId}/payment`, {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
}
