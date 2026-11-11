import { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Loader } from '../../components/ui/Loader'
import { Textarea } from '../../components/ui/Textarea'
import {
  createArticle, deleteArticle, getAllArticles, updateArticle,
  uploadArticleMedia,
} from '../../services/actualiteService'

const CATEGORIES = [
  'Vie du campus',
  'Événements',
  'Admissions',
  'Formations',
  'Annonces',
]

const blankForm = {
  title: '',
  slug: '',
  category: 'Vie du campus',
  excerpt: '',
  content: '',
  status: 'published',
  image_url: '',
  video_url: '',
  gallery: [],
}

export function AdminActualitesPage() {
  const [articles, setArticles]   = useState([])
  const [form, setForm]           = useState(blankForm)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading]     = useState(true)
  const [saving, setSaving]       = useState(false)
  const [error, setError]         = useState('')
  const [success, setSuccess]     = useState('')

  const [mediaQueue, setMediaQueue] = useState([])
  const [uploading, setUploading]   = useState(false)
  const [replacementTarget, setReplacementTarget] = useState(null)
  const fileInputRef = useRef(null)
  const replacementInputRef = useRef(null)

  const loadArticles = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getAllArticles()
      setArticles(Array.isArray(data) ? data : [])
    } catch {
      setError('Erreur réseau : Vérifiez votre connexion Supabase.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(loadArticles, 0)
    return () => window.clearTimeout(timer)
  }, [loadArticles])

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || [])
    const newItems = files.map(file => ({
      id: Math.random().toString(36),
      file,
      url: URL.createObjectURL(file),
      type: file.type.startsWith('video') ? 'video' : 'image',
      uploaded: false
    }))
    setMediaQueue(q => [...q, ...newItems])
    e.target.value = ''
  }

  const handleReplaceMedia = async (e) => {
    const file = e.target.files?.[0]
    const target = replacementTarget
    e.target.value = ''
    if (!file || !target) return

    setUploading(true)
    setError('')
    try {
      const { uploaded } = await uploadArticleMedia([file])
      const replacement = uploaded[0]
      if (!replacement) throw new Error("Le média n'a pas pu être téléversé.")

      if (target.kind === 'cover') {
        setForm(f => ({ ...f, image_url: replacement.url }))
      } else {
        const index = mediaQueue.findIndex(m => m.id === target.id)
        if (index === -1 || index >= form.gallery.length) throw new Error("Le média à remplacer n'existe plus.")

        setForm(f => ({
          ...f,
          image_url: f.image_url === target.url && replacement.type === 'image' ? replacement.url : f.image_url,
          video_url: f.video_url === target.url ? (replacement.type === 'video' ? replacement.url : '') : f.video_url,
          gallery: f.gallery.map((media, i) => i === index ? replacement : media),
        }))
        setMediaQueue(queue => queue.map(m => m.id === target.id
          ? { ...m, url: replacement.url, type: replacement.type, uploaded: true }
          : m))
      }
    } catch (err) {
      setError("Erreur lors du remplacement du média : " + (err.message || ''))
    } finally {
      setReplacementTarget(null)
      setUploading(false)
    }
  }

  const handleUploadQueue = async () => {
    const pending = mediaQueue.filter(m => !m.uploaded)
    if (!pending.length) return
    setUploading(true)
    setError('')
    try {
      const { uploaded, failed } = await uploadArticleMedia(pending.map(m => m.file))
      setForm(f => ({
        ...f,
        image_url: f.image_url || (uploaded.find(u => u.type === 'image')?.url),
        gallery: [...(f.gallery || []), ...uploaded.map(({ url, type }) => ({ url, type }))]
      }))
      const succeededIds = new Set(uploaded.map(({ index }) => pending[index]?.id).filter(Boolean))
      setMediaQueue(q => q.map(m => succeededIds.has(m.id)
        ? { ...m, uploaded: true, url: uploaded.find(({ index }) => pending[index]?.id === m.id)?.url || m.url }
        : m))
      if (failed.length) {
        setError(`${failed.length} fichier(s) n’ont pas pu être téléversés : ${failed.map(({ message }) => message).join(' ')}`)
      }
    } catch (err) {
      setError("Erreur d'upload : " + (err.message || ''))
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      if (editingId) {
        await updateArticle(editingId, form)
        setSuccess('Article mis à jour avec succès !')
      } else {
        await createArticle(form)
        setSuccess(form.status === 'published' ? 'Article publié avec succès !' : 'Brouillon enregistré avec succès !')
      }
      resetForm()
      await loadArticles()
    } catch (err) {
      setError(err.message || "Erreur lors de l'enregistrement.")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer l'article "${title}" ?`)) return
    try {
      await deleteArticle(id)
      setSuccess('Article supprimé avec succès.')
      if (editingId === id) resetForm()
      await loadArticles()
    } catch (err) {
      setError("Erreur lors de la suppression : " + (err.message || ''))
    }
  }

  const resetForm = () => {
    setForm(blankForm)
    setEditingId(null)
    setMediaQueue([])
    setReplacementTarget(null)
  }

  const handleEdit = (art) => {
    setEditingId(art.id)
    setForm({
      title: art.title || '',
      slug: art.slug || '',
      category: art.category || 'Vie du campus',
      excerpt: art.excerpt || '',
      content: art.content || '',
      status: art.status || 'published',
      image_url: art.image_url || '',
      video_url: art.video_url || '',
      gallery: art.gallery || [],
    })
    const galleryItems = Array.isArray(art.gallery)
      ? art.gallery.map((m, i) => ({
          ...(typeof m === 'string' ? { url: m, type: 'image' } : m),
          id: i,
          uploaded: true
        }))
      : []
    setMediaQueue(galleryItems)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) return <Loader label="Connexion au serveur..." />

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <style>{`
        .media-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 10px; margin: 1rem 0; }
        .thumb { aspect-ratio: 1; border-radius: 8px; overflow: hidden; background: #eee; border: 2px solid transparent; position: relative; }
        .thumb.active { border-color: #2563eb; box-shadow: 0 0 0 2px rgba(37,99,235,0.3); }
        .thumb img, .thumb video { width: 100%; height: 100%; object-fit: cover; }
      `}</style>

      {error && (
        <div style={{ background: '#fee2e2', border: '1px solid #f87171', color: '#991b1b', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
          {error}
        </div>
      )}

      {success && (
        <div style={{ background: '#dcfce7', border: '1px solid #86efac', color: '#166534', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
          {success}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2rem' }}>
        <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <h2 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#0f172a' }}>
            {editingId ? 'Modifier Article' : 'Nouvel Article'}
          </h2>

          <Input
            label="Titre de l'article"
            name="title"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            placeholder="Ex : Remise des ordinateurs aux étudiants"
            required
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, fontSize: '0.9rem', color: '#334155' }}>Catégorie</label>
              <select
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                style={{ width: '100%', padding: '0.65rem 0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '0.95rem' }}
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, fontSize: '0.9rem', color: '#334155' }}>Statut de publication</label>
              <select
                value={form.status}
                onChange={e => setForm({ ...form, status: e.target.value })}
                style={{ width: '100%', padding: '0.65rem 0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '0.95rem', fontWeight: 600, color: form.status === 'published' ? '#166534' : '#64748b' }}
              >
                <option value="published">🟢 Publié (visible sur le site)</option>
                <option value="draft">⚪ Brouillon (non visible)</option>
              </select>
            </div>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, fontSize: '0.9rem', color: '#334155' }}>
              Photos et Vidéos
            </label>
            <div className="media-grid">
              {form.image_url && !mediaQueue.some(m => m.url === form.image_url) && (
                <div className="thumb active">
                  <img src={form.image_url} alt="Couverture actuelle" width="160" height="100" loading="lazy" decoding="async" />
                  <span style={{ position: 'absolute', bottom: 4, left: 4, background: '#2563eb', color: '#fff', fontSize: '0.65rem', padding: '2px 5px', borderRadius: '4px' }}>
                    Couverture
                  </span>
                  <button
                    type="button"
                    aria-label="Remplacer le média de couverture"
                    onClick={() => {
                      setReplacementTarget({ kind: 'cover' })
                      replacementInputRef.current?.click()
                    }}
                    style={{ position: 'absolute', top: 4, right: 4, border: 0, borderRadius: 4, padding: '4px 6px', background: '#0f172a', color: '#fff', fontSize: '0.65rem', cursor: 'pointer' }}
                  >
                    Remplacer
                  </button>
                </div>
              )}
              {mediaQueue.map(m => (
                <div key={m.id} className={`thumb ${form.image_url === m.url ? 'active' : ''}`} onClick={() => setForm({ ...form, image_url: m.url })}>
                  {m.type === 'video' ? <video src={m.url} /> : <img src={m.url} alt="" width="160" height="100" loading="lazy" decoding="async" />}
                  {form.image_url === m.url && (
                    <span style={{ position: 'absolute', bottom: 4, left: 4, background: '#2563eb', color: '#fff', fontSize: '0.65rem', padding: '2px 5px', borderRadius: '4px' }}>
                      Couverture
                    </span>
                  )}
                  <button
                    type="button"
                    aria-label={`Remplacer le média ${m.type === 'video' ? 'vidéo' : 'image'}`}
                    disabled={!m.uploaded || uploading}
                    onClick={e => {
                      e.stopPropagation()
                      setReplacementTarget({ kind: 'gallery', id: m.id, url: m.url, type: m.type })
                      replacementInputRef.current?.click()
                    }}
                    style={{ position: 'absolute', top: 4, right: 4, border: 0, borderRadius: 4, padding: '4px 6px', background: '#0f172a', color: '#fff', fontSize: '0.65rem', cursor: m.uploaded && !uploading ? 'pointer' : 'not-allowed', opacity: m.uploaded && !uploading ? 1 : 0.6 }}
                  >
                    Remplacer
                  </button>
                </div>
              ))}
              <div
                className="thumb"
                onClick={() => fileInputRef.current.click()}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '2px dashed #cbd5e1', background: '#f8fafc' }}
              >
                <i className="bx bx-plus" style={{ fontSize: '1.8rem', color: '#64748b' }} />
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Ajouter</span>
              </div>
            </div>

            <input type="file" ref={fileInputRef} hidden multiple accept="image/*,video/*" onChange={handleFileSelect} />
            <input
              type="file"
              ref={replacementInputRef}
              hidden
              accept={replacementTarget?.kind === 'gallery' && replacementTarget.type === 'video' ? 'video/*' : 'image/*'}
              onChange={handleReplaceMedia}
            />
            {mediaQueue.some(m => !m.uploaded) && (
              <Button type="button" onClick={handleUploadQueue} disabled={uploading} style={{ marginBottom: '1rem' }}>
                {uploading ? 'Téléversement en cours...' : 'Envoyer les fichiers vers le serveur'}
              </Button>
            )}
          </div>

          <div style={{ marginTop: '1rem' }}>
            <Input
              label="Résumé court (optionnel — affiché sur la vignette)"
              name="excerpt"
              value={form.excerpt}
              onChange={e => setForm({ ...form, excerpt: e.target.value })}
              placeholder="Un résumé bref de 1 à 2 phrases..."
            />
          </div>

          <div style={{ marginTop: '1rem' }}>
            <Textarea
              label="Contenu complet de l'article"
              rows={8}
              value={form.content}
              onChange={e => setForm({ ...form, content: e.target.value })}
              placeholder="Rédigez le texte complet de votre actualité ici..."
              required
            />
          </div>

          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
            <Button type="submit" disabled={saving}>
              {saving ? 'Enregistrement...' : (editingId ? 'Mettre à jour' : (form.status === 'published' ? 'Publier l’article' : 'Enregistrer le brouillon'))}
            </Button>
            {editingId && (
              <Button type="button" variant="outline" onClick={resetForm}>
                Annuler la modification
              </Button>
            )}
          </div>
        </form>

        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', maxHeight: '85vh', overflowY: 'auto' }}>
          <h3 style={{ marginTop: 0, marginBottom: '1rem', color: '#0f172a' }}>Articles ({articles.length})</h3>
          {articles.length === 0 ? (
            <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Aucun article trouvé.</p>
          ) : (
            articles.map(a => (
              <div key={a.id} style={{ display: 'flex', gap: '12px', marginBottom: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem', alignItems: 'flex-start' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '6px', background: '#f1f5f9', overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {a.image_url ? (
                    <img src={a.image_url} alt="" width="320" height="200" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <i className="bx bx-news" style={{ fontSize: '1.5rem', color: '#94a3b8' }} />
                  )}
                </div>
                <div style={{ flexGrow: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {a.title}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                    <span style={{
                      fontSize: '0.7rem',
                      padding: '1px 6px',
                      borderRadius: '4px',
                      fontWeight: 600,
                      background: a.status === 'published' ? '#dcfce7' : '#f1f5f9',
                      color: a.status === 'published' ? '#166534' : '#64748b'
                    }}>
                      {a.status === 'published' ? 'Publié' : 'Brouillon'}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{a.category}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                    <button
                      onClick={() => handleEdit(a)}
                      style={{ color: '#2563eb', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.8rem', padding: 0, fontWeight: 500 }}
                    >
                      Modifier
                    </button>
                    <span style={{ color: '#cbd5e1' }}>•</span>
                    <button
                      onClick={() => handleDelete(a.id, a.title)}
                      style={{ color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.8rem', padding: 0, fontWeight: 500 }}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
