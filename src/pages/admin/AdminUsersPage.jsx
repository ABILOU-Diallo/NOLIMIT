import { useEffect, useMemo, useState } from 'react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Loader } from '../../components/ui/Loader'
import { useAuth } from '../../hooks/useAuth'
import { deleteUser, getUsers, ROLE_LABELS, updateUserProfile, updateUserRole, updateUserStatus } from '../../services/authService'

const ROLE_BADGE_COLORS = {
  owner: { bg: '#fff7ed', color: '#9a3412', border: '#ffedd5' },
  super_admin: { bg: '#f5f3ff', color: '#5b21b6', border: '#ddd6fe' },
  admin: { bg: '#eff6ff', color: '#1e40af', border: '#dbeafe' },
  student: { bg: '#f0fdf4', color: '#166534', border: '#dcfce7' },
  visitor: { bg: '#f8fafc', color: '#475569', border: '#f1f5f9' },
}

function RoleBadge({ role }) {
  const c = ROLE_BADGE_COLORS[role] ?? ROLE_BADGE_COLORS.visitor
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '0.25rem 0.75rem',
      borderRadius: '999px',
      fontSize: '0.75rem',
      fontWeight: 600,
      background: c.bg,
      color: c.color,
      border: `1px solid ${c.border}`,
      gap: '0.35rem'
    }}>
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: c.color }}></span>
      {ROLE_LABELS[role] ?? role}
    </span>
  )
}

export function AdminUsersPage() {
  const { role: currentUserRole, isOwner, isSuperAdmin } = useAuth()
  const [users, setUsers] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  async function loadUsers() {
    try {
      setLoading(true)
      const data = await getUsers({ hideOwner: !isOwner })
      setUsers(data)
      setError('')
    } catch (err) {
      setError('Impossible de charger les utilisateurs.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadUsers() }, [isOwner])

  const filtered = useMemo(
    () => users.filter((u) => {
      const haystack = `${u.full_name ?? ''} ${u.email ?? ''}`.toLowerCase()
      return haystack.includes(query.trim().toLowerCase())
    }),
    [query, users],
  )

  function feedback(msg, isError = false) {
    if (isError) { setError(msg); setSuccess('') }
    else { setSuccess(msg); setError('') }
    setTimeout(() => { setError(''); setSuccess('') }, 3000)
  }

  const handleRole = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole)
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u))
      feedback('Rôle mis à jour.')
    } catch (err) {
      feedback('Erreur lors du changement de rôle.', true)
    }
  }

  const handleStatus = async (userId, isActive) => {
    try {
      await updateUserStatus(userId, isActive)
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, is_active: isActive } : u))
      feedback(isActive ? 'Compte activé.' : 'Compte suspendu.')
    } catch (err) {
      feedback('Erreur de statut.', true)
    }
  }

  const handleDelete = async (user) => {
    if (!window.confirm(`Supprimer définitivement le compte de ${user.email} ?`)) return
    try {
      await deleteUser(user.id)
      setUsers(prev => prev.filter(u => u.id !== user.id))
      feedback('Utilisateur supprimé.')
    } catch (err) {
      feedback('Suppression impossible.', true)
    }
  }

  const canManage = (target) => {
    if (target.role === 'owner') return false
    if (target.role === 'super_admin') return isOwner
    return isSuperAdmin || isOwner
  }

  if (loading) return <Loader label="Accès aux comptes..." />

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Comptes Utilisateurs</h2>
        <p style={{ color: '#64748b', marginTop: '0.25rem' }}>Gérez les accès et les permissions de la plateforme.</p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
        <div style={{ flex: '1', minWidth: '300px' }}>
          <Input
            placeholder="Rechercher par nom ou email..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{ marginBottom: 0 }}
          />
        </div>
        <Button variant="outline" onClick={loadUsers}><i className="bx bx-refresh" /> Actualiser</Button>
      </div>

      {error && <div style={{ background: '#fef2f2', color: '#dc2626', padding: '1rem', borderRadius: '12px', marginBottom: '1rem', border: '1px solid #fee2e2' }}>{error}</div>}
      {success && <div style={{ background: '#f0fdf4', color: '#166534', padding: '1rem', borderRadius: '12px', marginBottom: '1rem', border: '1px solid #dcfce7' }}>{success}</div>}

      <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden', border: '1px solid #f1f5f9' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ padding: '1.25rem', textAlign: 'left', color: '#64748b', fontSize: '0.85rem', fontWeight: 600 }}>IDENTITÉ</th>
              <th style={{ padding: '1.25rem', textAlign: 'left', color: '#64748b', fontSize: '0.85rem', fontWeight: 600 }}>RÔLE</th>
              <th style={{ padding: '1.25rem', textAlign: 'left', color: '#64748b', fontSize: '0.85rem', fontWeight: 600 }}>STATUT</th>
              <th style={{ padding: '1.25rem', textAlign: 'right', color: '#64748b', fontSize: '0.85rem', fontWeight: 600 }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '1.25rem' }}>
                  <div style={{ fontWeight: 700, color: '#1e293b' }}>{u.full_name || 'Utilisateur sans nom'}</div>
                  <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{u.email}</div>
                </td>
                <td style={{ padding: '1.25rem' }}>
                  {canManage(u) ? (
                    <select
                      value={u.role}
                      onChange={e => handleRole(u.id, e.target.value)}
                      style={{ padding: '0.35rem 0.5rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem', cursor: 'pointer' }}
                    >
                      <option value="student">Étudiant</option>
                      <option value="admin">Administrateur</option>
                      {isOwner && <option value="super_admin">Super Admin</option>}
                    </select>
                  ) : (
                    <RoleBadge role={u.role} />
                  )}
                </td>
                <td style={{ padding: '1.25rem' }}>
                  <button
                    onClick={() => canManage(u) && handleStatus(u.id, !u.is_active)}
                    disabled={!canManage(u)}
                    style={{
                      background: u.is_active !== false ? '#dcfce7' : '#fee2e2',
                      color: u.is_active !== false ? '#166534' : '#991b1b',
                      border: 'none',
                      padding: '0.4rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: canManage(u) ? 'pointer' : 'default',
                      opacity: canManage(u) ? 1 : 0.7
                    }}
                  >
                    {u.is_active !== false ? 'ACTIF' : 'SUSPENDU'}
                  </button>
                </td>
                <td style={{ padding: '1.25rem', textAlign: 'right' }}>
                  {canManage(u) ? (
                    <button
                      onClick={() => handleDelete(u)}
                      style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem' }}
                      title="Supprimer"
                    >
                      <i className="bx bx-trash" />
                    </button>
                  ) : (
                    <i className="bx bx-lock-alt" style={{ color: '#94a3b8' }} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
