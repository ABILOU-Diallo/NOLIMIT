import { useEffect, useMemo, useState } from 'react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Loader } from '../../components/ui/Loader'
import { Modal } from '../../components/ui/Modal'
import { useAuth } from '../../hooks/useAuth'
import {
  deleteUser,
  getUsers,
  ROLE_LABELS,
  updateUserRole,
  updateUserStatus,
  adminCreateUser
} from '../../services/authService'

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
  const { isSuperAdmin, isAdmin } = useAuth()
  const [users, setUsers] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Modales
  const [selectedUser, setSelectedUser] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newUserData, setNewUserData] = useState({ full_name: '', email: '', password: '', role: 'student' })
  const [isCreating, setIsCreating] = useState(false)

  async function loadUsers() {
    try {
      setLoading(true)
      const data = await getUsers({ hideOwner: false })
      setUsers(data)
    } catch (err) {
      setError('Impossible de charger les utilisateurs.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadUsers() }, [])

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

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole)
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u))
      feedback('Rôle mis à jour.')
    } catch (err) {
      feedback('Erreur lors du changement de rôle.', true)
    }
  }

  const handleStatusToggle = async (userId, currentStatus) => {
    try {
      const nextStatus = !currentStatus
      await updateUserStatus(userId, nextStatus)
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, is_active: nextStatus } : u))
      feedback(nextStatus ? 'Compte activé.' : 'Compte bloqué.')
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

  const handleAddUser = async (e) => {
    e.preventDefault()
    if (newUserData.password.length < 6) {
      return feedback('Le mot de passe doit faire au moins 6 caractères.', true)
    }

    setIsCreating(true)
    try {
      const created = await adminCreateUser(newUserData)
      setUsers([created, ...users])
      setShowAddModal(false)
      setNewUserData({ full_name: '', email: '', password: '', role: 'student' })
      feedback('Utilisateur ajouté avec succès.')
    } catch (err) {
      console.error(err)
      feedback(err.message || 'Erreur lors de la création.', true)
    } finally {
      setIsCreating(false)
    }
  }

  const canManage = (target) => {
    if (target.role === 'owner') return false
    if (isSuperAdmin) return true // Le SuperAdmin peut tout gérer sauf owner
    if (isAdmin && target.role === 'student') return true // L'admin gère les étudiants
    return false
  }

  if (loading) return <Loader label="Chargement des comptes..." />

  return (
    <div style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Gestion des Utilisateurs</h2>
          <p style={{ color: '#64748b' }}>Supervision des accès et des rôles de la plateforme.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Button variant="outline" onClick={() => { setNewUserData({...newUserData, role: 'student', password: ''}); setShowAddModal(true) }}>
            <i className="bx bx-plus" /> Ajouter Étudiant
          </Button>
          {isSuperAdmin && (
            <Button onClick={() => { setNewUserData({...newUserData, role: 'admin', password: ''}); setShowAddModal(true) }}>
              <i className="bx bx-shield-plus" /> Ajouter Admin
            </Button>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ flex: '1' }}>
          <Input
            placeholder="Rechercher un nom ou un email..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{ marginBottom: 0 }}
          />
        </div>
        <Button variant="ghost" onClick={loadUsers}><i className="bx bx-refresh" /> Actualiser</Button>
      </div>

      {error && <div style={{ background: '#fef2f2', color: '#dc2626', padding: '1rem', borderRadius: '12px', marginBottom: '1rem', border: '1px solid #fee2e2' }}>{error}</div>}
      {success && <div style={{ background: '#f0fdf4', color: '#166534', padding: '1rem', borderRadius: '12px', marginBottom: '1rem', border: '1px solid #dcfce7' }}>{success}</div>}

      <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden', border: '1px solid #f1f5f9' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ padding: '1.25rem', textAlign: 'left', color: '#64748b', fontSize: '0.85rem' }}>UTILISATEUR</th>
              <th style={{ padding: '1.25rem', textAlign: 'left', color: '#64748b', fontSize: '0.85rem' }}>RÔLE</th>
              <th style={{ padding: '1.25rem', textAlign: 'center', color: '#64748b', fontSize: '0.85rem' }}>STATUT</th>
              <th style={{ padding: '1.25rem', textAlign: 'right', color: '#64748b', fontSize: '0.85rem' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '1.25rem' }}>
                  <div style={{ fontWeight: 700 }}>{u.full_name || 'Inconnu'}</div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{u.email}</div>
                </td>
                <td style={{ padding: '1.25rem' }}>
                  {canManage(u) ? (
                    <select
                      value={u.role}
                      onChange={e => handleRoleChange(u.id, e.target.value)}
                      style={{ padding: '0.25rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                    >
                      <option value="student">Étudiant</option>
                      <option value="admin">Administrateur</option>
                      {isSuperAdmin && <option value="super_admin">Super Admin</option>}
                    </select>
                  ) : <RoleBadge role={u.role} />}
                </td>
                <td style={{ padding: '1.25rem', textAlign: 'center' }}>
                  <button
                    onClick={() => canManage(u) && handleStatusToggle(u.id, u.is_active)}
                    disabled={!canManage(u)}
                    style={{
                      background: u.is_active !== false ? '#dcfce7' : '#fee2e2',
                      color: u.is_active !== false ? '#166534' : '#991b1b',
                      border: 'none', padding: '0.3rem 0.6rem', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 700,
                      cursor: canManage(u) ? 'pointer' : 'not-allowed'
                    }}
                  >
                    {u.is_active !== false ? 'ACTIF' : 'BLOQUÉ'}
                  </button>
                </td>
                <td style={{ padding: '1.25rem', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <button onClick={() => setSelectedUser(u)} style={{ color: '#6366f1', background: 'none', border: 'none', cursor: 'pointer' }} title="Voir">
                      <i className="bx bx-show" style={{ fontSize: '1.2rem' }} />
                    </button>
                    {canManage(u) && (
                      <>
                        <button onClick={() => handleStatusToggle(u.id, u.is_active)} style={{ color: '#f59e0b', background: 'none', border: 'none', cursor: 'pointer' }} title={u.is_active ? "Bloquer" : "Débloquer"}>
                          <i className={`bx ${u.is_active !== false ? 'bx-block' : 'bx-check-circle'}`} style={{ fontSize: '1.2rem' }} />
                        </button>
                        <button onClick={() => handleDelete(u)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }} title="Supprimer">
                          <i className="bx bx-trash" style={{ fontSize: '1.2rem' }} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modale Voir Utilisateur */}
      {selectedUser && (
        <Modal open={!!selectedUser} title="Détails de l'utilisateur" onClose={() => setSelectedUser(null)}>
          <div style={{ padding: '1rem' }}>
            <p><strong>Nom :</strong> {selectedUser.full_name}</p>
            <p><strong>Email :</strong> {selectedUser.email}</p>
            <p><strong>Rôle :</strong> {ROLE_LABELS[selectedUser.role]}</p>
            <p><strong>Statut :</strong> {selectedUser.is_active !== false ? 'Actif' : 'Bloqué'}</p>
            <p><strong>Date inscription :</strong> {new Date(selectedUser.created_at).toLocaleDateString()}</p>
            <Button full onClick={() => setSelectedUser(null)} style={{ marginTop: '1rem' }}>Fermer</Button>
          </div>
        </Modal>
      )}

      {/* Modale Ajouter Utilisateur */}
      {showAddModal && (
        <Modal open={showAddModal} title={`Ajouter un ${ROLE_LABELS[newUserData.role]}`} onClose={() => setShowAddModal(false)}>
          <form onSubmit={handleAddUser} style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Input
              label="Nom complet"
              required
              value={newUserData.full_name}
              onChange={e => setNewUserData({...newUserData, full_name: e.target.value})}
            />
            <Input
              label="Adresse Email"
              type="email"
              required
              value={newUserData.email}
              onChange={e => setNewUserData({...newUserData, email: e.target.value})}
            />
            <Input
              label="Mot de passe"
              type="password"
              required
              placeholder="Min 6 caractères"
              value={newUserData.password}
              onChange={e => setNewUserData({...newUserData, password: e.target.value})}
            />
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <Button variant="outline" full onClick={() => setShowAddModal(false)} disabled={isCreating}>Annuler</Button>
              <Button type="submit" full disabled={isCreating}>
                {isCreating ? 'Création...' : 'Créer le compte'}
              </Button>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#64748b', fontStyle: 'italic', marginTop: '0.5rem' }}>
              L'utilisateur pourra se connecter immédiatement avec ces identifiants.
            </p>
          </form>
        </Modal>
      )}
    </div>
  )
}
