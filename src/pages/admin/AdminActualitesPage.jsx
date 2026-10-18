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
  const fileInputRef = useRef(null)

  async function loadArticles() {
    try {
      setLoading(true)
      const data = await getAllArticles()
      setArticles(Array.isArray(data) ? data : [])
    } catch {
      setError('Erreur réseau : Vérifiez votre connexion Supabase.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadArticles() }, [])

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
  }

  const handleUploadQueue = async () => {
    const pending = mediaQueue.filter(m => !m.uploaded)
    if (!pending.length) return
    setUploading(true)
    try {
      const { uploaded } = await uploadArticleMedia(pending.map(m => m.file))
      setForm(f => ({
        ...f,
        image_url: f.image_url || (uploaded.find(u => u.type === 'image')?.url),
        gallery: [...(f.gallery || []), ...uploaded]
      }))
      setMediaQueue(q => q.map(m => ({ ...m, uploaded: true })))
    } catch (err) {
      setError("Erreur d'upload")
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (editingId) {
        await updateArticle(editingId, form)
        setSuccess('Mis à jour !')
      } else {
        await createArticle(form)
        setSuccess('Publié !')
      }
      resetForm()
      loadArticles()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const resetForm = () => {
    setForm(blankForm)
    setEditingId(null)
    setMediaQueue([])
  }

  const handleEdit = (art) => {
    setEditingId(art.id)
    setForm(art)
    setMediaQueue(art.gallery.map((m, i) => ({ ...m, id: i, uploaded: true })))
    window.scrollTo(0,0)
  }

  if (loading) return <Loader label="Connexion au serveur..." />

  return (
    <div style={{ padding: '2rem' }}>
      <style>{`
        .media-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 10px; margin: 1rem 0; }
        .thumb { aspect-ratio: 1; border-radius: 8px; overflow: hidden; background: #eee; border: 2px solid transparent; }
        .thumb.active { border-color: blue; }
        .thumb img, .thumb video { width: 100%; height: 100%; object-fit: cover; }
      `}</style>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
        <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '2rem', borderRadius: '12px' }}>
          <h2>{editingId ? 'Modifier Article' : 'Nouvel Article'}</h2>

          <Input label="Titre" name="title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />

          <div className="media-grid">
            {mediaQueue.map(m => (
              <div key={m.id} className={`thumb ${form.image_url === m.url ? 'active' : ''}`} onClick={() => setForm({...form, image_url: m.url})}>
                {m.type === 'video' ? <video src={m.url} /> : <img src={m.url} />}
              </div>
            ))}
            <div className="thumb" onClick={() => fileInputRef.current.click()} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '2px dashed #ccc' }}>
              <i className="bx bx-plus" />
            </div>
          </div>

          <input type="file" ref={fileInputRef} hidden multiple onChange={handleFileSelect} />
          {mediaQueue.some(m => !m.uploaded) && <Button onClick={handleUploadQueue} disabled={uploading}>Envoyer les médias</Button>}

          <Textarea label="Contenu" rows={10} value={form.content} onChange={e => setForm({...form, content: e.target.value})} required />

          <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
            <Button type="submit" disabled={saving}>{saving ? 'Envoi...' : 'Enregistrer'}</Button>
            {editingId && <Button variant="outline" onClick={resetForm}>Annuler</Button>}
          </div>
        </form>

        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px' }}>
          <h3>Articles Récents</h3>
          {articles.map(a => (
            <div key={a.id} style={{ display: 'flex', gap: '10px', marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>
              <img src={a.image_url || '/placeholder.png'} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{a.title}</div>
                <button onClick={() => handleEdit(a)} style={{ color: 'blue', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.8rem' }}>Editer</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
