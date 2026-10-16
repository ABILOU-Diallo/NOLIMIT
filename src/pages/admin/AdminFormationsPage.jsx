import { useEffect, useState, useMemo } from 'react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Loader } from '../../components/ui/Loader'
import { Textarea } from '../../components/ui/Textarea'
import {
  getFormations,
  getPoles,
  createFormation,
  updateFormation,
} from '../../services/formationService'

const DIPLOMAS_CONFIG = {
  issmiga: [
    { value: 'bts', label: 'BTS' },
    { value: 'licence', label: 'Licence' },
    { value: 'master', label: 'Master' }
  ],
  cfp: [
    { value: 'cqp', label: 'CQP' },
    { value: 'dqp', label: 'DQP' },
    { value: 'attestation', label: 'Attestation' }
  ]
}

const LEVELS_CONFIG = {
  issmiga: ['BTS', 'Licence', 'Master'],
  cfp: ['Professionnel']
}

const blankFormationForm = {
  pole_id: '',
  slug: '',
  title: '',
  excerpt: '',
  description: '',
  presentation: '',
  diploma: 'bts',
  level: 'BTS',
  duration: '2 ans',
  institution: 'issmiga',
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
  const [formationForm, setFormationForm] = useState(blankFormationForm)
  const [editingFormationId, setEditingFormationId] = useState(null)

  async function loadData() {
    try {
      setLoading(true)
      const [polesData, formationsData] = await Promise.all([getPoles(true), getFormations(true)])
      setPoles(polesData)
      setFormations(formationsData)
    } catch (err) { setError(err.message) } finally { setLoading(false) }
  }

  useEffect(() => { loadData() }, [])

  // Mise à jour automatique des diplômes/niveaux quand l'institution change
  useEffect(() => {
    if (!editingFormationId) {
      const inst = formationForm.institution
      setFormationForm(prev => ({
        ...prev,
        diploma: DIPLOMAS_CONFIG[inst][0].value,
        level: LEVELS_CONFIG[inst][0],
        duration: inst === 'issmiga' ? '2 ans' : '1 an'
      }))
    }
  }, [formationForm.institution, editingFormationId])

  function handleFormationChange(event) {
    const { name, value, type, checked } = event.target
    setFormationForm(curr => ({
      ...curr,
      [name]: type === 'checkbox' ? checked : (name === 'is_published' ? value === 'true' : value),
    }))
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
        setFormations(curr => curr.map(i => i.id === editingFormationId ? updated : i))
      } else {
        const res = await createFormation(payload)
        setFormations(curr => [...curr, res])
      }
      setFormationForm(blankFormationForm); setEditingFormationId(null)
    } catch (err) { setError(err.message) }
  }

  if (loading) return <Loader label="Chargement..." />

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
        <form onSubmit={handleFormationSubmit} style={{ background: '#fff', padding: '2rem', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          <h2 style={{ marginTop: 0 }}>{editingFormationId ? '✏️ Modifier' : '➕ Créer'} une filière</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700, fontSize: '0.85rem' }}>ÉTABLISSEMENT</label>
              <select name="institution" value={formationForm.institution} onChange={handleFormationChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #e2e8f0', fontWeight: 600 }}>
                <option value="issmiga">ISSMIGA</option>
                <option value="cfp">CFP NO LIMIT</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700, fontSize: '0.85rem' }}>PÔLE D'ÉTUDES</label>
              <select name="pole_id" value={formationForm.pole_id} onChange={handleFormationChange} required style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <option value="">Sélectionner un pôle...</option>
                {poles.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
          </div>

          <Input label="Titre de la formation *" name="title" value={formationForm.title} onChange={handleFormationChange} required placeholder="Ex: Génie Logiciel" />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700, fontSize: '0.85rem' }}>DIPLÔME VISÉ</label>
              <select name="diploma" value={formationForm.diploma} onChange={handleFormationChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                {DIPLOMAS_CONFIG[formationForm.institution].map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700, fontSize: '0.85rem' }}>NIVEAU ACADÉMIQUE</label>
              <select name="level" value={formationForm.level} onChange={handleFormationChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                {LEVELS_CONFIG[formationForm.institution].map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <Input label="Durée de la formation" name="duration" value={formationForm.duration} onChange={handleFormationChange} placeholder="Ex: 2 ans" />
          </div>

          <Textarea label="Présentation (Excerpt)" name="excerpt" value={formationForm.excerpt} onChange={handleFormationChange} rows={2} />

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <Button type="submit" full>Enregistrer la formation</Button>
            {editingFormationId && <Button type="button" variant="outline" onClick={() => { setFormationForm(blankFormationForm); setEditingFormationId(null); }}>Annuler</Button>}
          </div>
        </form>

        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '20px', border: '1px solid #f1f5f9' }}>
          <h3 style={{ marginTop: 0 }}>Liste des formations</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {formations.map(f => (
              <div key={f.id} style={{ padding: '1rem', border: '1px solid #f1f5f9', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: f.is_published ? '#fff' : '#fafafa' }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{f.title}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
                    {f.institution.toUpperCase()} · {f.diploma?.toUpperCase()} · {f.duration}
                  </div>
                </div>
                <Button variant="outline" size="small" onClick={() => {
                  setEditingFormationId(f.id)
                  setFormationForm({ ...blankFormationForm, ...f, skills: Array.isArray(f.skills) ? f.skills.join(', ') : '', outlets: Array.isArray(f.outlets) ? f.outlets.join(', ') : '', pole_id: f.poleId || f.pole_id })
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}>Éditer</Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
