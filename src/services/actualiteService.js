import { supabase, isSupabaseConfigured } from '../lib/supabase'

const LOCAL_ACTUALITES_KEY = 'issmiga_actualites_v1'

function mapFromDb(item) {
  if (!item) return null
  return {
    ...item,
    id: item.id,
    title: item.title || '',
    slug: item.slug || '',
    content: item.body || '',
    excerpt: item.excerpt || '',
    image_url: item.cover_path || '',
    video_url: item.video_url || '',
    category: item.category || 'Vie du campus',
    status: item.status || 'draft',
    created_at: item.created_at,
    published_at: item.published_at,
  }
}

function mapToDb(payload) {
  return {
    title: payload.title || '',
    slug: payload.slug || payload.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `act-${Date.now()}`,
    category: payload.category || 'Vie du campus',
    excerpt: payload.excerpt || '',
    body: payload.content || '',
    cover_path: payload.image_url || null,
    video_url: payload.video_url || null,
    status: payload.status || 'draft',
    published_at: payload.status === 'published' ? new Date().toISOString() : null,
  }
}

export async function getAllArticles() {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('actualites')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data.map(mapFromDb)
  }
  const raw = localStorage.getItem(LOCAL_ACTUALITES_KEY)
  return raw ? JSON.parse(raw) : []
}

export async function createArticle(payload) {
  if (isSupabaseConfigured) {
    const dbData = mapToDb(payload)
    console.log("Tentative d'insertion Supabase:", dbData)

    const { data, error } = await supabase
      .from('actualites')
      .insert([dbData])
      .select()
      .single()

    if (error) {
      console.error("Erreur Supabase lors de l'insertion:", error)
      throw new Error(`Supabase Error: ${error.message} (Code: ${error.code})`)
    }

    console.log('Insertion réussie:', data)
    return mapFromDb(data)
  }

  // Fallback local si Supabase non configuré
  const raw = localStorage.getItem(LOCAL_ACTUALITES_KEY)
  const list = raw ? JSON.parse(raw) : []
  const newArticle = { ...payload, id: `act-${Date.now()}`, created_at: new Date().toISOString() }
  localStorage.setItem(LOCAL_ACTUALITES_KEY, JSON.stringify([newArticle, ...list]))
  return newArticle
}

export async function updateArticle(id, payload) {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('actualites')
      .update(mapToDb(payload))
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return mapFromDb(data)
  }
  return { id, ...payload }
}

export async function deleteArticle(id) {
  if (isSupabaseConfigured) {
    const { error } = await supabase.from('actualites').delete().eq('id', id)
    if (error) throw error
    return true
  }
  return true
}

export async function getPublishedArticles() {
  const all = await getAllArticles()
  return all.filter(a => a.status === 'published')
}

export async function getArticleBySlug(slug) {
  const all = await getAllArticles()
  return all.find(a => a.slug === slug)
}
