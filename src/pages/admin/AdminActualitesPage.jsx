import { useEffect, useRef, useState } from 'react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Loader } from '../../components/ui/Loader'
import { Textarea } from '../../components/ui/Textarea'
import { createArticle, deleteArticle, getAllArticles, updateArticle } from '../../services/actualiteService'
import { uploadArticleImage } from '../../services/authService'

const blankForm = {
  title: '',
  slug: '',
  category: 'Vie du campus',
  excerpt: '',
  content: '',
  status: 'draft',
  image_url: '',
  video_url: '',
}

export function AdminActualitesPage() {
  const [articles, setArticles] = useState([])
  const [form, setForm] = useState(blankForm)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [mediaType, setMediaType] = useState('image') // 'image' ou 'video'
  const [preview, setPreview] = useState('')
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef(null)

  async function loadArticles() {
    try {
      setLoading(true)
      const data = await getAllArticles()
      setArticles(Array.isArray(data) ? data : [])
      setError('')
    } catch (err) {
      setError('Impossible de charger les actualités.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadArticles() }, [])

  function handleChange(event) {
    const { name, value } = event.target
    if (name === 'title' && !editingId) {
      const autoSlug = value.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      setForm((current) => ({ ...current, title: value, slug: autoSlug }))
    } else {
      setForm((current) => ({ ...current, [name]: value }))
    }
  }

  async function handleFileUpload(event) {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError('')
    try {
      const url = await uploadArticleImage(file)
      if (mediaType === 'image') {
        setForm((current) => ({ ...current, image_url: url }))
      } else {
        setForm((current) => ({ ...current, video_url: url }))
      }
      setPreview(url)
    } catch (err) {
      setError('L\'envoi du fichier a échoué. Vérifiez votre connexion et le stockage Supabase.')
    } finally {
      setUploading(false)
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSaving(true)
    try {
      if (editingId) {
        const updated = await updateArticle(editingId, form)
        setArticles((current) => current.map((item) => (item.id === editingId ? { ...item, ...updated } : item)))
      } else {
        const created = await createArticle(form)
        setArticles((current) => [created, ...current])
      }
      resetForm()
    } catch (err) {
      setError('La sauvegarde a échoué : ' + (err.message || 'Erreur serveur'))
    } finally {
      setSaving(false)
    }
  }

  function resetForm() {
    setForm(blankForm)
    setEditingId(null)
    setPreview('')
    setMediaType('image')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  function handleEdit(article) {
    setEditingId(article.id)
    setForm(article)
    setPreview(article.image_url || article.video_url || '')
    setMediaType(article.video_url ? 'video' : 'image')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function renderMediaPreview(url) {
    if (!url) return null
    const isYT = url.includes('youtube.com') || url.includes('youtu.be')

    if (isYT) {
      const embedUrl = url.includes('embed') ? url : url.replace('watch?v=', 'embed/')
      return <iframe src={embedUrl} style={{ width: '100%', height: '200px', borderRadius: '8px', marginBottom: '0.5rem' }} frameBorder="0" allowFullScreen></iframe>
    }

    if (mediaType === 'video' || url.match(/\.(mp4|webm|ogg|mov)$/) || url.includes('storage')) {
      return <video src={url} controls style={{ width: '100%', borderRadius: '8px', marginBottom: '0.5rem' }} />
    }

    return <img src={url} alt="Aperçu" style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', marginBottom: '0.5rem' }} />
  }

  if (loading) return <Loader label="Chargement..." />

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>

        {/* FORMULAIRE */}
        <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '2rem', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ marginTop: 0 }}>{editingId ? '✏️ Modifier l\'actualité' : '➕ Créer une actualité'}</h2>

          <Input label="Titre *" name="title" value={form.title} onChange={handleChange} required />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <Input label="Catégorie" name="category" value={form.category} onChange={handleChange} />
            <Input label="Slug" name="slug" value={form.slug} onChange={handleChange} />
          </div>

          {/* Choix du statut de publication */}
          <div style={{ margin: '1rem 0' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>Statut de publication *</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.7rem 0.8rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.9rem', background: '#fff' }}
              required
            >
              <option value="draft">📝 Brouillon</option>
              <option value="published">🟢 Publié</option>
            </select>
          </div>

          <div style={{ margin: '1rem 0' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>Média principal</label>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <Button type="button" variant={mediaType === 'image' ? 'primary' : 'outline'} onClick={() => setMediaType('image')} size="small">🖼️ Photo</Button>
              <Button type="button" variant={mediaType === 'video' ? 'primary' : 'outline'} onClick={() => setMediaType('video')} size="small">🎥 Vidéo</Button>
            </div>

            {renderMediaPreview(preview)}

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current.click()}
                disabled={uploading}
                style={{ flex: 1 }}
              >
                {uploading ? 'Envoi...' : mediaType === 'image' ? '📁 Choisir image' : '📹 Choisir/Filmer vidéo'}
              </Button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept={mediaType === 'image' ? 'image/*' : 'video/*'}
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />
          </div>

          {mediaType === 'video' && (
            <Input label="Ou URL YouTube" name="video_url" value={form.video_url} onChange={handleChange} placeholder="https://..." />
          )}

          <Input label="Extrait" name="excerpt" value={form.excerpt} onChange={handleChange} />
          <Textarea label="Contenu *" name="content" value={form.content} onChange={handleChange} rows={6} required />

          {error && <p style={{ color: '#dc2626', fontSize: '0.85rem', background: '#fef2f2', padding: '0.5rem', borderRadius: '6px' }}>⚠️ {error}</p>}

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <Button type="submit" disabled={saving} full>{saving ? 'Enregistrement...' : 'Enregistrer'}</Button>
            {editingId && <Button type="button" variant="outline" onClick={resetForm}>Annuler</Button>}
          </div>
        </form>

        {/* LISTE */}
        <div style={{ background: '#fff', padding: '2rem', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ marginTop: 0 }}>📋 Liste ({articles.length})</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {articles.map(art => (
              <div key={art.id} style={{ display: 'flex', gap: '1rem', background: '#f8fafc', padding: '0.75rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ width: '80px', height: '60px', background: '#e2e8f0', borderRadius: '8px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {art.image_url ? (
                    <img src={art.image_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : art.video_url ? (
                    <i className='bx bx-video' style={{ fontSize: '1.8rem', color: '#64748b' }}></i>
                  ) : (
                    <i className='bx bx-news' style={{ fontSize: '1.8rem', color: '#64748b' }}></i>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'bold', fontSize: '0.95rem', color: '#1e293b' }}>{art.title}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{art.category} · {art.status === 'published' ? '🟢 Publié' : '📝 Brouillon'}</div>
                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                    <button onClick={() => handleEdit(art)} style={{ border: 'none', background: 'none', color: '#2563eb', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold', padding: 0 }}>Modifier</button>
                    <button onClick={() => deleteArticle(art.id).then(loadArticles)} style={{ border: 'none', background: 'none', color: '#dc2626', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold', padding: 0 }}>Supprimer</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
