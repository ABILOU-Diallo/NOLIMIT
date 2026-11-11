import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { getCachedRequest, invalidateCachedRequests, fetchAllPages } from '../utils/requestCache'
import { compressImage } from '../utils/compressImage'

const ARTICLE_COLUMNS = 'id,title,slug,category,excerpt,body,cover_path,video_url,gallery,status,published_at,created_at,updated_at'
const ADMIN_PAGE_SIZE = 200
const PUBLIC_PAGE_SIZE = 20

export const fallbackArticles = [
  {
    id: 'act-fallback-1',
    title: 'Offre Spéciale Rentrée 2026 : Un Laptop Offert à Chaque Étudiant Inscrit à ISSMIGA !',
    slug: 'offre-laptop-gratuit-rentree-2026',
    category: 'Vie du campus',
    excerpt: 'Dans le cadre du programme d’excellence et de transformation digitale, tout étudiant inscrit à ISSMIGA reçoit un ordinateur portable professionnel offert.',
    content: 'L’administration d’ISSMIGA et du Groupe NO LIMIT est heureuse d’annoncer le maintien de l’offre exceptionnelle "Un Étudiant inscrit = Un Laptop offert gratuitement" pour la rentrée d’octobre 2026. Cette initiative vise à garantir à chaque apprenant un accès autonome aux outils informatiques modernes dès le premier jour de cours.',
    image_url: '/og-image.jpeg',
    video_url: '',
    gallery: [],
    status: 'published',
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
  },
  {
    id: 'act-fallback-2',
    title: 'Cérémonie de remise des diplômes CQP & DQP de la promotion précédente',
    slug: 'remise-diplomes-cqp-dqp-promotion',
    category: 'Événements',
    excerpt: 'Plus de 150 étudiants et apprenants ont célébré la fin de leur parcours de formation professionnelle au campus d’Emana.',
    content: 'La cérémonie annuelle de remise des diplômes s’est tenue au sein du campus ISSMIGA à Yaoundé. En présence du promoteur Dr Orly Tantchou, des enseignants et des familles, les lauréats ont reçu leurs parchemins CQP et DQP agréés par le MINEFOP.',
    image_url: '/og-image.jpeg',
    video_url: '',
    gallery: [],
    status: 'published',
    published_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'act-fallback-3',
    title: 'Ouverture des préinscriptions pour le cycle BTS, Licence et Master 2026-2027',
    slug: 'ouverture-preinscriptions-bts-licence-master',
    category: 'Admissions',
    excerpt: 'Les candidats au cycle supérieur ISSMIGA et aux formations professionnelles CFP NO LIMIT peuvent dès maintenant remplir leur dossier en ligne.',
    content: 'Le Groupe NO LIMIT informe les élèves de terminale, bacheliers et professionnels que les candidatures pour l’année académique 2026-2027 sont officiellement ouvertes. Les cours débuteront le 5 octobre 2026 pour ISSMIGA et le 15 octobre 2026 pour le CFP NO LIMIT.',
    image_url: '/og-image.jpeg',
    video_url: '',
    gallery: [],
    status: 'published',
    published_at: new Date(Date.now() - 86400000 * 7).toISOString(),
    created_at: new Date(Date.now() - 86400000 * 7).toISOString(),
  },
]

function mapFromDb(item) {
  if (!item) return null
  let gallery = []
  if (Array.isArray(item.gallery)) {
    gallery = item.gallery
  } else if (typeof item.gallery === 'string') {
    try { gallery = JSON.parse(item.gallery) } catch { gallery = [] }
  }

  const firstGalleryImage = gallery.find(g => (typeof g === 'string' && !g.match(/\.(mp4|webm|ogg|mov|m4v)/i)) || (g?.type === 'image' || (g?.url && !g?.type)))
  const firstGalleryImageUrl = typeof firstGalleryImage === 'string' ? firstGalleryImage : (firstGalleryImage?.url || (gallery.length > 0 ? (gallery[0]?.url || gallery[0]) : ''))

  const firstGalleryVideo = gallery.find(g => (typeof g === 'string' && g.match(/\.(mp4|webm|ogg|mov|m4v)/i)) || g?.type === 'video')
  const firstGalleryVideoUrl = typeof firstGalleryVideo === 'string' ? firstGalleryVideo : (firstGalleryVideo?.url || '')

  const content = item.body || item.content || ''
  const excerpt = item.excerpt || (content ? content.substring(0, 160).trim() + '...' : '')

  return {
    ...item,
    id: item.id,
    title: item.title || '',
    slug: item.slug || '',
    content,
    excerpt,
    image_url: item.cover_path || item.image_url || firstGalleryImageUrl || '',
    video_url: item.video_url || firstGalleryVideoUrl || '',
    gallery,
    category: item.category || 'Vie du campus',
    status: item.status || 'published',
    created_at: item.created_at,
    published_at: item.published_at || item.created_at,
  }
}

function mapToDb(payload) {
  const title = payload.title || ''
  const status = payload.status || 'published'
  const content = payload.content || payload.body || ''
  const excerpt = payload.excerpt || (content ? content.substring(0, 160).trim() : '')

  return {
    title: title,
    slug: payload.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `act-${Date.now()}`,
    category: payload.category || 'Vie du campus',
    excerpt: excerpt,
    body: content,
    cover_path: payload.image_url || null,
    video_url: payload.video_url || null,
    status: status,
    gallery: payload.gallery || [],
    published_at: status === 'published' ? (payload.published_at || new Date().toISOString()) : null,
  }
}

export async function uploadArticleMedia(files) {
  const fileArray = Array.from(files)
  const results = await Promise.allSettled(fileArray.map(async (file) => {
    const uploadFile = file.type.startsWith('image/') ? await compressImage(file) : file
    return uploadSingleFile(uploadFile)
  }))
  const uploaded = []
  const failed = []
  results.forEach((result, i) => {
    if (result.status === 'fulfilled') {
      const type = fileArray[i].type.startsWith('video') ? 'video' : 'image'
      uploaded.push({ url: result.value, type, index: i })
    } else {
      failed.push({ index: i, message: result.reason?.message || 'Échec du téléversement.' })
    }
  })
  return { uploaded, failed }
}

async function uploadSingleFile(file) {
  if (!isSupabaseConfigured || !supabase) return URL.createObjectURL(file)
  const ext = file.name.split('.').pop()
  const folder = file.type.startsWith('video') ? 'videos' : 'covers'
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const filePath = `${folder}/${fileName}`
  const { error } = await supabase.storage.from('article-images').upload(filePath, file)
  if (error) throw error
  const { data } = supabase.storage.from('article-images').getPublicUrl(filePath)
  return data.publicUrl
}

export async function getAllArticles() {
  if (isSupabaseConfigured && supabase) {
    const data = await fetchAllPages((from, to) => supabase
      .from('actualites')
      .select(ARTICLE_COLUMNS)
      .order('created_at', { ascending: false })
      .range(from, to), ADMIN_PAGE_SIZE)
    return data.map(mapFromDb)
  }
  return fallbackArticles
}

async function loadPublishedArticles() {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('actualites')
      .select(ARTICLE_COLUMNS)
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(PUBLIC_PAGE_SIZE)

    if (error) throw error
    return (data || []).map(mapFromDb)
  }
  return fallbackArticles
}

export function getPublishedArticles() {
  return getCachedRequest('public:articles', loadPublishedArticles)
}

export async function getArticleBySlug(slug) {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('actualites')
      .select(ARTICLE_COLUMNS)
      .eq('slug', slug)
      .maybeSingle()
    if (error) throw error
    return data ? mapFromDb(data) : null
  }
  return fallbackArticles.find((article) => article.slug === slug) || null
}

export async function createArticle(payload) {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('actualites')
      .insert([mapToDb(payload)])
      .select(ARTICLE_COLUMNS)
      .single()
    if (error) throw error
    invalidateCachedRequests('public:articles')
    return mapFromDb(data)
  }
  return { ...payload, id: `act-${Date.now()}`, created_at: new Date().toISOString() }
}

export async function updateArticle(id, payload) {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('actualites')
      .update(mapToDb(payload))
      .eq('id', id)
      .select(ARTICLE_COLUMNS)
      .single()
    if (error) throw error
    invalidateCachedRequests('public:articles')
    return mapFromDb(data)
  }
  return { id, ...payload }
}

export async function deleteArticle(id) {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from('actualites').delete().eq('id', id)
    if (error) throw error
    invalidateCachedRequests('public:articles')
  }
  return true
}
