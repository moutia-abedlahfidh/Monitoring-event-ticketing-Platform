import { Navigate } from 'react-router-dom'
import { api } from '../api/client'

export default function ProtectedRoute({ children }) {
  return api.isLoggedIn() ? children : <Navigate to="/login" replace />
}