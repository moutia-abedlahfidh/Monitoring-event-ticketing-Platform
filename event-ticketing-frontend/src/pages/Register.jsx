import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { api } from '../api/client'

export default function Register() {
  const navigate = useNavigate()
  const [vorname, setVorname] = useState('')
  const [nachname, setNachname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await api.register({ vorname, nachname, email, password })
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="panel">
      <h2 style={{ marginBottom: 20 }}>Registrieren</h2>

      {error && <div className="status-banner error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="vorname">Vorname</label>
          <input id="vorname" type="text" value={vorname} onChange={(e) => setVorname(e.target.value)} required />
        </div>

        <div className="field">
          <label htmlFor="nachname">Nachname</label>
          <input id="nachname" type="text" value={nachname} onChange={(e) => setNachname(e.target.value)} required />
        </div>

        <div className="field">
          <label htmlFor="email">E-Mail</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="field">
          <label htmlFor="password">Passwort</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Registriere …' : 'Registrieren'}
        </button>
      </form>

      <p style={{ marginTop: 16 }}>
        Schon registriert? <Link to="/login">Einloggen</Link>
      </p>
    </div>
  )
}