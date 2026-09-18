import { supabase, isSupabaseConfigured } from '../lib/supabase'

export async function getPublishedArticles() {
  if (!isSupabaseConfigured) return []

  const { data, error } = await supabase
    .from('actualites')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function getArticleBySlug(slug) {
  const articles = await getPublishedArticles()
  return articles.find((item) => item.slug === slug) ?? null
}
