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
    title: payload.title,
    slug: payload.slug || payload.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    category: payload.category || 'Vie du campus',
    excerpt: payload.excerpt,
    body: payload.content,
    cover_path: payload.image_url,
    video_url: payload.video_url || '',
    status: payload.status || 'published',
    published_at: payload.status === 'published' ? new Date().toISOString() : null,
  }
}

export async function getPublishedArticles() {
  try {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('actualites')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false })

      if (!error && data) return data.map(mapFromDb)
    }
  } catch (e) {
    console.error('Supabase error:', e)
  }

  const raw = localStorage.getItem(LOCAL_ACTUALITES_KEY)
  const list = raw ? JSON.parse(raw) : []
  return list.filter((item) => item.status === 'published')
}

export async function getAllArticles() {
  try {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('actualites')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error && data) return data.map(mapFromDb)
      if (error) console.error('Supabase error fetching articles:', error)
    }
  } catch (e) {
    console.error('Error in getAllArticles:', e)
  }

  const raw = localStorage.getItem(LOCAL_ACTUALITES_KEY)
  return raw ? JSON.parse(raw) : []
}

export async function getArticleBySlug(slug) {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('actualites')
        .select('*')
        .eq('slug', slug)
        .maybeSingle()

      if (!error && data) return mapFromDb(data)
    } catch (e) {
      console.error(e)
    }
  }

  const articles = await getAllArticles()
  return articles.find((item) => item.slug === slug) ?? null
}

export async function createArticle(payload) {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('actualites')
      .insert(mapToDb(payload))
      .select()
      .single()

    if (error) throw error
    return mapFromDb(data)
  }

  const raw = localStorage.getItem(LOCAL_ACTUALITES_KEY)
  const list = raw ? JSON.parse(raw) : []
  const newArticle = {
    ...payload,
    id: `act-${Date.now()}`,
    slug: payload.slug || payload.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    created_at: new Date().toISOString(),
    published_at: payload.status === 'published' ? new Date().toISOString() : null,
  }
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

  const raw = localStorage.getItem(LOCAL_ACTUALITES_KEY)
  const list = raw ? JSON.parse(raw) : []
  const updated = list.map((item) => (item.id === id ? { ...item, ...payload } : item))
  localStorage.setItem(LOCAL_ACTUALITES_KEY, JSON.stringify(updated))
  const result = updated.find((item) => item.id === id)
  return result
}

export async function deleteArticle(id) {
  if (isSupabaseConfigured) {
    const { error } = await supabase.from('actualites').delete().eq('id', id)
    if (error) throw error
    return true
  }

  const raw = localStorage.getItem(LOCAL_ACTUALITES_KEY)
  const list = raw ? JSON.parse(raw) : []
  const filtered = list.filter((item) => item.id !== id)
  localStorage.setItem(LOCAL_ACTUALITES_KEY, JSON.stringify(filtered))
  return true
}
