import { supabase, isSupabaseConfigured } from '../lib/supabase'

const LOCAL_ACTUALITES_KEY = 'issmiga_actualites_v1'

const initialNews = [
  {
    id: 'act-1',
    title: 'Offre Spéciale Rentrée 2026 : Un Laptop Offert à Chaque Étudiant Inscrit à ISSMIGA !',
    slug: 'offre-laptop-gratuit-rentree-2026',
    category: 'Vie du campus',
    excerpt: 'Dans le cadre du programme d’excellence et de transformation digitale, tout étudiant inscrit à ISSMIGA reçoit un ordinateur portable professionnel offert.',
    content: `L’administration d’ISSMIGA et du Groupe NO LIMIT est heureuse d’annoncer le maintien de l’offre exceptionnelle "Un Étudiant inscrit = Un Laptop offert gratuitement" pour la rentrée d’octobre 2026.

Cette initiative majeure vise à garantir à chaque apprenant un accès autonome et fluide aux outils informatiques modernes dès le premier jour de cours.

Les ordinateurs sont remis aux étudiants lors des premières semaines de cours après validation définitive du dossier académique au campus d'Emana.`,
    image_url: '/og-image.jpeg',
    status: 'published',
    author_name: 'Administration Groupe NO LIMIT',
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
  },
  {
    id: 'act-2',
    title: 'Cérémonie de remise des diplômes CQP & DQP de la promotion précédente',
    slug: 'remise-diplomes-cqp-dqp-promotion',
    category: 'Événements',
    excerpt: 'Plus de 150 étudiants et apprenants ont célébré la fin de leur parcours de formation professionnelle au campus d’Emana.',
    content: `La cérémonie annuelle de remise des diplômes s’est tenue au sein du campus ISSMIGA à Yaoundé. En présence du promoteur Dr Orly Tantchou, des enseignants et des familles, les lauréats ont reçu leurs parchemins CQP et DQP agréés par le MINEFOP.

Le taux d'insertion professionnelle de cette promotion franchit un cap historique avec 85% d'embauche et de création de projets dans les 6 mois suivant la formation.`,
    image_url: '/og-image.jpeg',
    status: 'published',
    author_name: 'Direction de la Formation',
    published_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'act-3',
    title: 'Ouverture des préinscriptions pour le cycle BTS, Licence et Master 2026-2027',
    slug: 'ouverture-preinscriptions-bts-licence-master',
    category: 'Admissions',
    excerpt: 'Les candidats au cycle supérieur ISSMIGA et aux formations professionnelles CFP NO LIMIT peuvent dès maintenant remplir leur dossier en ligne.',
    content: `Le Groupe NO LIMIT informe les élèves de terminale, bacheliers et professionnels que les candidatures pour l’année académique 2026-2027 sont officiellement ouvertes.

Les cours débuteront le 5 octobre 2026 pour les filières ISSMIGA et le 15 octobre 2026 pour le CFP NO LIMIT.`,
    image_url: '/og-image.jpeg',
    status: 'published',
    author_name: 'Secrétariat Académique',
    published_at: new Date(Date.now() - 86400000 * 7).toISOString(),
    created_at: new Date(Date.now() - 86400000 * 7).toISOString(),
  },
]

function getLocalArticles() {
  try {
    const raw = localStorage.getItem(LOCAL_ACTUALITES_KEY)
    if (!raw) {
      localStorage.setItem(LOCAL_ACTUALITES_KEY, JSON.stringify(initialNews))
      return initialNews
    }
    return JSON.parse(raw)
  } catch {
    return initialNews
  }
}

function setLocalArticles(list) {
  try {
    localStorage.setItem(LOCAL_ACTUALITES_KEY, JSON.stringify(list))
    notifyListeners()
  } catch {
    // Ignore storage write errors
  }
}

const listeners = new Set()

function notifyListeners() {
  listeners.forEach((fn) => fn())
}

export function subscribeToActualites(callback) {
  if (isSupabaseConfigured) {
    const channel = supabase
      .channel('public:actualites')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'actualites' },
        () => {
          callback()
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }

  listeners.add(callback)
  return () => {
    listeners.delete(callback)
  }
}

export async function getPublishedArticles() {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('actualites')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false })

    if (!error && data?.length) return data
  }

  return getLocalArticles().filter((item) => item.status === 'published')
}

export async function getAllArticles() {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('actualites')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) return data
  }

  return getLocalArticles()
}

export async function getArticleBySlug(slug) {
  const articles = await getPublishedArticles()
  return articles.find((item) => item.slug === slug) ?? null
}

export async function createArticle(payload) {
  const slug = payload.slug || payload.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('actualites')
      .insert({
        title: payload.title,
        slug,
        category: payload.category || 'Vie du campus',
        excerpt: payload.excerpt,
        content: payload.content,
        image_url: payload.image_url || '/og-image.jpeg',
        status: payload.status || 'published',
        published_at: payload.status === 'published' ? new Date().toISOString() : null,
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  const list = getLocalArticles()
  const newArticle = {
    id: `act-${Date.now()}`,
    title: payload.title,
    slug,
    category: payload.category || 'Vie du campus',
    excerpt: payload.excerpt,
    content: payload.content,
    image_url: payload.image_url || '/og-image.jpeg',
    status: payload.status || 'published',
    author_name: payload.author_name || 'Administration Groupe NO LIMIT',
    published_at: payload.status === 'published' ? new Date().toISOString() : null,
    created_at: new Date().toISOString(),
  }

  const updated = [newArticle, ...list]
  setLocalArticles(updated)
  return newArticle
}

export async function updateArticle(id, payload) {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('actualites')
      .update({
        ...payload,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  const list = getLocalArticles()
  const updated = list.map((item) =>
    item.id === id ? { ...item, ...payload, updated_at: new Date().toISOString() } : item,
  )
  setLocalArticles(updated)
  return updated.find((item) => item.id === id)
}

export async function deleteArticle(id) {
  if (isSupabaseConfigured) {
    const { error } = await supabase.from('actualites').delete().eq('id', id)
    if (error) throw error
    return true
  }

  const list = getLocalArticles()
  const updated = list.filter((item) => item.id !== id)
  setLocalArticles(updated)
  return true
}
