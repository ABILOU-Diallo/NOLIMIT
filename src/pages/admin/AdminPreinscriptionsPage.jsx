import { useEffect, useMemo, useState } from 'react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Loader } from '../../components/ui/Loader'
import { Modal } from '../../components/ui/Modal'
import { getPreinscriptions, updatePreinscriptionStatus } from '../../services/preinscriptionService'

const STATUS_OPTIONS = [
  { value: 'new', label: 'En attente', color: '#64748b' },
  { value: 'contacted', label: 'Contacté', color: '#3b82f6' },
  { value: 'validated', label: 'Validé', color: '#10b981' },
  { value: 'rejected', label: 'Rejeté', color: '#ef4444' },
]

export function AdminPreinscriptionsPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [institutionFilter, setInstitutionFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [selectedItem, setSelectedItem] = useState(null)

  async function loadItems() {
    try {
      setLoading(true)
      const data = await getPreinscriptions()
      setItems(data)
    } catch (err) {
      setError('Erreur de chargement.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadItems() }, [])

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesInst = institutionFilter === 'all' || item.institution === institutionFilter
      const haystack = `${item.full_name} ${item.email} ${item.formation_title}`.toLowerCase()
      return matchesInst && haystack.includes(query.toLowerCase())
    })
  }, [items, institutionFilter, query])

  const handleStatusUpdate = async (id, status) => {
    try {
      await updatePreinscriptionStatus(id, status, selectedItem?.admin_notes || '')
      setItems(prev => prev.map(i => i.id === id ? { ...i, status } : i))
      if (selectedItem?.id === id) setSelectedItem(prev => ({ ...prev, status }))
    } catch (err) { alert("Erreur de mise à jour") }
  }

  if (loading) return <Loader label="Chargement des préinscriptions..." />

  return (
    <div style={{ padding: '1rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h2 style={{ margin: 0, fontSize: '1.8rem', color: '#1e1b4b' }}>Registre des Préinscriptions</h2>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
        <Input placeholder="Rechercher par nom..." value={query} onChange={e => setQuery(e.target.value)} />
        <select value={institutionFilter} onChange={e => setInstitutionFilter(e.target.value)} style={{ padding: '0.75rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#fff', fontSize: '0.9rem', fontWeight: 600 }}>
          <option value="all">Tous les établissements</option>
          <option value="issmiga">ISSMIGA</option>
          <option value="cfp">CFP NO LIMIT</option>
        </select>
        <Button onClick={loadItems} variant="outline" style={{ height: 'fit-content', alignSelf: 'center' }}>Actualiser</Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
        {filtered.map(item => (
          <div key={item.id} style={{
            background: '#fff',
            padding: '1.25rem',
            borderRadius: '16px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
            border: '1px solid #f1f5f9',
            display: 'flex',
            gap: '1.5rem',
            flexWrap: 'wrap',
            alignItems: 'stretch'
          }}>
            {/* Photo Column */}
            <div style={{ width: '110px', flexShrink: 0 }}>
              <div style={{ width: '100%', aspectRatio: '3/4', borderRadius: '10px', overflow: 'hidden', border: '1px solid #e2e8f0', background: '#f8fafc' }}>
                {item.photo_url ? (
                  <img src={item.photo_url} alt={item.full_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbd5e1' }}>
                    <i className='bx bx-user' style={{ fontSize: '3rem' }} />
                  </div>
                )}
              </div>
              <div style={{ marginTop: '0.75rem', textAlign: 'center' }}>
                 <span style={{
                   fontSize: '0.65rem',
                   fontWeight: 800,
                   padding: '3px 8px',
                   borderRadius: '4px',
                   background: (STATUS_OPTIONS.find(o => o.value === item.status)?.color || '#64748b') + '15',
                   color: STATUS_OPTIONS.find(o => o.value === item.status)?.color || '#64748b',
                   textTransform: 'uppercase'
                 }}>
                   {STATUS_OPTIONS.find(o => o.value === item.status)?.label || 'En attente'}
                 </span>
              </div>
            </div>

            {/* Information Grid - Responsively Side by Side */}
            <div style={{ flex: 1, minWidth: '300px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem 2rem' }}>
              {/* Left Info Group */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.85rem' }}>
                <div><span style={{ color: '#64748b', fontWeight: 500 }}>Nom :</span> <span style={{ fontWeight: 700, color: '#1e1b4b' }}>{item.full_name}</span></div>
                <div><span style={{ color: '#64748b', fontWeight: 500 }}>Etablissement :</span> <span style={{ fontWeight: 700, color: '#141A5E' }}>{item.institution === 'cfp' ? 'CFP NO LIMIT' : 'ISSMIGA'}</span></div>
                <div><span style={{ color: '#64748b', fontWeight: 500 }}>Filiere :</span> <span style={{ fontWeight: 600 }}>{item.formation_title || 'N/A'}</span></div>
                <div><span style={{ color: '#64748b', fontWeight: 500 }}>Niveau :</span> <span style={{ color: '#db2777', fontWeight: 700 }}>{item.diploma_interest?.toUpperCase() || 'N/C'}</span></div>
                <div><span style={{ color: '#64748b', fontWeight: 500 }}>Diplome vise :</span> <span style={{ fontWeight: 600 }}>{item.diploma_interest?.toUpperCase() || 'N/C'}</span></div>
              </div>

              {/* Right Info Group */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.85rem' }}>
                <div><span style={{ color: '#64748b', fontWeight: 500 }}>Courriel :</span> <span style={{ color: '#2563eb' }}>{item.email}</span></div>
                <div><span style={{ color: '#64748b', fontWeight: 500 }}>Téléphone :</span> <span style={{ color: '#16a34a', fontWeight: 600 }}>{item.phone}</span></div>
                <div><span style={{ color: '#64748b', fontWeight: 500 }}>Ville :</span> <span>{item.city || 'Yaoundé'}</span></div>
                <div><span style={{ color: '#64748b', fontWeight: 500 }}>Naissance :</span> <span>{item.birth_date ? new Date(item.birth_date).toLocaleDateString('fr-FR') : 'N/C'}</span></div>
                <div><span style={{ color: '#64748b', fontWeight: 500 }}>Dossier N° :</span> <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#64748b' }}>{item.reference_code || 'N/A'}</span></div>
              </div>
            </div>

            {/* Quick Actions Column */}
            <div style={{ alignSelf: 'center', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Button onClick={() => setSelectedItem(item)} variant="secondary" style={{ padding: '0.6rem 1rem', borderRadius: '10px' }}>
                <i className='bx bx-show-alt' style={{ marginRight: '0.4rem' }} /> Détails
              </Button>
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <Modal open={true} title="Dossier complet de Préinscription" onClose={() => setSelectedItem(null)}>
          <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', alignItems: 'start' }}>
              <div style={{ width: '180px', aspectRatio: '3/4', borderRadius: '16px', overflow: 'hidden', background: '#f8fafc', border: '1px solid #e2e8f0', boxShadow: '0 8px 25px rgba(0,0,0,0.05)' }}>
                {selectedItem.photo_url ? (
                  <img src={selectedItem.photo_url} alt={selectedItem.full_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbd5e1', fontSize: '4rem' }}><i className='bx bx-user' /></div>
                )}
              </div>
              <div style={{ flex: 1, minWidth: '280px' }}>
                <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.8rem', color: '#1e1b4b', fontWeight: 800 }}>{selectedItem.full_name}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '1rem' }}>
                  <p style={{ margin: 0 }}><strong>Courriel :</strong> {selectedItem.email}</p>
                  <p style={{ margin: 0 }}><strong>Téléphone :</strong> {selectedItem.phone}</p>
                  <p style={{ margin: 0 }}><strong>Ville :</strong> {selectedItem.city || 'Yaoundé'}</p>
                  <p style={{ margin: 0 }}><strong>Naissance :</strong> {selectedItem.birth_date ? new Date(selectedItem.birth_date).toLocaleDateString('fr-FR') : 'Non renseignée'}</p>
                  <p style={{ margin: 0 }}><strong>Dossier N° :</strong> {selectedItem.reference_code || 'N/A'}</p>
                  <p style={{ margin: 0 }}><strong>École :</strong> {selectedItem.institution === 'cfp' ? 'CFP NO LIMIT' : 'ISSMIGA'}</p>
                </div>
              </div>
            </div>

            <div style={{ background: '#f0f7ff', padding: '1.5rem', borderRadius: '24px', border: '1px solid #dbeafe' }}>
              <h4 style={{ margin: '0 0 1.25rem 0', color: '#1e40af', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
                <i className='bx bx-list-check' style={{ fontSize: '1.5rem' }} /> Checklist des documents fournis
              </h4>
              <ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '1rem', display: 'grid', gap: '0.5rem', listStyleType: 'disc' }}>
                {(selectedItem.documents_checklist || []).length > 0 ? (
                  selectedItem.documents_checklist.map(doc => <li key={doc} style={{ color: '#334155' }}>{doc}</li>)
                ) : <li style={{ color: '#94a3b8', fontStyle: 'italic' }}>Aucun document sélectionné.</li>}
              </ul>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              <div style={{ background: '#f1f5f9', padding: '1.25rem', borderRadius: '16px' }}>
                <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.9rem', color: '#64748b', textTransform: 'uppercase' }}>Tuteur / Parent</h4>
                <p style={{ margin: 0 }}><strong>Nom :</strong> {selectedItem.guardian_name || 'N/C'}</p>
                <p style={{ margin: '0.25rem 0 0 0' }}><strong>Contact :</strong> {selectedItem.guardian_phone || 'N/C'}</p>
              </div>
              <div style={{ background: '#f1f5f9', padding: '1.25rem', borderRadius: '16px' }}>
                <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.9rem', color: '#64748b', textTransform: 'uppercase' }}>Message</h4>
                <p style={{ margin: 0, fontStyle: 'italic', color: '#475569' }}>{selectedItem.message || "Aucun message."}</p>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 700, color: '#1e1b4b' }}>Actions Administratives</label>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {STATUS_OPTIONS.map(opt => (
                  <button key={opt.value} onClick={() => handleStatusUpdate(selectedItem.id, opt.value)} style={{ padding: '0.7rem 1.25rem', borderRadius: '12px', border: `2px solid ${selectedItem.status === opt.value ? opt.color : '#e2e8f0'}`, background: selectedItem.status === opt.value ? opt.color : '#fff', color: selectedItem.status === opt.value ? '#fff' : opt.color, cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem', transition: 'all 0.2s' }}>
                    {opt.label.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
