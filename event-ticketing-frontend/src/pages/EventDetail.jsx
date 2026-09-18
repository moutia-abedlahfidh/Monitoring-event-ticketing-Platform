import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { api } from '../api/client'

const STEP = { LOADING: 'loading', BOOK: 'book', RESERVING: 'reserving', PAY: 'pay', PAYING: 'paying' }

export default function EventDetail() {
  const { eventId } = useParams()
  const navigate = useNavigate()

  const [event, setEvent] = useState(null)
  const [step, setStep] = useState(STEP.LOADING)
  const [error, setError] = useState(null)

  const [categoryId, setCategoryId] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [booking, setBooking] = useState(null)

  useEffect(() => {
    api
      .getEvent(eventId)
      .then((data) => {
        setEvent(data)
        setCategoryId(data.categories?.[0]?.id ?? '')
        setStep(STEP.BOOK)
      })
      .catch((err) => setError(err.message))
  }, [eventId])

  async function handleReserve(e) {
    e.preventDefault()
    setError(null)
    setStep(STEP.RESERVING)
    try {
      const result = await api.createBooking({
        eventId,
        categoryId,
        quantity: Number(quantity),
        customerName: name,
        customerEmail: email,
      })
      setBooking(result)
      setStep(STEP.PAY)
    } catch (err) {
      setError(err.message)
      setStep(STEP.BOOK)
    }
  }

  async function handlePay() {
    setError(null)
    setStep(STEP.PAYING)
    try {
      const result = await api.payBooking(booking.bookingId, { paymentMethod: 'MOCK_CARD' })
      navigate(`/confirmation/${booking.bookingId}`, { state: { result, event } })
    } catch (err) {
      setError(err.message)
      setStep(STEP.PAY)
    }
  }

  if (error && !event) {
    return <div className="status-banner error">Konnte Event nicht laden: {error}</div>
  }

  if (!event) return <p className="empty-state">Lade …</p>

  const selectedCategory = event.categories?.find((c) => c.id === categoryId)

  return (
    <div>
      <Link to="/" className="back-link">
        ← Alle Veranstaltungen
      </Link>

      <h2 style={{ fontSize: 28, marginBottom: 6 }}>{event.title}</h2>
      <p style={{ color: 'var(--ink-muted)', marginBottom: 24 }}>
        {event.venue}, {event.city} ·{' '}
        {new Date(event.date).toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })}
      </p>

      {error && <div className="status-banner error">{error}</div>}

      <div className="panel">
        {step !== STEP.PAY && step !== STEP.PAYING && (
          <form onSubmit={handleReserve}>
            <div className="field">
              <label htmlFor="category">Ticket-Kategorie</label>
              <select id="category" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
                {event.categories?.map((cat) => (
                  <option key={cat.id} value={cat.id} disabled={cat.availableSeats === 0}>
                    {cat.name} — {cat.price.toFixed(2)} €{' '}
                    {cat.availableSeats === 0 ? '(ausverkauft)' : `(${cat.availableSeats} verfügbar)`}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="quantity">Anzahl Tickets</label>
              <input
                id="quantity"
                type="number"
                min="1"
                max={selectedCategory?.availableSeats ?? 10}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="name">Name</label>
              <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div className="field">
              <label htmlFor="email">E-Mail</label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <button type="submit" className="btn-primary" disabled={step === STEP.RESERVING}>
              {step === STEP.RESERVING ? 'Reserviere …' : 'Plätze reservieren'}
            </button>
          </form>
        )}

        {(step === STEP.PAY || step === STEP.PAYING) && booking && (
          <div>
            <p style={{ color: 'var(--ink-muted)', marginBottom: 4 }}>
              Reserviert bis {new Date(booking.reservedUntil).toLocaleTimeString('de-DE')}
            </p>
            <h3 style={{ marginBottom: 16 }}>
              {quantity} × {selectedCategory?.name} — {(selectedCategory?.price * quantity).toFixed(2)} €
            </h3>
            <button type="button" className="btn-primary" onClick={handlePay} disabled={step === STEP.PAYING}>
              {step === STEP.PAYING ? 'Zahlung wird verarbeitet …' : 'Jetzt bezahlen (Mock)'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
