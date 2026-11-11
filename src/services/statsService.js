import { supabase, isSupabaseConfigured } from '../lib/supabase'

const SESSION_KEY = 'issmiga_visit_session_id'

function getSessionId() {
  try {
    let id = sessionStorage.getItem(SESSION_KEY)
    if (!id) {
      id = typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `sess-${Math.random().toString(36).substring(2, 9)}-${Date.now()}`
      sessionStorage.setItem(SESSION_KEY, id)
    }
    return id
  } catch {
    return `sess-${Date.now()}`
  }
}

function fillDays(rows, days = 30) {
  const map = new Map(
    (rows || []).map((row) => [
      row.stat_date,
      {
        views: Number(row.views || 0),
        unique_sessions: Number(row.unique_sessions || 0),
        new_users: Number(row.new_users || 0),
        new_preinscriptions: Number(row.new_preinscriptions || 0),
        new_contacts: Number(row.new_contacts || 0),
      },
    ]),
  )

  const series = []
  for (let i = days - 1; i >= 0; i -= 1) {
    const date = new Date()
    date.setHours(0, 0, 0, 0)
    date.setDate(date.getDate() - i)
    const key = date.toISOString().slice(0, 10)
    const current = map.get(key) || {
      views: 0,
      unique_sessions: 0,
      new_users: 0,
      new_preinscriptions: 0,
      new_contacts: 0,
    }
    series.push({
      date: key,
      label: date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }),
      ...current,
    })
  }
  return series
}

function demoSeries(days = 30) {
  const rows = []
  for (let i = days - 1; i >= 0; i -= 1) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const wave = Math.sin(i / 4) + 1.4
    rows.push({
      stat_date: date.toISOString().slice(0, 10),
      views: Math.round(18 + wave * 22 + (i % 5)),
      unique_sessions: Math.round(10 + wave * 12),
      new_users: Math.max(0, Math.round(wave * 1.4)),
      new_preinscriptions: Math.max(0, Math.round(wave * 1.1)),
      new_contacts: Math.max(0, Math.round(wave * 0.8)),
    })
  }
  return fillDays(rows, days)
}

export async function trackPageView(path) {
  if (!path || path.startsWith('/admin') || path.startsWith('/connexion') || path.startsWith('/compte')) {
    return
  }

  if (!isSupabaseConfigured) return

  try {
    await supabase.from('page_views').insert({
      path,
      session_id: getSessionId(),
      referrer: typeof document !== 'undefined' ? document.referrer || null : null,
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
    })
  } catch (error) {
    console.warn('Le suivi de visite n’a pas pu être enregistré :', error)
  }
}

export async function getDashboardSeries(days = 30) {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase.rpc('get_admin_dashboard_series', { days })
    if (error) throw error
    return fillDays(data || [], days)
  }
  return demoSeries(days)
}

export async function getDashboardCounts() {
  if (!isSupabaseConfigured) {
    return {
      users: 0,
      preinscriptions: 0,
      pendingPreinscriptions: 0,
      articles: 0,
      publishedArticles: 0,
      contacts: 0,
      pendingContacts: 0,
    }
  }

  const { data, error } = await supabase.rpc('get_admin_dashboard_counts')
  if (error) throw error
  const row = Array.isArray(data) ? data[0] : data
  if (!row) throw new Error('Les statistiques administrateur sont indisponibles.')
  return {
    users: Number(row.users || 0),
    preinscriptions: Number(row.preinscriptions || 0),
    pendingPreinscriptions: Number(row.pending_preinscriptions || 0),
    articles: Number(row.articles || 0),
    publishedArticles: Number(row.published_articles || 0),
    contacts: Number(row.contacts || 0),
    pendingContacts: Number(row.pending_contacts || 0),
  }
}

export async function getTopPages(limit = 8) {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase.rpc('get_top_pages', { days: 30, result_limit: limit })
    if (error) throw error
    return (data || []).map((row) => ({ path: row.path, views: Number(row.views || 0) }))
  }

  return []
}
