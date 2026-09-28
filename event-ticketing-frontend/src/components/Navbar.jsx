import { useNavigate } from 'react-router-dom'
import { api } from '../api/client'

export default function Navbar() {
  const navigate = useNavigate()

  return (
    <nav>
      {api.isLoggedIn() && (
        <button
          className="btn-secondary"
          onClick={() => {
            api.logout()
            navigate('/login')
          }}
        >
          Ausloggen
        </button>
      )}
    </nav>
  )
}