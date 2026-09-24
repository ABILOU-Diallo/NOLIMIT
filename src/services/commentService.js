import { supabase, isSupabaseConfigured } from '../lib/supabase'

const LOCAL_COMMENTS_KEY = 'issmiga_comments_v1'

function getLocalComments() {
  try {
    const raw = localStorage.getItem(LOCAL_COMMENTS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function setLocalComments(list) {
  try {
    localStorage.setItem(LOCAL_COMMENTS_KEY, JSON.stringify(list))
  } catch {
    // ignore
  }
}

export async function getPublicComments(articleId) {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('comments')
      .select('id, article_id, author_name, content, created_at')
      .eq('article_id', articleId)
      .eq('is_blocked', false)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data ?? []
  }

  return getLocalComments().filter((item) => item.article_id === articleId && !item.is_blocked)
}

export async function createComment(payload) {
  const row = {
    article_id: payload.articleId,
    author_name: payload.authorName.trim(),
    author_email: payload.authorEmail?.trim() || null,
    content: payload.content.trim(),
    is_blocked: false,
    created_at: new Date().toISOString(),
  }

  if (isSupabaseConfigured) {
    const { data, error } = await supabase.from('comments').insert(row).select().single()
    if (error) throw error
    return data
  }

  const created = { ...row, id: `cmt-${Date.now()}` }
  setLocalComments([created, ...getLocalComments()])
  return created
}

export async function getAllComments() {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('comments')
      .select('*, actualites(title, slug)')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data ?? []
  }
  return getLocalComments()
}

export async function blockComment(id, reason = 'Contenu inapproprié') {
  if (isSupabaseConfigured) {
    const { error } = await supabase
      .from('comments')
      .update({
        is_blocked: true,
        blocked_reason: reason,
        blocked_at: new Date().toISOString(),
      })
      .eq('id', id)
    if (error) throw error
    return true
  }

  setLocalComments(
    getLocalComments().map((item) =>
      item.id === id ? { ...item, is_blocked: true, blocked_reason: reason } : item,
    ),
  )
  return true
}

export async function unblockComment(id) {
  if (isSupabaseConfigured) {
    const { error } = await supabase
      .from('comments')
      .update({
        is_blocked: false,
        blocked_reason: null,
        blocked_at: null,
      })
      .eq('id', id)
    if (error) throw error
    return true
  }

  setLocalComments(
    getLocalComments().map((item) =>
      item.id === id ? { ...item, is_blocked: false, blocked_reason: null } : item,
    ),
  )
  return true
}

export async function deleteComment(id) {
  if (isSupabaseConfigured) {
    const { error } = await supabase.from('comments').delete().eq('id', id)
    if (error) throw error
    return true
  }
  setLocalComments(getLocalComments().filter((item) => item.id !== id))
  return true
}
