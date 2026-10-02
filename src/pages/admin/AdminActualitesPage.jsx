import { useEffect, useRef, useState } from 'react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Loader } from '../../components/ui/Loader'
import { Textarea } from '../../components/ui/Textarea'
import {
  createArticle, deleteArticle, getAllArticles, updateArticle,
  uploadArticleMedia,
} from '../../services/actualiteService'

const blankForm = {
  title: '',
  slug: '',
  category: 'Vie du campus',
  excerpt: '',
  content: '',
  status: 'draft',
  image_url: '',
  video_url: '',
  gallery: [],
}

/* ─────────────────────────────────────────────────────────── */
export function AdminActualitesPage() {
  const [articles, setArticles]   = useState([])
  const [form, setForm]           = useState(blankForm)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading]     = useState(true)
  const [saving, setSaving]       = useState(false)
  const [error, setError]         = useState('')
  const [success, setSuccess]     = useState('')

  // file dans la queue locale (avant upload)
  const [mediaQueue, setMediaQueue] = useState([])   // [{ id, file, url, type, progress, uploaded, error }]
  const [uploading, setUploading]   = useState(false)
  const fileInputRef = useRef(null)

  /* ── Chargement ─────────────────────────────────────────── */
  async function loadArticles() {
    try {
      setLoading(true)
      const data = await getAllArticles()
      setArticles(Array.isArray(data) ? data : [])
      setError('')
    } catch {
      setError('Impossible de charger les actualités.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadArticles() }, [])

  /* ── Champs texte ───────────────────────────────────────── */
  function handleChange(e) {
    const { name, value } = e.target
    if (name === 'title' && !editingId) {
      const autoSlug = value.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      setForm(f => ({ ...f, title: value, slug: autoSlug }))
    } else {
      setForm(f => ({ ...f, [name]: value }))
    }
  }

  /* ── Sélection de fichiers ──────────────────────────────── */
  function handleFileSelect(e) {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    const newItems = files.map(file => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      file,
      url: URL.createObjectURL(file),
      type: file.type.startsWith('video') ? 'video' : 'image',
      progress: 0,
      uploaded: false,
      error: null,
    }))
    setMediaQueue(q => [...q, ...newItems])
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  /* ── Upload de la queue ─────────────────────────────────── */
  async function handleUploadQueue() {
    const pending = mediaQueue.filter(item => !item.uploaded && item.progress !== -1)
    if (!pending.length) return
    setUploading(true)
    setError('')

    for (const item of pending) {
      setMediaQueue(q => q.map(m => m.id === item.id ? { ...m, progress: 40 } : m))
      try {
        const { uploaded, errors } = await uploadArticleMedia([item.file])
        if (!uploaded.length) throw new Error(errors[0]?.reason || 'Upload échoué')
        const { url, type } = uploaded[0]
        setMediaQueue(q => q.map(m => m.id === item.id ? { ...m, url, type, progress: 100, uploaded: true } : m))
        setForm(f => {
          const isCoverSet = Boolean(f.image_url) || Boolean(f.video_url)
          return {
            ...f,
            image_url: (!isCoverSet && type === 'image') ? url : f.image_url,
            video_url: (!isCoverSet && type === 'video') ? url : f.video_url,
            gallery: [...(f.gallery || []), { url, type }],
          }
        })
      } catch (err) {
        setMediaQueue(q => q.map(m => m.id === item.id ? { ...m, progress: -1, error: err.message } : m))
        setError(`Erreur sur "${item.file?.name}" : ${err.message}`)
      }
    }
    setUploading(false)
  }

  /* ── Retirer un média ───────────────────────────────────── */
  function removeMedia(itemId) {
    setMediaQueue(q => {
      const item = q.find(m => m.id === itemId)
      if (item && !item.uploaded && item.url?.startsWith('blob:')) URL.revokeObjectURL(item.url)
      return q.filter(m => m.id !== itemId)
    })
  }

  /* ── Définir comme cover ────────────────────────────────── */
  function setCoverMedia(item) {
    if (!item.uploaded) return
    setForm(f => ({
      ...f,
      image_url: item.type === 'image' ? item.url : f.image_url,
      video_url: item.type === 'video' ? item.url : f.video_url,
    }))
  }

  /* ── Soumission ─────────────────────────────────────────── */
  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      if (editingId) {
        const updated = await updateArticle(editingId, form)
        setArticles(list => list.map(a => a.id === editingId ? { ...a, ...updated } : a))
        setSuccess('Actualité modifiée avec succès ✅')
      } else {
        const created = await createArticle(form)
        setArticles(list => [created, ...list])
        setSuccess('Actualité publiée avec succès ✅')
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
    setMediaQueue([])
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  function handleEdit(article) {
    setEditingId(article.id)
    setForm(article)
    const existingQueue = (article.gallery || []).map((item, i) => ({
      id: `existing-${i}`,
      file: null,
      url: item.url,
      type: item.type,
      progress: 100,
      uploaded: true,
      error: null,
    }))
    if (!existingQueue.length && article.image_url) {
      existingQueue.push({
        id: 'existing-cover', file: null, url: article.image_url,
        type: 'image', progress: 100, uploaded: true, error: null,
      })
    }
    setMediaQueue(existingQueue)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) return <Loader label="Chargement..." />

  const pendingCount = mediaQueue.filter(m => !m.uploaded && m.progress !== -1).length

  return (
    <div style={{ padding: '1rem', maxWidth: '1400px', margin: '0 auto' }}>
      <style>{`
        .admin-act-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
        @media (max-width: 900px) { .admin-act-grid { grid-template-columns: 1fr; } }

        .media-grid-admin { display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); gap: 0.6rem; margin-top: 0.75rem; }
        .media-thumb-admin {
          position: relative; border-radius: 10px; overflow: hidden;
          aspect-ratio: 1; background: #0f172a;
          border: 2px solid transparent; cursor: pointer; transition: border-color 0.2s;
        }
        .media-thumb-admin.is-cover { border-color: #2563eb; }
        .media-thumb-admin img, .media-thumb-admin video { width: 100%; height: 100%; object-fit: cover; display: block; }
        .media-thumb-overlay {
          position: absolute; inset: 0; display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          background: rgba(0,0,0,0.6); opacity: 0; transition: opacity 0.2s; gap: 0.3rem;
        }
        .media-thumb-admin:hover .media-thumb-overlay { opacity: 1; }
        .thumb-action-btn {
          background: rgba(255,255,255,0.92); border: none; cursor: pointer;
          border-radius: 6px; padding: 3px 8px; font-size: 0.68rem; font-weight: 700;
          color: #1e293b; transition: background 0.15s; white-space: nowrap;
        }
        .thumb-action-btn.del { background: #fee2e2; color: #dc2626; }
        .media-badge {
          position: absolute; top: 4px; left: 4px; font-size: 0.58rem; font-weight: 700;
          padding: 1px 5px; border-radius: 4px; color: #fff; pointer-events: none;
        }
        .media-badge.cover { background: #2563eb; }
        .media-badge.video-t { background: #7c3aed; }
        .media-badge.err { background: #dc2626; }
        .prog-bar { position: absolute; bottom: 0; left: 0; height: 3px; background: #3b82f6; transition: width 0.3s; }

        .upload-drop-zone {
          border: 2px dashed #cbd5e1; border-radius: 12px; padding: 1.25rem 1rem;
          text-align: center; cursor: pointer; background: #f8fafc; margin-top: 0.5rem;
          transition: border-color 0.2s, background 0.2s;
        }
        .upload-drop-zone:hover { border-color: #3b82f6; background: #eff6ff; }

        .art-card {
          display: flex; gap: 0.85rem; background: #f8fafc;
          padding: 0.75rem; border-radius: 12px; border: 1px solid #e2e8f0;
          transition: box-shadow 0.2s; align-items: flex-start;
        }
        .art-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.07); }
      `}</style>

      <div className="admin-act-grid">

        {/* ═══════ FORMULAIRE ═══════ */}
        <form
          onSubmit={handleSubmit}
          style={{ background: '#fff', padding: '1.75rem', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}
        >
          <h2 style={{ marginTop: 0, fontSize: '1.15rem', color: '#0f172a' }}>
            {editingId ? '✏️ Modifier l\'actualité' : '➕ Créer une actualité'}
          </h2>

          <Input label="Titre *" name="title" value={form.title} onChange={handleChange} required />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <Input label="Catégorie" name="category" value={form.category} onChange={handleChange} />
            <Input label="Slug" name="slug" value={form.slug} onChange={handleChange} />
          </div>

          {/* Statut */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: '600', fontSize: '0.83rem', color: '#374151' }}>Statut *</label>
            <select
              name="status" value={form.status} onChange={handleChange} required
              style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.88rem', background: '#fff', cursor: 'pointer' }}
            >
              <option value="draft">📝 Brouillon</option>
              <option value="published">🟢 Publié</option>
            </select>
          </div>

          {/* ─── Zone médias multi-sélection ─── */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: '600', fontSize: '0.83rem', color: '#374151' }}>
              Médias
              <span style={{ fontWeight: 400, color: '#94a3b8', marginLeft: '0.4rem', fontSize: '0.78rem' }}>
                images & vidéos — sélection multiple
              </span>
            </label>

            <div className="upload-drop-zone" onClick={() => fileInputRef.current?.click()}>
              <i className="bx bx-image-add" style={{ fontSize: '1.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.3rem' }} />
              <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Cliquez pour choisir ou glissez vos fichiers</span>
              <span style={{ display: 'block', fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                JPG · PNG · GIF · MP4 · MOV — plusieurs fichiers autorisés
              </span>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              multiple
              style={{ display: 'none' }}
              onChange={handleFileSelect}
            />

            {/* Grille de préview */}
            {mediaQueue.length > 0 && (
              <div className="media-grid-admin">
                {mediaQueue.map(item => {
                  const isCover = item.url === form.image_url || item.url === form.video_url
                  return (
                    <div key={item.id} className={`media-thumb-admin ${isCover ? 'is-cover' : ''}`}>
                      {item.type === 'video'
                        ? <video src={item.url} muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        : <img src={item.url} alt="" />
                      }
                      {item.type === 'video' && <span className="media-badge video-t">▶</span>}
                      {isCover && <span className="media-badge cover" style={{ left: 'auto', right: 4 }}>✓</span>}
                      {item.progress === -1 && <span className="media-badge err">⚠</span>}
                      {item.progress > 0 && item.progress < 100 && (
                        <div className="prog-bar" style={{ width: `${item.progress}%` }} />
                      )}
                      <div className="media-thumb-overlay">
                        {item.uploaded && !isCover && (
                          <button type="button" className="thumb-action-btn" onClick={() => setCoverMedia(item)}>
                            ⭐ Cover
                          </button>
                        )}
                        <button type="button" className="thumb-action-btn del" onClick={() => removeMedia(item.id)}>
                          🗑 Retirer
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Bouton upload */}
            {pendingCount > 0 && (
              <Button
                type="button"
                variant="outline"
                onClick={handleUploadQueue}
                disabled={uploading}
                style={{ marginTop: '0.6rem', width: '100%' }}
              >
                {uploading
                  ? '⏳ Envoi en cours…'
                  : `⬆️ Envoyer ${pendingCount} fichier${pendingCount > 1 ? 's' : ''}`}
              </Button>
            )}

            {/* URL YouTube */}
            <div style={{ marginTop: '0.75rem' }}>
              <Input
                label="URL YouTube (optionnel)"
                name="video_url"
                value={form.video_url}
                onChange={handleChange}
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>
          </div>

          <Input label="Extrait" name="excerpt" value={form.excerpt} onChange={handleChange} />
          <Textarea label="Contenu *" name="content" value={form.content} onChange={handleChange} rows={5} required />

          {error && (
            <p style={{ color: '#dc2626', fontSize: '0.82rem', background: '#fef2f2', padding: '0.55rem 0.75rem', borderRadius: '8px', margin: 0, lineHeight: 1.5 }}>
              ⚠️ {error}
            </p>
          )}
          {success && (
            <p style={{ color: '#16a34a', fontSize: '0.82rem', background: '#f0fdf4', padding: '0.55rem 0.75rem', borderRadius: '8px', margin: 0 }}>
              {success}
            </p>
          )}

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Button type="submit" disabled={saving} full>
              {saving ? 'Enregistrement…' : form.status === 'published' ? '🚀 Publier' : '💾 Enregistrer brouillon'}
            </Button>
            {editingId && (
              <Button type="button" variant="outline" onClick={resetForm}>Annuler</Button>
            )}
          </div>
        </form>

        {/* ═══════ LISTE ═══════ */}
        <div style={{ background: '#fff', padding: '1.75rem', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.08)' }}>
          <h2 style={{ marginTop: 0, fontSize: '1.15rem', color: '#0f172a' }}>
            📋 Actualités ({articles.length})
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', maxHeight: '72vh', overflowY: 'auto', paddingRight: '0.2rem' }}>
            {articles.length === 0 && (
              <p style={{ color: '#94a3b8', textAlign: 'center', padding: '2rem 0', fontSize: '0.9rem' }}>
                Aucune actualité pour l'instant.
              </p>
            )}
            {articles.map(art => (
              <div key={art.id} className="art-card">
                {/* Vignette */}
                <div style={{ width: '72px', height: '58px', borderRadius: '8px', overflow: 'hidden', background: '#e2e8f0', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  {art.image_url
                    ? <img src={art.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : art.video_url
                      ? <i className="bx bx-video" style={{ fontSize: '1.6rem', color: '#64748b' }} />
                      : <i className="bx bx-news" style={{ fontSize: '1.6rem', color: '#64748b' }} />
                  }
                  {art.gallery?.length > 1 && (
                    <span style={{ position: 'absolute', bottom: 2, right: 2, background: 'rgba(0,0,0,0.65)', color: '#fff', fontSize: '0.58rem', padding: '1px 4px', borderRadius: '3px', fontWeight: 700 }}>
                      +{art.gallery.length - 1}
                    </span>
                  )}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: '700', fontSize: '0.88rem', color: '#1e293b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {art.title}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.15rem' }}>
                    {art.category} · {art.status === 'published' ? '🟢 Publié' : '📝 Brouillon'}
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.4rem' }}>
                    <button
                      onClick={() => handleEdit(art)}
                      style={{ border: 'none', background: 'none', color: '#2563eb', cursor: 'pointer', fontSize: '0.78rem', fontWeight: '700', padding: 0 }}
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => deleteArticle(art.id).then(loadArticles)}
                      style={{ border: 'none', background: 'none', color: '#dc2626', cursor: 'pointer', fontSize: '0.78rem', fontWeight: '700', padding: 0 }}
                    >
                      Supprimer
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
