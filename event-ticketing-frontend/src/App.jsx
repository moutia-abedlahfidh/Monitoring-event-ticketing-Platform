import { Route, Routes } from 'react-router-dom'
import EventList from './pages/EventList'
import EventDetail from './pages/EventDetail'
import Confirmation from './pages/Confirmation'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'
import Portal from './pages/Portal'

export default function App() {
  return (
    <div className="shell">
      <header className="topbar">
        <span className="mark">
          stub<span>.</span>
        </span>
        <span className="tagline">Tickets für Veranstaltungen in deiner Nähe</span>
      </header>

      <Navbar />

      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/events/:eventId" element={<EventDetail />} />
        <Route path="/confirmation/:bookingId" element={<Confirmation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/portal" element={<ProtectedRoute><Portal /></ProtectedRoute>} />
      </Routes>
    </div>
  )
}