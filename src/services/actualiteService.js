import { supabase, isSupabaseConfigured } from '../lib/supabase'

const LOCAL_ACTUALITES_KEY = 'issmiga_actualites_v1'

function mapFromDb(item) {
  if (!item) return null

  let gallery = []
  if (Array.isArray(item.gallery)) {
    gallery = item.gallery
  } else if (typeof item.gallery === 'string') {
    try { gallery = JSON.parse(item.gallery) } catch { gallery = [] }
  }

  return {
    ...item,
    id: item.id,
    title: item.title || '',
    slug: item.slug || '',
    content: item.body || item.content || '',
    excerpt: item.excerpt || '',
    // On vérifie toutes les variantes possibles pour l'image de couverture
    image_url: item.cover_path || item.image_url || (gallery.length > 0 ? gallery[0].url : ''),
    video_url: item.video_url || '',
    gallery,
    category: item.category || 'Vie du campus',
    status: item.status || 'draft',
    created_at: item.created_at,
    published_at: item.published_at,
  }
}

function mapToDb(payload, { includeGallery = true } = {}) {
  const db = {
    title:        payload.title || '',
    slug:         payload.slug || payload.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `act-${Date.now()}`,
    category:     payload.category || 'Vie du campus',
    excerpt:      payload.excerpt || '',
    body:         payload.content || '',
    cover_path:   payload.image_url || null,
    video_url:    payload.video_url || null,
    status:       payload.status || 'draft',
    published_at: payload.status === 'published' ? new Date().toISOString() : null,
  }

  if (includeGallery && payload.gallery) {
    db.gallery = Array.isArray(payload.gallery) ? payload.gallery : JSON.parse(payload.gallery || '[]')
  }

  return db
}

export async function uploadArticleMedia(files) {
  const fileArray = Array.from(files)
  const results = await Promise.allSettled(fileArray.map(uploadSingleFile))
  const uploaded = []
  const errors = []

  results.forEach((result, i) => {
    if (result.status === 'fulfilled') {
      const type = fileArray[i].type.startsWith('video') ? 'video' : 'image'
      uploaded.push({ url: result.value, type })
    } else {
      errors.push({ file: fileArray[i].name, reason: result.reason?.message })
    }
  })

  return { uploaded, errors }
}

async function uploadSingleFile(file) {
  if (!isSupabaseConfigured) return URL.createObjectURL(file)
  const ext = file.name.split('.').pop()
  const folder = file.type.startsWith('video') ? 'videos' : 'covers'
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const filePath = `${folder}/${fileName}`

  const { error } = await supabase.storage.from('actualites').upload(filePath, file)
  if (error) throw error

  const { data } = supabase.storage.from('actualites').getPublicUrl(filePath)
  return data.publicUrl
}

export async function getAllArticles() {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase.from('actualites').select('*').order('created_at', { ascending: false })
    if (error) throw error
    return data.map(mapFromDb)
  }
  const raw = localStorage.getItem(LOCAL_ACTUALITES_KEY)
  return raw ? JSON.parse(raw) : []
}

export async function createArticle(payload) {
  if (isSupabaseConfigured) {
    const dbData = mapToDb(payload)
    const { data, error } = await supabase.from('actualites').insert([dbData]).select().single()
    if (error) throw error
    return mapFromDb(data)
  }
  return { ...payload, id: `act-${Date.now()}`, created_at: new Date().toISOString() }
}

export async function updateArticle(id, payload) {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase.from('actualites').update(mapToDb(payload)).eq('id', id).select().single()
    if (error) throw error
    return mapFromDb(data)
  }
  return { id, ...payload }
}

export async function deleteArticle(id) {
  if (isSupabaseConfigured) {
    const { error } = await supabase.from('actualites').delete().eq('id', id)
    if (error) throw error
  }
  return true
}

export async function getArticleBySlug(slug) {
  const all = await getAllArticles()
  return all.find(a => a.slug === slug)
}
