import { useEffect, useState } from 'react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Loader } from '../../components/ui/Loader'
import { Textarea } from '../../components/ui/Textarea'
import {
  createFormation,
  deleteFormation,
  getFormations,
  getPoles,
  updateFormation,
} from '../../services/formationService'

const blankForm = {
  title: '',
  slug: '',
  pole_id: '',
  level: 'BTS',
  institution: 'cfp',
  duration: '1 an',
  excerpt: '',
  description: '',
  presentation: '',
  is_published: true,
  sort_order: 0,
}

export function AdminFormationsPage() {
  const [formations, setFormations] = useState([])
  const [poles, setPoles] = useState([])
  const [form, setForm] = useState(blankForm)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function loadData() {
    try {
      setLoading(true)
      const [fData, pData] = await Promise.all([getFormations(true), getPoles(true)])
      setFormations(fData)
      setPoles(pData)
    } catch (err) {
      setError('Erreur lors du chargement des données.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadData() }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const val = type === 'checkbox' ? checked : value

    if (name === 'title' && !editingId) {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      setForm(prev => ({ ...prev, title: value, slug }))
    } else {
      setForm(prev => ({ ...prev, [name]: val }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      if (editingId) {
        const updated = await updateFormation(editingId, form)
        setFormations(prev => prev.map(f => f.id === editingId ? updated : f))
      } else {
        const created = await createFormation(form)
        setFormations(prev => [...prev, created])
      }
      setForm(blankForm)
      setEditingId(null)
    } catch (err) {
      setError(err.message || 'Erreur lors de la sauvegarde.')
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (f) => {
    setEditingId(f.id)
    setForm({
      ...f,
      pole_id: f.poleId || f.pole_id, // Gestion des deux formats
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cette formation ?')) return
    try {
      await deleteFormation(id)
      setFormations(prev => prev.filter(f => f.id !== id))
    } catch (err) {
      alert('Erreur lors de la suppression')
    }
  }

  if (loading) return <Loader label="Chargement du catalogue..." />

  return (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ marginBottom: '2rem' }}>Gestion des Formations</h2>

      <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '3rem' }}>
        <h3 style={{ marginTop: 0 }}>{editingId ? 'Modifier la formation' : 'Ajouter une formation'}</h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <Input label="Titre *" name="title" value={form.title} onChange={handleChange} required />
          <Input label="Slug *" name="slug" value={form.slug} onChange={handleChange} required />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Pôle *</label>
            <select name="pole_id" value={form.pole_id} onChange={handleChange} required style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
              <option value="">Sélectionner un pôle</option>
              {poles.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <Input label="Niveau (ex: BTS, CQP)" name="level" value={form.level} onChange={handleChange} />
          <Input label="Durée" name="duration" value={form.duration} onChange={handleChange} />
        </div>

        <Textarea label="Extrait (courte description)" name="excerpt" value={form.excerpt} onChange={handleChange} />
        <Textarea label="Présentation complète" name="presentation" value={form.presentation} onChange={handleChange} rows={6} />

        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginTop: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input type="checkbox" name="is_published" checked={form.is_published} onChange={handleChange} />
            Publier sur le site
          </label>
          <Input label="Ordre d'affichage" name="sort_order" type="number" value={form.sort_order} onChange={handleChange} style={{ width: '100px', marginBottom: 0 }} />
        </div>

        {error && <p style={{ color: '#ef4444', marginTop: '1rem' }}>{error}</p>}

        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
          <Button type="submit" disabled={saving}>{saving ? 'Enregistrement...' : 'Enregistrer'}</Button>
          {editingId && <Button variant="outline" onClick={() => { setEditingId(null); setForm(blankForm); }}>Annuler</Button>}
        </div>
      </form>

      <div style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f8fafc' }}>
            <tr>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Titre</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Pôle</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Niveau</th>
              <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {formations.map(f => (
              <tr key={f.id} style={{ borderTop: '1px solid #e2e8f0' }}>
                <td style={{ padding: '1rem' }}>{f.title}</td>
                <td style={{ padding: '1rem', fontSize: '0.85rem' }}>{poles.find(p => p.id === (f.poleId || f.pole_id))?.name || '-'}</td>
                <td style={{ padding: '1rem' }}>{f.level}</td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <Button variant="ghost" onClick={() => handleEdit(f)} style={{ color: '#2563eb' }}>Modifier</Button>
                  <Button variant="ghost" onClick={() => handleDelete(f.id)} style={{ color: '#ef4444' }}>Supprimer</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
