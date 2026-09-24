import { useEffect, useMemo, useState } from 'react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Loader } from '../../components/ui/Loader'
import { useAuth } from '../../hooks/useAuth'
import { deleteUser, getUsers, ROLE_LABELS, updateUserProfile, updateUserRole, updateUserStatus } from '../../services/authService'

const ROLE_BADGE_COLORS = {
  owner: { bg: '#fef3c7', color: '#92400e', border: '#f59e0b' },
  super_admin: { bg: '#ede9fe', color: '#5b21b6', border: '#7c3aed' },
  admin: { bg: '#dbeafe', color: '#1e40af', border: '#3b82f6' },
  student: { bg: '#dcfce7', color: '#166534', border: '#22c55e' },
  visitor: { bg: '#f1f5f9', color: '#475569', border: '#94a3b8' },
}

function RoleBadge({ role }) {
  const c = ROLE_BADGE_COLORS[role] ?? ROLE_BADGE_COLORS.visitor
  return (
    <span style={{
      display: 'inline-block',
      padding: '0.2rem 0.65rem',
      borderRadius: '999px',
      fontSize: '0.75rem',
      fontWeight: 700,
      background: c.bg,
      color: c.color,
      border: `1px solid ${c.border}`,
    }}>
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
      setError(err.message || 'Impossible de charger les utilisateurs.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadUsers() }, [isOwner])

  const filtered = useMemo(
    () => users.filter((user) => {
      const haystack = `${user.full_name ?? ''} ${user.email ?? ''}`.toLowerCase()
      return haystack.includes(query.trim().toLowerCase())
    }),
    [query, users],
  )

  function feedback(msg, isError = false) {
    if (isError) { setError(msg); setSuccess('') }
    else { setSuccess(msg); setError('') }
    setTimeout(() => { setError(''); setSuccess('') }, 3500)
  }

  const handleRole = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole, currentUserRole)
      setUsers((current) => current.map((user) => (user.id === userId ? { ...user, role: newRole } : user)))
      feedback('Rôle mis à jour avec succès.')
    } catch (err) {
      feedback(err.message || 'La mise à jour du rôle a échoué.', true)
    }
  }

  const handleStatus = async (userId, isActive) => {
    try {
      await updateUserStatus(userId, isActive, currentUserRole)
      setUsers((current) => current.map((user) => (user.id === userId ? { ...user, is_active: isActive } : user)))
      feedback(isActive ? 'Compte réactivé.' : 'Compte désactivé.')
    } catch (err) {
      feedback(err.message || 'La mise à jour du statut a échoué.', true)
    }
  }

  const handleDelete = async (userId, userEmail) => {
    if (!window.confirm(`Supprimer définitivement le compte de ${userEmail} ?`)) return
    try {
      await deleteUser(userId, currentUserRole)
      setUsers((current) => current.filter((u) => u.id !== userId))
      feedback('Utilisateur supprimé.')
    } catch (err) {
      feedback(err.message || 'La suppression a échoué.', true)
    }
  }

  const handleProfile = async (user, field, value) => {
    try {
      const payload = { full_name: user.full_name, phone: user.phone, [field]: value }
      await updateUserProfile(user.id, payload, currentUserRole)
      setUsers((current) => current.map((item) => (item.id === user.id ? { ...item, [field]: value } : item)))
      feedback('Fiche mise à jour.')
    } catch (err) {
      feedback(err.message || 'La mise à jour a échoué.', true)
    }
  }

  // Rôles disponibles selon le rang du connecté
  function getAvailableRoles() {
    if (isOwner) {
      // Owner voit tous les rôles sauf owner (ne peut pas créer un autre owner)
      return ['student', 'admin', 'super_admin']
    }
    if (isSuperAdmin) {
      // Super admin ne peut pas attribuer super_admin ou owner
      return ['student', 'admin']
    }
    // Admin simple : student / admin seulement
    return ['student', 'admin']
  }

  // Peut-on modifier cet utilisateur ?
  function canEdit(targetUser) {
    if (targetUser.role === 'owner') return false // Personne ne modifie l'owner
    if (targetUser.role === 'super_admin') return isOwner // Seul l'owner peut modifier un super_admin
    if (targetUser.role === 'admin') return isSuperAdmin // Super admin peut modifier un admin
    return true // Tous les admins peuvent gérer les students
  }

  // Peut-on supprimer cet utilisateur ?
  function canDelete(targetUser) {
    if (['super_admin', 'owner'].includes(targetUser.role)) return false
    if (targetUser.role === 'admin') return isSuperAdmin
    return true
  }

  if (loading) return <Loader label="Chargement des utilisateurs" />

  return (
    <div>
      {/* En-tête */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>Gestion des utilisateurs</h2>
          <p style={{ margin: '0.25rem 0 0', color: '#64748b', fontSize: '0.875rem' }}>
            {users.length} compte{users.length > 1 ? 's' : ''} enregistré{users.length > 1 ? 's' : ''}
          </p>
        </div>
        <Button type="button" variant="outline" onClick={loadUsers}>↺ Actualiser</Button>
      </div>

      {/* Légende des rôles */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
        {Object.entries(ROLE_LABELS)
          .filter(([key]) => isOwner || key !== 'owner')
          .filter(([key]) => key !== 'visitor')
          .map(([key]) => (
          <RoleBadge key={key} role={key} />
        ))}
      </div>

      <div style={{ marginBottom: '1rem', maxWidth: 360 }}>
        <Input id="user-search" label="Recherche" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Nom ou e-mail" />
      </div>

      {error ? (
        <div role="alert" style={{ padding: '0.75rem 1rem', background: '#fef2f2', color: '#b91c1c', borderRadius: '10px', marginBottom: '1rem', border: '1px solid #fecaca' }}>
          ⚠ {error}
        </div>
      ) : null}
      {success ? (
        <div role="status" style={{ padding: '0.75rem 1rem', background: '#f0fdf4', color: '#166534', borderRadius: '10px', marginBottom: '1rem', border: '1px solid #bbf7d0' }}>
          ✓ {success}
        </div>
      ) : null}

      <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 10px 18px rgba(15, 23, 42, 0.05)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ padding: '0.9rem 1rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b' }}>Utilisateur</th>
                <th style={{ padding: '0.9rem 1rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b' }}>Rôle</th>
                <th style={{ padding: '0.9rem 1rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b' }}>Statut</th>
                <th style={{ padding: '0.9rem 1rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>Aucun utilisateur trouvé.</td>
                </tr>
              ) : filtered.map((user) => {
                const editable = canEdit(user)
                const deletable = canDelete(user)
                const availableRoles = getAvailableRoles(user.role)

                return (
                  <tr key={user.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.15s' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#fafafa'}
                    onMouseLeave={(e) => e.currentTarget.style.background = ''}>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <div style={{ fontWeight: 600, color: '#0f172a' }}>
                        {editable ? (
                          <input
                            defaultValue={user.full_name || ''}
                            onBlur={(event) => {
                              if (event.target.value !== (user.full_name || '')) {
                                handleProfile(user, 'full_name', event.target.value)
                              }
                            }}
                            style={{ fontWeight: 600, border: '1px solid #e2e8f0', borderRadius: 8, padding: '0.25rem 0.5rem', width: '100%' }}
                          />
                        ) : (
                          user.full_name || '—'
                        )}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{user.email}</div>
                      {editable ? (
                        <input
                          defaultValue={user.phone || ''}
                          placeholder="Téléphone"
                          onBlur={(event) => {
                            if (event.target.value !== (user.phone || '')) {
                              handleProfile(user, 'phone', event.target.value)
                            }
                          }}
                          style={{ marginTop: '0.35rem', fontSize: '0.8rem', border: '1px solid #e2e8f0', borderRadius: 8, padding: '0.25rem 0.5rem', width: '100%' }}
                        />
                      ) : null}
                    </td>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      {editable ? (
                        <select
                          value={user.role || 'student'}
                          onChange={(e) => handleRole(user.id, e.target.value)}
                          style={{ padding: '0.4rem 0.65rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.875rem', cursor: 'pointer' }}
                        >
                          {availableRoles.map((r) => (
                            <option key={r} value={r}>{ROLE_LABELS[r]}</option>
                          ))}
                        </select>
                      ) : (
                        <RoleBadge role={user.role} />
                      )}
                    </td>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      {editable ? (
                        <button
                          type="button"
                          onClick={() => handleStatus(user.id, !(user.is_active !== false))}
                          style={{
                            padding: '0.35rem 0.8rem',
                            borderRadius: '999px',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: 600,
                            fontSize: '0.8rem',
                            background: user.is_active !== false ? '#dcfce7' : '#fee2e2',
                            color: user.is_active !== false ? '#166534' : '#b91c1c',
                          }}
                        >
                          {user.is_active !== false ? '● Actif' : '○ Désactivé'}
                        </button>
                      ) : (
                        <span style={{ color: '#22c55e', fontWeight: 600, fontSize: '0.875rem' }}>● Actif</span>
                      )}
                    </td>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      {deletable ? (
                        <button
                          type="button"
                          onClick={() => handleDelete(user.id, user.email)}
                          style={{
                            padding: '0.35rem 0.75rem',
                            borderRadius: '8px',
                            border: '1px solid #fecaca',
                            background: '#fff',
                            color: '#dc2626',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                          }}
                        >
                          Supprimer
                        </button>
                      ) : (
                        <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Protégé</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
