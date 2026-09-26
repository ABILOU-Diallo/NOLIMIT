import { useEffect, useState } from 'react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Loader } from '../../components/ui/Loader'
import { Textarea } from '../../components/ui/Textarea'
import {
  getFormations,
  getPoles,
  createFormation,
  updateFormation,
  deleteFormation,
  createPole,
  updatePole,
  deletePole,
} from '../../services/formationService'

const blankPoleForm = {
  slug: '',
  name: '',
  tagline: '',
  description: '',
  sort_order: 0,
  is_published: true,
}

const blankFormationForm = {
  pole_id: '',
  slug: '',
  title: '',
  excerpt: '',
  description: '',
  presentation: '',
  diploma: 'cqp',
  level: 'BTS',
  duration: '1 an',
  institution: 'cfp',
  skills: '',
  outlets: '',
  content_status: 'title-only',
  is_published: true,
  sort_order: 0,
}

export function AdminFormationsPage() {
  const [poles, setPoles] = useState([])
  const [formations, setFormations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('formations')

  const [poleForm, setPoleForm] = useState(blankPoleForm)
  const [editingPoleId, setEditingPoleId] = useState(null)

  const [formationForm, setFormationForm] = useState(blankFormationForm)
  const [editingFormationId, setEditingFormationId] = useState(null)

  async function loadData() {
    try {
      setLoading(true)
      const [polesData, formationsData] = await Promise.all([
        getPoles(true),
        getFormations(true),
      ])
      setPoles(polesData)
      setFormations(formationsData)
      setError('')
    } catch (err) {
      setError(err.message || 'Impossible de charger les données.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadData() }, [])

  function handlePoleChange(event) {
    const { name, value, type, checked } = event.target
    setPoleForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  function handleFormationChange(event) {
    const { name, value, type, checked } = event.target
    // Gestion spécifique pour le select de statut
    if (name === 'is_published') {
      setFormationForm((current) => ({ ...current, is_published: value === 'true' }))
    } else {
      setFormationForm((current) => ({
        ...current,
        [name]: type === 'checkbox' ? checked : value,
      }))
    }
  }

  async function handleFormationSubmit(event) {
    event.preventDefault()
    try {
      const payload = {
        ...formationForm,
        skills: typeof formationForm.skills === 'string' ? formationForm.skills.split(',').map(s => s.trim()).filter(Boolean) : formationForm.skills,
        outlets: typeof formationForm.outlets === 'string' ? formationForm.outlets.split(',').map(s => s.trim()).filter(Boolean) : formationForm.outlets,
      }

      if (editingFormationId) {
        const updated = await updateFormation(editingFormationId, payload)
        setFormations((current) => current.map((item) => (item.id === editingFormationId ? updated : item)))
      } else {
        const newFormation = await createFormation({
          ...payload,
          slug: payload.slug || payload.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        })
        setFormations((current) => [...current, newFormation])
      }
      resetFormationForm()
    } catch (err) {
      setError('Erreur lors de la sauvegarde : ' + err.message)
    }
  }

  function resetFormationForm() {
    setFormationForm(blankFormationForm)
    setEditingFormationId(null)
  }

  function editFormation(item) {
    setEditingFormationId(item.id)
    setFormationForm({
      pole_id: item.poleId,
      slug: item.slug,
      title: item.title,
      excerpt: item.excerpt || '',
      description: item.description || '',
      presentation: item.presentation || '',
      diploma: item.diploma,
      level: item.level || 'BTS',
      duration: item.duration,
      institution: item.institution,
      skills: Array.isArray(item.skills) ? item.skills.join(', ') : '',
      outlets: Array.isArray(item.outlets) ? item.outlets.join(', ') : '',
      content_status: item.contentStatus,
      is_published: item.isPublished ?? item.is_published ?? true,
      sort_order: item.sortOrder ?? item.sort_order ?? 0,
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) return <Loader label="Chargement..." />

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <Button variant={activeTab === 'formations' ? 'primary' : 'outline'} onClick={() => setActiveTab('formations')}>Formations</Button>
        <Button variant={activeTab === 'poles' ? 'primary' : 'outline'} onClick={() => setActiveTab('poles')}>Pôles</Button>
      </div>

      {activeTab === 'formations' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
          <form onSubmit={handleFormationSubmit} style={{ background: '#fff', padding: '2rem', borderRadius: '16px', boxShadow: '0 10px 15px rgba(0,0,0,0.05)' }}>
            <h2 style={{ marginTop: 0 }}>{editingFormationId ? '✏️ Modifier' : '➕ Créer'} une formation</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>Pôle *</label>
                <select name="pole_id" value={formationForm.pole_id} onChange={handleFormationChange} required style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                  <option value="">Sélectionner...</option>
                  {poles.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>Statut de publication *</label>
                <select
                  name="is_published"
                  value={String(formationForm.is_published)}
                  onChange={handleFormationChange}
                  style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff' }}
                >
                  <option value="false">📝 Brouillon</option>
                  <option value="true">🟢 Publié</option>
                </select>
              </div>
            </div>

            <Input label="Titre de la formation *" name="title" value={formationForm.title} onChange={handleFormationChange} required />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Input label="Niveau" name="level" value={formationForm.level} onChange={handleFormationChange} />
              <Input label="Diplôme" name="diploma" value={formationForm.diploma} onChange={handleFormationChange} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>Institution</label>
                <select name="institution" value={formationForm.institution} onChange={handleFormationChange} style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                  <option value="cfp">CFP NO LIMIT</option>
                  <option value="issmiga">ISSMIGA</option>
                </select>
              </div>
              <Input label="Durée" name="duration" value={formationForm.duration} onChange={handleFormationChange} />
            </div>

            <Textarea label="Brève description" name="excerpt" value={formationForm.excerpt} onChange={handleFormationChange} rows={2} />
            <Textarea label="Compétences (virgules)" name="skills" value={formationForm.skills} onChange={handleFormationChange} rows={2} />

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <Button type="submit" full>Enregistrer</Button>
              {editingFormationId && <Button type="button" variant="outline" onClick={resetFormationForm}>Annuler</Button>}
            </div>
          </form>

          <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <h3>Liste des formations ({formations.length})</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {formations.map(f => (
                <div key={f.id} style={{ padding: '1rem', border: '1px solid #eee', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>{f.title}</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>
                      {f.isPublished ? '🟢 Publié' : '📝 Brouillon'} · {f.institution.toUpperCase()}
                    </div>
                  </div>
                  <Button variant="outline" size="small" onClick={() => editFormation(f)}>Éditer</Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
