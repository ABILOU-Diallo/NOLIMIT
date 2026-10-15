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
      const haystack = `${item.full_name ?? ''} ${item.email ?? ''} ${item.formation_title ?? ''}`.toLowerCase()
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

  const handleExportPDF = () => {
    window.print();
  };

  if (loading) return <Loader label="Chargement des préinscriptions" />

  return (
    <div style={{ background: '#fff', borderRadius: '16px', padding: '1.25rem', boxShadow: '0 10px 18px rgba(15, 23, 42, 0.05)' }}>
      <style>{`
        @media print {
          .no-print, .admin-sidebar, .admin-topbar, .filters-area, .admin-sidebar-toggle {
            display: none !important;
          }
          .admin-content { margin: 0 !important; padding: 0 !important; width: 100% !important; left: 0 !important; }
          table { width: 100%; border-collapse: collapse; font-size: 10px; }
          th, td { border: 1px solid #e2e8f0; padding: 8px; text-align: left; }
          h2 { text-align: center; margin-bottom: 20px; color: #0f172a; }
          body { background: white !important; }
          .admin-shell { display: block !important; }
        }
      `}</style>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }} className="no-print">
        <h2 style={{ margin: 0 }}>Registre des Préinscriptions</h2>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button type="button" variant="outline" onClick={handleExportPDF} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <i className="bx bx-printer" /> Exporter PDF
          </Button>
          <Button type="button" variant="primary" onClick={loadItems}>Actualiser</Button>
        </div>
      </div>

      <div className="filters-area no-print" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, fontSize: '0.85rem' }}>Établissement</label>
          <select value={institutionFilter} onChange={(event) => setInstitutionFilter(event.target.value)} style={{ width: '100%', padding: '0.65rem 0.8rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}>
            <option value="all">Tous</option>
            <option value="issmiga">ISSMIGA</option>
            <option value="cfp">CFP NO LIMIT</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, fontSize: '0.85rem' }}>Statut</label>
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} style={{ width: '100%', padding: '0.65rem 0.8rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}>
            <option value="all">Tous</option>
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <div>
          <Input id="pre-search" label="Recherche rapide" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Nom, e-mail ou filière" />
        </div>
      </div>

      {error ? <p role="alert" style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</p> : null}

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1000px' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '2px solid #e2e8f0', background: '#f8fafc' }}>
              <th style={{ padding: '1rem 0.5rem' }}>Date Inscr.</th>
              <th style={{ padding: '1rem 0.5rem' }}>Candidat & Naissance</th>
              <th style={{ padding: '1rem 0.5rem' }}>Tuteur / Parent</th>
              <th style={{ padding: '1rem 0.5rem' }}>Filière & Diplôme</th>
              <th style={{ padding: '1rem 0.5rem' }}>Établissement</th>
              <th style={{ padding: '1rem 0.5rem' }} className="no-print">Suivi Admin</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9', verticalAlign: 'top' }}>
                <td style={{ padding: '0.85rem 0.5rem', fontSize: '0.85rem', color: '#64748b' }}>
                  {new Date(item.created_at).toLocaleDateString('fr-FR')}
                </td>
                <td style={{ padding: '0.85rem 0.5rem' }}>
                  <div style={{ fontWeight: '700', color: '#0f172a' }}>{item.full_name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    🎂 {item.birth_date ? new Date(item.birth_date).toLocaleDateString('fr-FR') : 'Date NC'}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#3b82f6', fontWeight: 600 }}>📞 {item.phone}</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>✉️ {item.email}</div>
                </td>
                <td style={{ padding: '0.85rem 0.5rem', fontSize: '0.85rem' }}>
                  {item.guardian_name ? (
                    <>
                      <div style={{ fontWeight: 600 }}>{item.guardian_name}</div>
                      <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{item.guardian_phone}</div>
                    </>
                  ) : <span style={{ color: '#cbd5e1', fontStyle: 'italic' }}>Non renseigné</span>}
                </td>
                <td style={{ padding: '0.85rem 0.5rem' }}>
                  <div style={{ fontWeight: '700', fontSize: '0.9rem', color: '#1e293b' }}>{item.formation_title || 'Non spécifiée'}</div>
                  <div style={{ fontSize: '0.75rem', color: '#db2777', fontWeight: '800', textTransform: 'uppercase', marginTop: '2px' }}>
                    {item.diploma_interest || 'CQP/DQP'}
                  </div>
                </td>
                <td style={{ padding: '0.85rem 0.5rem' }}>
                  <span style={{
                    padding: '3px 10px',
                    borderRadius: '6px',
                    fontSize: '0.72rem',
                    fontWeight: '800',
                    background: item.institution === 'cfp' ? '#fff7ed' : '#eff6ff',
                    color: item.institution === 'cfp' ? '#c2410c' : '#1d4ed8',
                    border: `1px solid ${item.institution === 'cfp' ? '#fdba74' : '#bfdbfe'}`
                  }}>
                    {item.institution === 'cfp' ? 'CFP NO LIMIT' : 'ISSMIGA'}
                  </span>
                </td>
                <td style={{ padding: '0.85rem 0.5rem' }} className="no-print">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <select
                      value={item.status || 'new'}
                      onChange={(event) => handleStatusUpdate(item.id, event.target.value, item.admin_notes || '')}
                      style={{
                        padding: '0.4rem 0.5rem',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.8rem',
                        background: item.status === 'validated' ? '#dcfce7' : item.status === 'rejected' ? '#fee2e2' : '#fff'
                      }}
                    >
                      {STATUS_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                    <textarea
                      value={item.admin_notes || ''}
                      placeholder="Notes de suivi..."
                      onChange={(event) => handleStatusUpdate(item.id, item.status || 'new', event.target.value)}
                      style={{
                        width: '100%',
                        minWidth: 180,
                        padding: '0.5rem',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.75rem',
                        resize: 'vertical'
                      }}
                      rows={2}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="6" style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
                  Aucune préinscription trouvée.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
