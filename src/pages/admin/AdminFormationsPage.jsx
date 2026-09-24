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
  diploma: 'cqp',
  duration: '1 an',
  institution: 'cfp',
  content_status: 'title-only',
  is_published: true,
  sort_order: 0,
}

export function AdminFormationsPage() {
  const [poles, setPoles] = useState([])
  const [formations, setFormations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('formations') // 'formations' | 'poles'

  // Pole State
  const [poleForm, setPoleForm] = useState(blankPoleForm)
  const [editingPoleId, setEditingPoleId] = useState(null)

  // Formation State
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

  useEffect(() => {
    loadData()
  }, [])

  function handlePoleChange(event) {
    const { name, value, type, checked } = event.target
    setPoleForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  function handleFormationChange(event) {
    const { name, value, type, checked } = event.target
    setFormationForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  async function handlePoleSubmit(event) {
    event.preventDefault()
    try {
      if (editingPoleId) {
        const updated = await updatePole(editingPoleId, poleForm)
        setPoles((current) => current.map((item) => (item.id === editingPoleId ? updated : item)))
      } else {
        // Simple client side slug generation if not provided, just for safety (Supabase requires it)
        const newPole = await createPole({ ...poleForm, slug: poleForm.slug || poleForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') })
        setPoles((current) => [...current, newPole])
      }
      setPoleForm(blankPoleForm)
      setEditingPoleId(null)
      setError('')
    } catch (err) {
      setError(err.message || 'La sauvegarde du pôle a échoué.')
    }
  }

  async function handleFormationSubmit(event) {
    event.preventDefault()
    try {
      if (editingFormationId) {
        const updated = await updateFormation(editingFormationId, formationForm)
        setFormations((current) => current.map((item) => (item.id === editingFormationId ? updated : item)))
      } else {
        const newFormation = await createFormation({ ...formationForm, slug: formationForm.slug || formationForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') })
        setFormations((current) => [...current, newFormation])
      }
      setFormationForm(blankFormationForm)
      setEditingFormationId(null)
      setError('')
    } catch (err) {
      setError(err.message || 'La sauvegarde de la formation a échoué.')
    }
  }

  function editPole(item) {
    setEditingPoleId(item.id)
    setPoleForm({
      slug: item.slug,
      name: item.name,
      tagline: item.tagline || '',
      description: item.description || '',
      sort_order: item.sortOrder || item.sort_order,
      is_published: item.isPublished || item.is_published,
    })
  }

  function editFormation(item) {
    setEditingFormationId(item.id)
    setFormationForm({
      pole_id: item.poleId,
      slug: item.slug,
      title: item.title,
      excerpt: item.excerpt || '',
      description: item.description || '',
      diploma: item.diploma,
      duration: item.duration,
      institution: item.institution,
      content_status: item.contentStatus,
      is_published: item.isPublished || item.is_published,
      sort_order: item.sortOrder || item.sort_order,
    })
  }

  async function handleDeletePole(id) {
    if (!window.confirm('Voulez-vous vraiment supprimer ce pôle ? (Impossible si des formations y sont liées)')) return
    try {
      await deletePole(id)
      setPoles((current) => current.filter((item) => item.id !== id))
      if (editingPoleId === id) {
        setEditingPoleId(null)
        setPoleForm(blankPoleForm)
      }
    } catch (err) {
      setError(err.message || 'La suppression a échoué. Des formations y sont peut-être liées.')
    }
  }

  async function handleDeleteFormation(id) {
    if (!window.confirm('Voulez-vous vraiment supprimer cette formation ?')) return
    try {
      await deleteFormation(id)
      setFormations((current) => current.filter((item) => item.id !== id))
      if (editingFormationId === id) {
        setEditingFormationId(null)
        setFormationForm(blankFormationForm)
      }
    } catch (err) {
      setError(err.message || 'La suppression a échoué.')
    }
  }

  if (loading) return <Loader label="Chargement des données" />

  return (
    <div>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <Button variant={activeTab === 'formations' ? 'primary' : 'outline'} onClick={() => setActiveTab('formations')}>
          Formations
        </Button>
        <Button variant={activeTab === 'poles' ? 'primary' : 'outline'} onClick={() => setActiveTab('poles')}>
          Pôles de formation
        </Button>
      </div>

      {error ? <p role="alert" style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</p> : null}

      {activeTab === 'formations' && (
        <div style={{ display: 'grid', gridTemplateColumns: '420px 1fr', gap: '1.5rem' }}>
          <form onSubmit={handleFormationSubmit} style={{ background: '#fff', borderRadius: '16px', padding: '1.25rem', boxShadow: '0 10px 18px rgba(15, 23, 42, 0.05)' }}>
            <h2 style={{ marginTop: 0 }}>{editingFormationId ? 'Modifier la formation' : 'Nouvelle formation'}</h2>
            
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Pôle</label>
            <select name="pole_id" value={formationForm.pole_id} onChange={handleFormationChange} required style={{ width: '100%', padding: '0.7rem 0.8rem', borderRadius: '10px', border: '1px solid #cbd5e1', marginBottom: '1rem' }}>
              <option value="">Sélectionner un pôle...</option>
              {poles.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>

            <Input id="f_title" label="Titre" name="title" value={formationForm.title} onChange={handleFormationChange} required />
            <Input id="f_slug" label="Slug" name="slug" value={formationForm.slug} onChange={handleFormationChange} />
            <Input id="f_excerpt" label="Extrait" name="excerpt" value={formationForm.excerpt} onChange={handleFormationChange} />
            <Textarea id="f_desc" label="Description" name="description" value={formationForm.description} onChange={handleFormationChange} rows={3} />
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Institution</label>
                <select name="institution" value={formationForm.institution} onChange={handleFormationChange} style={{ width: '100%', padding: '0.7rem 0.8rem', borderRadius: '10px', border: '1px solid #cbd5e1', marginBottom: '1rem' }}>
                  <option value="cfp">CFP NO LIMIT</option>
                  <option value="issmiga">ISSMIGA</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Diplôme</label>
                <select name="diploma" value={formationForm.diploma} onChange={handleFormationChange} style={{ width: '100%', padding: '0.7rem 0.8rem', borderRadius: '10px', border: '1px solid #cbd5e1', marginBottom: '1rem' }}>
                  <option value="cqp">CQP</option>
                  <option value="dqp">DQP</option>
                  <option value="langue">Langue</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
            </div>

            <Input id="f_duration" label="Durée" name="duration" value={formationForm.duration} onChange={handleFormationChange} />
            <Input id="f_sort" label="Ordre d'affichage" name="sort_order" type="number" value={formationForm.sort_order} onChange={handleFormationChange} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input type="checkbox" name="is_published" checked={formationForm.is_published} onChange={handleFormationChange} style={{ width: '1.2rem', height: '1.2rem' }} />
                <span>Publié</span>
              </label>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
              <Button type="submit">{editingFormationId ? 'Enregistrer' : 'Créer'}</Button>
              {editingFormationId ? (
                <Button type="button" variant="outline" onClick={() => { setEditingFormationId(null); setFormationForm(blankFormationForm) }}>Annuler</Button>
              ) : null}
            </div>
          </form>

          <div style={{ background: '#fff', borderRadius: '16px', padding: '1.25rem', boxShadow: '0 10px 18px rgba(15, 23, 42, 0.05)' }}>
            <h2 style={{ marginTop: 0 }}>Liste des formations</h2>
            {formations.length === 0 ? <p>Aucune formation.</p> : null}
            <div style={{ display: 'grid', gap: '0.9rem' }}>
              {formations.map((item) => (
                <div key={item.id} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'center' }}>
                    <div>
                      <strong>{item.title}</strong>
                      <div style={{ color: '#64748b', fontSize: '0.85rem' }}>
                        {poles.find(p => p.id === item.poleId)?.name || 'Sans pôle'} · {item.institution.toUpperCase()} · {item.diploma.toUpperCase()}
                      </div>
                      <div style={{ marginTop: '0.3rem', fontSize: '0.85rem' }}>
                        <span style={{ color: item.isPublished || item.is_published ? '#10b981' : '#f59e0b', fontWeight: 600 }}>
                          {item.isPublished || item.is_published ? 'Publié' : 'Brouillon'}
                        </span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <Button type="button" variant="outline" onClick={() => editFormation(item)}>Modifier</Button>
                      <Button type="button" variant="secondary" onClick={() => handleDeleteFormation(item.id)}>Supprimer</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'poles' && (
        <div style={{ display: 'grid', gridTemplateColumns: '420px 1fr', gap: '1.5rem' }}>
          <form onSubmit={handlePoleSubmit} style={{ background: '#fff', borderRadius: '16px', padding: '1.25rem', boxShadow: '0 10px 18px rgba(15, 23, 42, 0.05)' }}>
            <h2 style={{ marginTop: 0 }}>{editingPoleId ? 'Modifier le pôle' : 'Nouveau pôle'}</h2>
            
            <Input id="p_name" label="Nom" name="name" value={poleForm.name} onChange={handlePoleChange} required />
            <Input id="p_slug" label="Slug" name="slug" value={poleForm.slug} onChange={handlePoleChange} />
            <Input id="p_tagline" label="Slogan" name="tagline" value={poleForm.tagline} onChange={handlePoleChange} />
            <Textarea id="p_desc" label="Description" name="description" value={poleForm.description} onChange={handlePoleChange} rows={3} />
            
            <Input id="p_sort" label="Ordre d'affichage" name="sort_order" type="number" value={poleForm.sort_order} onChange={handlePoleChange} />
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input type="checkbox" name="is_published" checked={poleForm.is_published} onChange={handlePoleChange} style={{ width: '1.2rem', height: '1.2rem' }} />
                <span>Publié</span>
              </label>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
              <Button type="submit">{editingPoleId ? 'Enregistrer' : 'Créer'}</Button>
              {editingPoleId ? (
                <Button type="button" variant="outline" onClick={() => { setEditingPoleId(null); setPoleForm(blankPoleForm) }}>Annuler</Button>
              ) : null}
            </div>
          </form>

          <div style={{ background: '#fff', borderRadius: '16px', padding: '1.25rem', boxShadow: '0 10px 18px rgba(15, 23, 42, 0.05)' }}>
            <h2 style={{ marginTop: 0 }}>Liste des pôles</h2>
            {poles.length === 0 ? <p>Aucun pôle.</p> : null}
            <div style={{ display: 'grid', gap: '0.9rem' }}>
              {poles.map((item) => (
                <div key={item.id} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'center' }}>
                    <div>
                      <strong>{item.name}</strong>
                      <div style={{ color: '#64748b', fontSize: '0.85rem' }}>{item.tagline}</div>
                      <div style={{ marginTop: '0.3rem', fontSize: '0.85rem' }}>
                        <span style={{ color: item.isPublished || item.is_published ? '#10b981' : '#f59e0b', fontWeight: 600 }}>
                          {item.isPublished || item.is_published ? 'Publié' : 'Brouillon'}
                        </span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <Button type="button" variant="outline" onClick={() => editPole(item)}>Modifier</Button>
                      <Button type="button" variant="secondary" onClick={() => handleDeletePole(item.id)}>Supprimer</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
