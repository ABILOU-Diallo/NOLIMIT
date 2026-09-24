import { useAuth } from '../hooks/useAuth'
import { Navigate, Link } from 'react-router-dom'

export function AccountPage() {
  const { session, profile, isAdmin, signOut } = useAuth()

  if (!session) return <Navigate to="/connexion" replace />

  return (
    <div style={{ maxWidth: 900, margin: '3rem auto', padding: '2rem', background: '#fff', borderRadius: '18px', boxShadow: '0 12px 28px rgba(15, 23, 42, 0.08)' }}>
      <h1>Mon compte</h1>
      <p>Bienvenue, {profile?.full_name || session.user?.email}.</p>

      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', marginTop: '1.5rem' }}>
        <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem' }}>
          <strong>E-mail</strong>
          <p>{session.user?.email}</p>
        </div>
        <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem' }}>
          <strong>Rôle</strong>
          <p>{profile?.role || 'student'}</p>
        </div>
      </div>

      <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        {isAdmin ? (
          <Link to="/admin">Accéder à l’espace d’administration</Link>
        ) : null}
        <button type="button" onClick={signOut} style={{ background: 'transparent', border: '1px solid #cbd5e1', borderRadius: '999px', padding: '0.7rem 1rem', cursor: 'pointer' }}>
          Se déconnecter
        </button>
      </div>
    </div>
  )
}
