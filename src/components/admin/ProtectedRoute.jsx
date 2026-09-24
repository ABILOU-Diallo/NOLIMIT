import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { Loader } from '../ui/Loader'

export function ProtectedRoute({ adminOnly = false }) {
  const { isAdmin, ready } = useAuth()

  if (!ready) {
    return <Loader label="Vérification de l'accès..." />
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/connexion" replace />
  }

  return <Outlet />
}
