# Event-Ticketing Frontend (React + Vite)

## Setup

```bash
npm install
npm run dev
```

Läuft auf `http://localhost:5173`. Der Vite-Dev-Server proxyt `/api/*` standardmäßig nach `http://localhost:8080` (`vite.config.js`) — passe das an dein API-Gateway an, oder setze `VITE_API_BASE_URL` in einer `.env`-Datei.

## Erwarteter Backend-Vertrag

Das Frontend erwartet folgende Endpunkte über das API-Gateway:

### `GET /api/events`
```json
[
  {
    "id": "evt_1",
    "title": "Jazz Night im Bahnhof",
    "venue": "Bahnhof Langendreer",
    "city": "Bochum",
    "date": "2026-11-14T19:00:00Z",
    "priceFrom": 18.00,
    "availableSeats": 42
  }
]
```

### `GET /api/events/{eventId}`
Wie oben, zusätzlich:
```json
{
  "description": "...",
  "categories": [
    { "id": "cat_std", "name": "Standard", "price": 18.00, "availableSeats": 30 },
    { "id": "cat_vip", "name": "VIP", "price": 45.00, "availableSeats": 12 }
  ]
}
```

### `POST /api/bookings`
Request:
```json
{
  "eventId": "evt_1",
  "categoryId": "cat_std",
  "quantity": 2,
  "customerName": "Max Muster",
  "customerEmail": "max@example.com"
}
```
Response — reserviert Plätze zeitlich befristet (z.B. 10 Min. Lock im Booking-Service):
```json
{
  "bookingId": "bkg_9f2",
  "status": "RESERVED",
  "reservedUntil": "2026-09-17T20:15:00Z"
}
```

### `POST /api/bookings/{bookingId}/payment`
Request:
```json
{ "paymentMethod": "MOCK_CARD" }
```
Response bei Erfolg:
```json
{ "status": "CONFIRMED", "ticketCode": "STUB-4X7K-2Q" }
```
Response bei Fehlschlag (z.B. Reservierung abgelaufen):
```json
{ "status": "FAILED" }
```
→ hier greift bei dir im Backend das Saga-Pattern: schlägt die Zahlung fehl, muss der Booking-Service die reservierten Plätze wieder freigeben (kompensierende Transaktion).

## Struktur

```
src/
  api/client.js       # fetch-Wrapper, ein Ort für alle Backend-Calls
  components/          # wiederverwendbare UI-Teile (TicketCard)
  pages/                # EventList, EventDetail (Buchung + Mock-Payment), Confirmation
```
