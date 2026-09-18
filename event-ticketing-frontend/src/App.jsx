import { Route, Routes } from 'react-router-dom'
import EventList from './pages/EventList'
import EventDetail from './pages/EventDetail'
import Confirmation from './pages/Confirmation'

export default function App() {
  return (
    <div className="shell">
      <header className="topbar">
        <span className="mark">
          stub<span>.</span>
        </span>
        <span className="tagline">Tickets für Veranstaltungen in deiner Nähe</span>
      </header>

      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/events/:eventId" element={<EventDetail />} />
        <Route path="/confirmation/:bookingId" element={<Confirmation />} />
      </Routes>
    </div>
  )
}
