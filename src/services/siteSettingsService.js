import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { site } from '../data/site'

const LOCAL_KEY = 'issmiga_site_settings_v1'
const SETTINGS_COLUMNS = 'id,establishment_name,contact_email,phone,address,facebook,instagram,linkedin,youtube,whatsapp,academic_year,preinscriptions_open,issmiga_start,cfp_start,updated_at'

const defaults = {
  establishment_name: site.name,
  contact_email: site.email,
  phone: site.phones?.[0]?.display || '',
  address: site.address,
  facebook: '',
  instagram: '',
  linkedin: '',
  youtube: '',
  whatsapp: site.whatsapp?.display || '',
  academic_year: '2026-2027',
  preinscriptions_open: true,
  issmiga_start: '2026-10-05',
  cfp_start: '2026-10-15',
}

function getLocal() {
  try {
    const raw = localStorage.getItem(LOCAL_KEY)
    return raw ? { ...defaults, ...JSON.parse(raw) } : defaults
  } catch {
    return defaults
  }
}

export async function getSiteSettings() {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('site_settings')
      .select(SETTINGS_COLUMNS)
      .eq('id', 1)
      .maybeSingle()
    if (error) throw error
    if (data) return { ...defaults, ...data }
  }
  return getLocal()
}

export async function saveSiteSettings(payload) {
  const next = { ...defaults, ...payload, updated_at: new Date().toISOString() }

  if (isSupabaseConfigured) {
    const { error } = await supabase.from('site_settings').upsert({ id: 1, ...next })
    if (error) throw error
    return next
  }

  localStorage.setItem(LOCAL_KEY, JSON.stringify(next))
  return next
}
