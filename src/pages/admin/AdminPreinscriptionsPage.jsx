import { useEffect, useMemo, useState } from 'react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Loader } from '../../components/ui/Loader'
import { getPreinscriptions, updatePreinscriptionStatus } from '../../services/preinscriptionService'

const STATUS_OPTIONS = [
  { value: 'new', label: 'En attente' },
  { value: 'contacted', label: 'Contacté' },
  { value: 'validated', label: 'Validé' },
  { value: 'rejected', label: 'Rejeté' },
]

export function AdminPreinscriptionsPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [institutionFilter, setInstitutionFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [query, setQuery] = useState('')

  async function loadItems() {
    try {
      setLoading(true)
      const data = await getPreinscriptions()
      setItems(data)
      setError('')
    } catch (err) {
      setError(err.message || 'Impossible de charger les préinscriptions.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadItems()
  }, [])

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesInstitution =
        institutionFilter === 'all' || item.institution === institutionFilter
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter
      const haystack = `${item.full_name ?? ''} ${item.email ?? ''}`.toLowerCase()
      const matchesQuery = haystack.includes(query.trim().toLowerCase())
      return matchesInstitution && matchesStatus && matchesQuery
    })
  }, [institutionFilter, items, query, statusFilter])

  const handleStatusUpdate = async (id, nextStatus, nextNotes) => {
    try {
      await updatePreinscriptionStatus(id, nextStatus, nextNotes)
      setItems((current) =>
        current.map((item) =>
          item.id === id ? { ...item, status: nextStatus, admin_notes: nextNotes } : item,
        ),
      )
    } catch (err) {
      setError(err.message || 'La mise à jour a échoué.')
    }
  }

  if (loading) return <Loader label="Chargement des préinscriptions" />

  return (
    <div style={{ background: '#fff', borderRadius: '16px', padding: '1.25rem', boxShadow: '0 10px 18px rgba(15, 23, 42, 0.05)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <h2 style={{ margin: 0 }}>Préinscriptions</h2>
        <Button type="button" variant="outline" onClick={loadItems}>Actualiser</Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.4rem' }}>Établissement</label>
          <select value={institutionFilter} onChange={(event) => setInstitutionFilter(event.target.value)} style={{ width: '100%', padding: '0.75rem 0.8rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
            <option value="all">Tous</option>
            <option value="issmiga">ISSMIGA</option>
            <option value="cfp">CFP NO LIMIT</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.4rem' }}>Statut</label>
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} style={{ width: '100%', padding: '0.75rem 0.8rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
            <option value="all">Tous</option>
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <div>
          <Input id="pre-search" label="Recherche" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Nom ou e-mail" />
        </div>
      </div>

      {error ? <p role="alert">{error}</p> : null}

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ padding: '0.85rem 0.5rem' }}>Candidat</th>
              <th style={{ padding: '0.85rem 0.5rem' }}>Établissement</th>
              <th style={{ padding: '0.85rem 0.5rem' }}>Statut</th>
              <th style={{ padding: '0.85rem 0.5rem' }}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9', verticalAlign: 'top' }}>
                <td style={{ padding: '0.85rem 0.5rem' }}>
                  <div><strong>{item.full_name}</strong></div>
                  <div style={{ color: '#64748b' }}>{item.email}</div>
                  <div style={{ color: '#64748b' }}>{item.phone}</div>
                </td>
                <td style={{ padding: '0.85rem 0.5rem' }}>{item.institution === 'cfp' ? 'CFP NO LIMIT' : 'ISSMIGA'}</td>
                <td style={{ padding: '0.85rem 0.5rem' }}>
                  <select
                    value={item.status || 'new'}
                    onChange={(event) => handleStatusUpdate(item.id, event.target.value, item.admin_notes || '')}
                    style={{ padding: '0.55rem 0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  >
                    {STATUS_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </td>
                <td style={{ padding: '0.85rem 0.5rem' }}>
                  <textarea
                    value={item.admin_notes || ''}
                    rows={3}
                    onChange={(event) => handleStatusUpdate(item.id, item.status || 'new', event.target.value)}
                    style={{ width: '100%', minWidth: 220, padding: '0.7rem 0.8rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
