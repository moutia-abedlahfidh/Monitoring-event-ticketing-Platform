// Erwartete Backend-Endpunkte (über API-Gateway, z.B. Spring Cloud Gateway auf :8080)
// GET  /api/events                 -> EventSummary[]
// GET  /api/events/{eventId}       -> EventDetail (inkl. Ticket-Kategorien)
// POST /api/bookings               -> Booking anlegen, reserviert Plätze zeitlich befristet
// POST /api/bookings/{id}/payment  -> Mock-Zahlung abschließen, gibt Ticket-Code zurück
// POST /api/users/login            -> Login, gibt { token } zurück
//
// Passe BASE_URL an dein Gateway an, falls du nicht über den Vite-Proxy läufst.
const BASE_URL = 'http://localhost:8080/api'

function getToken() {
  return localStorage.getItem('token')
}

function setToken(token) {
  localStorage.setItem('token', token)
}

function clearToken() {
  localStorage.removeItem('token')
}

function isLoggedIn() {
  return !!getToken()
}

async function request(path, options = {}) {
  const token = getToken()
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  })

  if (!res.ok) {
    let message = `Fehler ${res.status}`
    try {
      const body = await res.json()
      message = body.message ?? body.error ?? message
    } catch {
      // kein JSON-Body, Standardmeldung behalten
    }
    throw new Error(message)
  }

  if (res.status === 204) return null
  return res.json()
}

async function login(email, password) {
  const data = await request('/users/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
  setToken(data.token)
  return data
}

function logout() {
  clearToken()
}

async function register({ vorname, nachname, email, password }) {
  const data = await request('/users/create', {
    method: 'POST',
    body: JSON.stringify({
      Vorname: vorname,
      Nachname: nachname,
      email,
      password,
    }),
  })
  setToken(data.token)   
  return data
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
  login,
  logout,
  register,
  getToken,
  isLoggedIn,
}