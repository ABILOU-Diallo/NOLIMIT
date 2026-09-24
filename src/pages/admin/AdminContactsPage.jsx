import { useEffect, useState } from 'react'
import { Button } from '../../components/ui/Button'
import { Loader } from '../../components/ui/Loader'
import { getContacts, updateContactStatus, deleteContact } from '../../services/contactService'

const STATUS_OPTIONS = [
  { value: 'new', label: 'Nouveau' },
  { value: 'contacted', label: 'Traité' },
  { value: 'archived', label: 'Archivé' },
]

export function AdminContactsPage() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadContacts() {
    try {
      setLoading(true)
      const data = await getContacts()
      setContacts(data)
      setError('')
    } catch (err) {
      setError(err.message || 'Impossible de charger les messages de contact.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadContacts()
  }, [])

  const handleStatus = async (id, nextStatus) => {
    try {
      await updateContactStatus(id, nextStatus)
      setContacts((current) =>
        current.map((item) => (item.id === id ? { ...item, status: nextStatus } : item))
      )
    } catch (err) {
      setError(err.message || 'La mise à jour du statut a échoué.')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Voulez-vous vraiment supprimer ce message ?')) return
    try {
      await deleteContact(id)
      setContacts((current) => current.filter((item) => item.id !== id))
    } catch (err) {
      setError(err.message || 'La suppression a échoué.')
    }
  }

  if (loading) return <Loader label="Chargement des messages" />

  return (
    <div style={{ background: '#fff', borderRadius: '16px', padding: '1.25rem', boxShadow: '0 10px 18px rgba(15, 23, 42, 0.05)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <h2 style={{ margin: 0 }}>Messages de contact</h2>
        <Button type="button" variant="outline" onClick={loadContacts}>Actualiser</Button>
      </div>

      {error ? <p role="alert">{error}</p> : null}

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ padding: '0.85rem 0.5rem' }}>Expéditeur</th>
              <th style={{ padding: '0.85rem 0.5rem' }}>Sujet / Message</th>
              <th style={{ padding: '0.85rem 0.5rem' }}>Statut</th>
              <th style={{ padding: '0.85rem 0.5rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9', verticalAlign: 'top' }}>
                <td style={{ padding: '0.85rem 0.5rem' }}>
                  <div><strong>{item.full_name}</strong></div>
                  <div style={{ color: '#64748b' }}>{item.email}</div>
                  <div style={{ color: '#64748b' }}>{item.phone || '—'}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                    {new Date(item.created_at).toLocaleDateString()}
                  </div>
                </td>
                <td style={{ padding: '0.85rem 0.5rem' }}>
                  <div style={{ fontWeight: 600, marginBottom: '0.4rem' }}>{item.subject}</div>
                  <div style={{ whiteSpace: 'pre-wrap', color: '#334155' }}>{item.message}</div>
                </td>
                <td style={{ padding: '0.85rem 0.5rem' }}>
                  <select
                    value={item.status || 'new'}
                    onChange={(event) => handleStatus(item.id, event.target.value)}
                    style={{ padding: '0.55rem 0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  >
                    {STATUS_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </td>
                <td style={{ padding: '0.85rem 0.5rem', textAlign: 'right' }}>
                  <Button type="button" variant="outline" onClick={() => handleDelete(item.id)}>Supprimer</Button>
                </td>
              </tr>
            ))}
            {contacts.length === 0 && (
              <tr>
                <td colSpan="4" style={{ padding: '1rem', textAlign: 'center', color: '#64748b' }}>
                  Aucun message trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
