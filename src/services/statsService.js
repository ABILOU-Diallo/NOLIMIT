import { supabase, isSupabaseConfigured } from '../lib/supabase'

const SESSION_KEY = 'issmiga_visit_session_id'

function getSessionId() {
  try {
    let id = sessionStorage.getItem(SESSION_KEY)
    if (!id) {
      id = crypto.randomUUID()
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
  } catch {
    // tracking never blocks navigation
  }
}

export async function getDashboardSeries(days = 30) {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase.rpc('get_admin_dashboard_series', { days })
    if (!error && data) return fillDays(data, days)
  }
  return demoSeries(days)
}

export async function getTopPages(limit = 8) {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase.rpc('get_top_pages', { days: 30, result_limit: limit })
    if (!error && data) {
      return data.map((row) => ({ path: row.path, views: Number(row.views || 0) }))
    }
  }

  return [
    { path: '/', views: 128 },
    { path: '/formations', views: 86 },
    { path: '/preinscription', views: 64 },
    { path: '/actualites', views: 41 },
    { path: '/contact', views: 33 },
  ]
}
