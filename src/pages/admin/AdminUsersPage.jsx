import { useEffect, useMemo, useState, useCallback } from 'react'
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

const STATUS_LABELS = {
  new: 'Nouveau',
  contacted: 'Contacté',
  validated: 'Validé',
  rejected: 'Refusé'
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

/**
 * Composant de création isolé pour garantir la fluidité de saisie
 */
function AddUserModal({ open, onClose, onSuccess, isSuperAdmin }) {
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', password: '', role: 'student' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password.length < 6) return setError('Le mot de passe doit faire au moins 6 caractères.')
    setLoading(true)
    setError('')
    try {
      const created = await adminCreateUser(form)
      onSuccess(created)
      setForm({ full_name: '', email: '', phone: '', password: '', role: 'student' })
    } catch (err) {
      setError(err.message || 'Erreur lors de la création.')
    } finally {
      setLoading(false)
    }
  }

  return (open ? (
    <Modal open={open} title="Créer un nouveau compte" onClose={onClose}>
      <form onSubmit={handleSubmit} style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Input
            label="Nom complet *"
            name="full_name"
            required
            placeholder="Ex: Nom de l'utilisateur"
            value={form.full_name}
            onChange={handleChange}
          />
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Rôle assigné</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#fff' }}
            >
              <option value="student">Étudiant</option>
              <option value="admin">Administrateur</option>
              {isSuperAdmin && <option value="super_admin">Super Administrateur</option>}
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Input
            label="Adresse Email *"
            name="email"
            type="email"
            required
            placeholder="contact@nolimitacademy.org"
            value={form.email}
            onChange={handleChange}
          />
          <Input
            label="Téléphone (Optionnel)"
            name="phone"
            placeholder="6XX XXX XXX"
            value={form.phone}
            onChange={handleChange}
          />
        </div>

        <Input
          label="Mot de passe *"
          name="password"
          type="password"
          required
          placeholder="Min 6 caractères"
          value={form.password}
          onChange={handleChange}
        />

        {error && <p style={{ color: '#ef4444', fontSize: '0.85rem' }}>{error}</p>}

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <Button variant="outline" full onClick={onClose} disabled={loading} type="button">Annuler</Button>
          <Button type="submit" full disabled={loading}>
            {loading ? 'Création...' : 'Créer l\'utilisateur'}
          </Button>
        </div>
      </form>
    </Modal>
  ) : null)
}

export function AdminUsersPage() {
  const { isSuperAdmin, isAdmin } = useAuth()
  const [users, setUsers] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getUsers({ hideOwner: false })
      setUsers(data)
    } catch (err) {
      setError('Impossible de charger les utilisateurs.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadUsers() }, [loadUsers])

  const filtered = useMemo(
    () => users.filter((u) => {
      const haystack = `${u.full_name ?? ''} ${u.email ?? ''} ${u.phone ?? ''} ${u.preinscriptions?.map(p => p.formation_id).join(' ') || ''}`.toLowerCase()
      return haystack.includes(query.trim().toLowerCase())
    }),
    [query, users],
  )

  const handleUserCreated = useCallback((newUser) => {
    setUsers(prev => [newUser, ...prev])
    setShowAddModal(false)
    setSuccess('Félicitations ! Le compte a été créé avec succès.')
    setTimeout(() => setSuccess(''), 4000)
  }, [])

  const closeAddModal = useCallback(() => setShowAddModal(false), [])

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole)
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u))
      setSuccess('Rôle mis à jour.')
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) { setError('Erreur de mise à jour.') }
  }

  const handleStatusToggle = async (userId, currentStatus) => {
    try {
      const nextStatus = !currentStatus
      await updateUserStatus(userId, nextStatus)
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, is_active: nextStatus } : u))
    } catch (err) { setError('Erreur de statut.') }
  }

  const handleDelete = async (user) => {
    if (!window.confirm(`Supprimer définitivement le compte de ${user.email} ?`)) return
    try {
      await deleteUser(user.id)
      setUsers(prev => prev.filter(u => u.id !== user.id))
    } catch (err) { setError('Suppression impossible.') }
  }

  if (loading) return <Loader label="Chargement des comptes..." />

  return (
    <div style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Gestion des Utilisateurs</h2>
          <p style={{ color: '#64748b' }}>Suivi des accès ({filtered.length} affichés).</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Button onClick={() => setShowAddModal(true)}><i className="bx bx-plus" /> Nouvel Utilisateur</Button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ flex: '1' }}>
          <Input
            placeholder="Rechercher nom, email, téléphone ou formation..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{ marginBottom: 0 }}
          />
        </div>
        <Button variant="ghost" onClick={loadUsers}><i className="bx bx-refresh" /> Actualiser</Button>
      </div>

      {error && <div style={{ background: '#fef2f2', color: '#dc2626', padding: '1rem', borderRadius: '12px', marginBottom: '1rem' }}>{error}</div>}
      {success && <div style={{ background: '#f0fdf4', color: '#166534', padding: '1rem', borderRadius: '12px', marginBottom: '1rem' }}>{success}</div>}

      <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ padding: '1.25rem', textAlign: 'left', color: '#64748b', fontSize: '0.85rem' }}>UTILISATEUR</th>
              <th style={{ padding: '1.25rem', textAlign: 'left', color: '#64748b', fontSize: '0.85rem' }}>DERNIER VŒU</th>
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
                  <div style={{ fontSize: '0.8rem', color: '#6366f1' }}>{u.email}</div>
                </td>
                <td style={{ padding: '1.25rem' }}>
                  {u.preinscriptions?.length > 0 ? <span style={{ fontSize: '0.8rem' }}>{u.preinscriptions[0].formation_id}</span> : <em style={{ color: '#94a3b8' }}>Aucun</em>}
                </td>
                <td style={{ padding: '1.25rem' }}>
                  <select value={u.role} onChange={e => handleRoleChange(u.id, e.target.value)} style={{ padding: '0.35rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <option value="student">Étudiant</option>
                    <option value="admin">Administrateur</option>
                    {isSuperAdmin && <option value="super_admin">Super Admin</option>}
                  </select>
                </td>
                <td style={{ padding: '1.25rem', textAlign: 'center' }}>
                  <button onClick={() => handleStatusToggle(u.id, u.is_active)} style={{ background: u.is_active !== false ? '#dcfce7' : '#fee2e2', color: u.is_active !== false ? '#166534' : '#991b1b', border: 'none', padding: '0.35rem 0.75rem', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 800 }}>
                    {u.is_active !== false ? 'ACTIF' : 'BLOQUÉ'}
                  </button>
                </td>
                <td style={{ padding: '1.25rem', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <button onClick={() => setSelectedUser(u)} style={{ color: '#0f172a', background: '#f1f5f9', border: 'none', borderRadius: '8px', padding: '0.4rem' }}><i className="bx bx-show" style={{ fontSize: '1.2rem' }} /></button>
                    <button onClick={() => handleDelete(u)} style={{ color: '#ef4444', background: '#fef2f2', border: 'none', borderRadius: '8px', padding: '0.4rem' }}><i className="bx bx-trash" style={{ fontSize: '1.2rem' }} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddUserModal open={showAddModal} onClose={closeAddModal} onSuccess={handleUserCreated} isSuperAdmin={isSuperAdmin} />

      {selectedUser && (
        <Modal open={!!selectedUser} title="Détails" onClose={() => setSelectedUser(null)}>
          <div style={{ padding: '1rem' }}>
            <p><strong>Nom :</strong> {selectedUser.full_name}</p>
            <p><strong>Email :</strong> {selectedUser.email}</p>
            <p><strong>Tel :</strong> {selectedUser.phone || 'N/A'}</p>
            <Button full onClick={() => setSelectedUser(null)}>Fermer</Button>
          </div>
        </Modal>
      )}
    </div>
  )
}
