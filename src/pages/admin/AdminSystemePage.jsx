import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { getUsers } from '../../services/authService'
import { useEffect, useState } from 'react'
import { Loader } from '../../components/ui/Loader'

export function AdminSystemePage() {
  const { isOwner } = useAuth()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isOwner) return
    getUsers({ hideOwner: false })
      .then((data) => setUsers(data.filter((user) => ['owner', 'super_admin'].includes(user.role))))
      .finally(() => setLoading(false))
  }, [isOwner])

  if (!isOwner) {
    return <Navigate to="/admin" replace />
  }

  if (loading) return <Loader label="Chargement du système" />

  return (
    <div>
      <p style={{ color: '#64748b', marginTop: 0 }}>
        Cette page n’est visible que par le compte propriétaire. Les autres administrateurs n’y ont pas accès.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        <section className="admin-panel">
          <h3 style={{ marginTop: 0 }}>Comptes protégés</h3>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {users.map((user) => (
              <div key={user.id} style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', padding: '0.75rem', background: '#f8fafc', borderRadius: '10px' }}>
                <div>
                  <div style={{ fontWeight: 700 }}>{user.full_name || '—'}</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{user.email}</div>
                </div>
                <strong>{user.role === 'owner' ? 'Propriétaire' : 'Super admin'}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="admin-panel">
          <h3 style={{ marginTop: 0 }}>Sécurité</h3>
          <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#334155', lineHeight: 1.7 }}>
            <li>Le propriétaire n’apparaît pas dans la liste utilisateurs des autres admins.</li>
            <li>Un super admin ne peut ni supprimer ni modifier un autre super admin.</li>
            <li>Le rôle propriétaire ne peut pas être attribué depuis l’interface.</li>
            <li>RLS, commentaires et statistiques sont protégés côté base.</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
