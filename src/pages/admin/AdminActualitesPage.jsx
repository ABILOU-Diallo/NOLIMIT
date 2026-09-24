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
}

export function AdminActualitesPage() {
  const [articles, setArticles] = useState([])
  const [form, setForm] = useState(blankForm)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [imagePreview, setImagePreview] = useState('')
  const [uploadingImage, setUploadingImage] = useState(false)
  const fileInputRef = useRef(null)

  async function loadArticles() {
    try {
      setLoading(true)
      const data = await getAllArticles()
      setArticles(data)
      setError('')
    } catch (err) {
      setError(err.message || 'Impossible de charger les actualités.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadArticles() }, [])

  function handleChange(event) {
    const { name, value } = event.target
    // Auto-génération du slug depuis le titre
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

  // Upload d'image depuis l'appareil
  async function handleImageFile(event) {
    const file = event.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      setError('L\'image ne doit pas dépasser 5 Mo.')
      return
    }

    setUploadingImage(true)
    setError('')
    try {
      const url = await uploadArticleImage(file)
      setForm((current) => ({ ...current, image_url: url }))
      setImagePreview(url)
    } catch (err) {
      setError(err.message || 'L\'upload de l\'image a échoué.')
    } finally {
      setUploadingImage(false)
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
      setError('')
    } catch (err) {
      setError(err.message || 'La sauvegarde a échoué.')
    } finally {
      setSaving(false)
    }
  }

  function resetForm() {
    setForm(blankForm)
    setEditingId(null)
    setImagePreview('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  function handleEdit(article) {
    setEditingId(article.id)
    const imageUrl = article.image_url || ''
    setForm({
      title: article.title,
      slug: article.slug,
      category: article.category,
      excerpt: article.excerpt,
      content: article.content,
      status: article.status,
      image_url: imageUrl,
    })
    setImagePreview(imageUrl)
  }

  async function handleDelete(id) {
    if (!window.confirm('Supprimer définitivement cet article ?')) return
    try {
      await deleteArticle(id)
      setArticles((current) => current.filter((item) => item.id !== id))
      if (editingId === id) resetForm()
    } catch (err) {
      setError(err.message || 'La suppression a échoué.')
    }
  }

  if (loading) return <Loader label="Chargement des actualités" />

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '420px 1fr', gap: '1.5rem', alignItems: 'start' }}>
      {/* Formulaire */}
      <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 10px 18px rgba(15, 23, 42, 0.05)', position: 'sticky', top: '2rem' }}>
        <h2 style={{ marginTop: 0, fontSize: '1.2rem', fontWeight: 700 }}>
          {editingId ? '✏️ Modifier l\'actualité' : '➕ Nouvelle actualité'}
        </h2>

        <Input id="title" label="Titre *" name="title" value={form.title} onChange={handleChange} required />
        <Input id="slug" label="Slug (URL)" name="slug" value={form.slug} onChange={handleChange} />
        <Input id="category" label="Catégorie" name="category" value={form.category} onChange={handleChange} />
        <Input id="excerpt" label="Extrait" name="excerpt" value={form.excerpt} onChange={handleChange} />

        {/* Upload d'image */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.5rem', color: '#374151' }}>
            Image de couverture
          </label>

          {/* Prévisualisation */}
          {imagePreview && (
            <div style={{ marginBottom: '0.75rem', borderRadius: '10px', overflow: 'hidden', border: '1px solid #e2e8f0', maxHeight: 150 }}>
              <img src={imagePreview} alt="Aperçu" style={{ width: '100%', height: '150px', objectFit: 'cover', display: 'block' }} />
            </div>
          )}

          {/* Bouton charger depuis l'appareil */}
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadingImage}
              style={{
                padding: '0.55rem 1rem',
                borderRadius: '8px',
                border: '1.5px dashed #94a3b8',
                background: '#f8fafc',
                color: '#475569',
                cursor: uploadingImage ? 'wait' : 'pointer',
                fontSize: '0.85rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              📁 {uploadingImage ? 'Envoi en cours...' : 'Choisir une image'}
            </button>
            <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>JPG, PNG, WEBP — max 5 Mo</span>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            style={{ display: 'none' }}
            onChange={handleImageFile}
          />

          {/* Ou URL directe */}
          <div style={{ marginTop: '0.5rem' }}>
            <Input
              id="image_url"
              label="Ou coller une URL d'image"
              name="image_url"
              value={form.image_url}
              onChange={(e) => {
                handleChange(e)
                setImagePreview(e.target.value)
              }}
              placeholder="https://..."
            />
          </div>
        </div>

        {/* Statut */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.5rem', color: '#374151' }}>
            Statut de publication
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.7rem 0.8rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
          >
            <option value="draft">📝 Brouillon</option>
            <option value="published">🟢 Publié</option>
          </select>
        </div>

        <Textarea id="content" label="Contenu *" name="content" value={form.content} onChange={handleChange} rows={8} required />

        {error ? (
          <div role="alert" style={{ padding: '0.75rem', background: '#fef2f2', color: '#b91c1c', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.875rem' }}>
            ⚠ {error}
          </div>
        ) : null}

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
          <Button type="submit" disabled={saving}>
            {saving ? 'Enregistrement...' : editingId ? 'Enregistrer' : 'Créer l\'article'}
          </Button>
          {editingId ? (
            <Button type="button" variant="outline" onClick={resetForm}>Annuler</Button>
          ) : null}
        </div>
      </form>

      {/* Liste des articles */}
      <div style={{ background: '#fff', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 10px 18px rgba(15, 23, 42, 0.05)' }}>
        <h2 style={{ marginTop: 0, fontSize: '1.2rem', fontWeight: 700 }}>
          📋 Liste des actualités ({articles.length})
        </h2>
        {articles.length === 0 ? (
          <p style={{ color: '#94a3b8', textAlign: 'center', padding: '2rem 0' }}>Aucune actualité publiée.</p>
        ) : null}
        <div style={{ display: 'grid', gap: '0.9rem' }}>
          {articles.map((article) => (
            <div key={article.id} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
              {article.image_url && (
                <div style={{ height: 80, overflow: 'hidden', background: '#f1f5f9' }}>
                  <img src={article.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
              <div style={{ padding: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'flex-start' }}>
                  <div>
                    <strong style={{ fontSize: '0.95rem' }}>{article.title}</strong>
                    <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.25rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '0.1rem 0.5rem',
                        borderRadius: '999px',
                        background: article.status === 'published' ? '#dcfce7' : '#fef9c3',
                        color: article.status === 'published' ? '#166534' : '#854d0e',
                        fontWeight: 600,
                        fontSize: '0.7rem',
                      }}>
                        {article.status === 'published' ? '🟢 Publié' : '📝 Brouillon'}
                      </span>
                      {article.category}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                    <Button type="button" variant="outline" onClick={() => handleEdit(article)}>Modifier</Button>
                    <Button type="button" variant="secondary" onClick={() => handleDelete(article.id)}>Supprimer</Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
