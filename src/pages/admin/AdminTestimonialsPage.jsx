import { useEffect, useState } from 'react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Loader } from '../../components/ui/Loader'
import { Textarea } from '../../components/ui/Textarea'
import {
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../../services/testimonialService'

const blankForm = {
  author_name: '',
  author_role: '',
  quote: '',
  is_approved: false,
  sort_order: 0,
}

export function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState([])
  const [form, setForm] = useState(blankForm)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadTestimonials() {
    try {
      setLoading(true)
      const data = await getAllTestimonials()
      setTestimonials(data)
      setError('')
    } catch (err) {
      setError(err.message || 'Impossible de charger les témoignages.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTestimonials()
  }, [])

  function handleChange(event) {
    const { name, value, type, checked } = event.target
    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      if (editingId) {
        const updated = await updateTestimonial(editingId, form)
        setTestimonials((current) =>
          current.map((item) => (item.id === editingId ? { ...item, ...updated } : item))
        )
      } else {
        const created = await createTestimonial(form)
        setTestimonials((current) => [created, ...current])
      }

      setForm(blankForm)
      setEditingId(null)
      setError('')
    } catch (err) {
      setError(err.message || 'La sauvegarde a échoué.')
    }
  }

  function handleEdit(item) {
    setEditingId(item.id)
    setForm({
      author_name: item.author_name,
      author_role: item.author_role || '',
      quote: item.quote,
      is_approved: item.is_approved,
      sort_order: item.sort_order,
    })
  }

  async function handleDelete(id) {
    if (!window.confirm('Voulez-vous vraiment supprimer ce témoignage ?')) return
    try {
      await deleteTestimonial(id)
      setTestimonials((current) => current.filter((item) => item.id !== id))
      if (editingId === id) {
        setEditingId(null)
        setForm(blankForm)
      }
    } catch (err) {
      setError(err.message || 'La suppression a échoué.')
    }
  }

  if (loading) return <Loader label="Chargement des témoignages" />

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '420px 1fr', gap: '1.5rem' }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: '16px', padding: '1.25rem', boxShadow: '0 10px 18px rgba(15, 23, 42, 0.05)' }}>
        <h2 style={{ marginTop: 0 }}>{editingId ? 'Modifier le témoignage' : 'Nouveau témoignage'}</h2>
        
        <Input id="author_name" label="Auteur" name="author_name" value={form.author_name} onChange={handleChange} required />
        <Input id="author_role" label="Rôle / Formation" name="author_role" value={form.author_role} onChange={handleChange} />
        <Textarea id="quote" label="Citation" name="quote" value={form.quote} onChange={handleChange} rows={4} required />
        
        <Input id="sort_order" label="Ordre d'affichage" name="sort_order" type="number" value={form.sort_order} onChange={handleChange} />
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              name="is_approved"
              checked={form.is_approved}
              onChange={handleChange}
              style={{ width: '1.2rem', height: '1.2rem' }}
            />
            <span>Approuvé (visible sur le site)</span>
          </label>
        </div>

        {error ? <p role="alert">{error}</p> : null}
        
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
          <Button type="submit">{editingId ? 'Enregistrer' : 'Créer'}</Button>
          {editingId ? (
            <Button type="button" variant="outline" onClick={() => { setEditingId(null); setForm(blankForm) }}>
              Annuler
            </Button>
          ) : null}
        </div>
      </form>

      <div style={{ background: '#fff', borderRadius: '16px', padding: '1.25rem', boxShadow: '0 10px 18px rgba(15, 23, 42, 0.05)' }}>
        <h2 style={{ marginTop: 0 }}>Liste des témoignages</h2>
        {testimonials.length === 0 ? <p>Aucun témoignage.</p> : null}
        <div style={{ display: 'grid', gap: '0.9rem' }}>
          {testimonials.map((item) => (
            <div key={item.id} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'flex-start' }}>
                <div>
                  <strong style={{ fontSize: '1.1rem' }}>{item.author_name}</strong>
                  {item.author_role && <span style={{ color: '#64748b', marginLeft: '0.5rem' }}>({item.author_role})</span>}
                  
                  <blockquote style={{ margin: '0.5rem 0 0', fontStyle: 'italic', color: '#334155' }}>
                    "{item.quote}"
                  </blockquote>
                  
                  <div style={{ marginTop: '0.5rem', display: 'flex', gap: '1rem', fontSize: '0.85rem' }}>
                    <span style={{ color: item.is_approved ? '#10b981' : '#f59e0b', fontWeight: 600 }}>
                      {item.is_approved ? '✓ Approuvé' : 'En attente'}
                    </span>
                    <span style={{ color: '#64748b' }}>Ordre: {item.sort_order}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Button type="button" variant="outline" onClick={() => handleEdit(item)}>Modifier</Button>
                  <Button type="button" variant="secondary" onClick={() => handleDelete(item.id)}>Supprimer</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
