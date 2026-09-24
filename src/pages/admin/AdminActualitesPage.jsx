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
    <div className="admin-actualites-container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <style>{`
        .admin-actualites-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          align-items: start;
        }
        @media (min-width: 1024px) {
          .admin-actualites-grid {
            grid-template-columns: 420px 1fr;
          }
        }
        .admin-article-card {
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          overflow: hidden;
          background: #ffffff;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          display: flex;
          flex-direction: column;
        }
        .admin-article-img-wrapper {
          width: 100%;
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justifyContent: center;
          padding: 0.5rem;
        }
        .admin-article-img {
          width: 100%;
          height: auto;
          max-height: 200px;
          object-fit: contain;
          display: block;
        }
        .admin-articles-list-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1rem;
        }
      `}</style>

      <div className="admin-actualites-grid">
        {/* Formulaire */}
        <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 10px 18px rgba(15, 23, 42, 0.05)' }}>
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

            {/* Prévisualisation responsive entière */}
            {imagePreview && (
              <div style={{ marginBottom: '0.75rem', borderRadius: '10px', overflow: 'hidden', border: '1px solid #e2e8f0', background: '#f8fafc', padding: '0.25rem' }}>
                <img src={imagePreview} alt="Aperçu" style={{ width: '100%', height: 'auto', maxHeight: '180px', objectFit: 'contain', display: 'block', margin: '0 auto' }} />
              </div>
            )}

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

          <Textarea id="content" label="Contenu *" name="content" value={form.content} onChange={handleChange} rows={6} required />

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

        {/* Liste des articles sous forme de grille responsive et propre */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 10px 18px rgba(15, 23, 42, 0.05)' }}>
          <h2 style={{ marginTop: 0, fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.25rem' }}>
            📋 Liste des actualités ({articles.length})
          </h2>
          {articles.length === 0 ? (
            <p style={{ color: '#94a3b8', textAlign: 'center', padding: '2rem 0' }}>Aucune actualité publiée.</p>
          ) : null}

          <div className="admin-articles-list-grid">
            {articles.map((article) => (
              <div key={article.id} className="admin-article-card">
                <div className="admin-article-img-wrapper">
                  {article.image_url ? (
                    <img src={article.image_url} alt="" className="admin-article-img" />
                  ) : (
                    <div style={{ width: '100%', height: '100px', background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', borderRadius: '6px' }}>
                      <i className="bx bx-news" style={{ fontSize: '1.5rem' }} />
                    </div>
                  )}
                </div>
                <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
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
                      <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>
                        {article.category}
                      </span>
                    </div>
                    <strong style={{ fontSize: '0.9rem', color: '#0f172a', display: 'block', lineHeight: '1.4', marginBottom: '0.5rem' }}>
                      {article.title}
                    </strong>
                  </div>

                  <div style={{ display: 'flex', gap: '0.4rem', marginTop: '1rem', width: '100%' }}>
                    <button
                      type="button"
                      onClick={() => handleEdit(article)}
                      style={{
                        flex: 1,
                        padding: '0.4rem 0.5rem',
                        background: '#f1f5f9',
                        border: 'none',
                        borderRadius: '6px',
                        color: '#334155',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#e2e8f0'}
                      onMouseLeave={(e) => e.currentTarget.style.background = '#f1f5f9'}
                    >
                      ✏️ Modifier
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(article.id)}
                      style={{
                        padding: '0.4rem 0.6rem',
                        background: '#fef2f2',
                        border: 'none',
                        borderRadius: '6px',
                        color: '#dc2626',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#fee2e2'}
                      onMouseLeave={(e) => e.currentTarget.style.background = '#fef2f2'}
                    >
                      🗑️
                    </button>
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
