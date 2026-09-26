import { useEffect, useMemo, useState } from 'react'
import { Loader } from '../../components/ui/Loader'
import { getAllArticles } from '../../services/actualiteService'
import { getPreinscriptions } from '../../services/preinscriptionService'
import { getUsers } from '../../services/authService'
import { getFormations } from '../../services/formationService'
import { getContacts } from '../../services/contactService'
import { getAllTestimonials } from '../../services/testimonialService'
import { getDashboardSeries, getTopPages } from '../../services/statsService'

export function AdminDashboardPage() {
  const [stats, setStats] = useState(null)
  const [series, setSeries] = useState([])
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    async function load() {
      try {
        const [
          users,
          preinscriptions,
          articles,
          formations,
          contacts,
          testimonials,
          seriesData,
          topPages,
        ] = await Promise.all([
          getUsers(),
          getPreinscriptions(),
          getAllArticles(),
          getFormations(true),
          getContacts(),
          getAllTestimonials(),
          getDashboardSeries(30),
          getTopPages(8),
        ])

        if (!active) return

        setSeries(seriesData)
        setPages(topPages)
        setStats({
          users: users.length,
          preinscriptions: preinscriptions.length,
          pendingPreinscriptions: preinscriptions.filter((item) => item.status === 'new').length,
          articles: articles.length,
          publishedArticles: articles.filter((item) => item.status === 'published').length,
          contacts: contacts.length,
          pendingContacts: contacts.filter((item) => item.status === 'new').length,
        })
      } catch (err) {
        if (!active) return
        setError(err.message || 'Impossible de charger le tableau de bord.')
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    return () => { active = false }
  }, [])

  const totals = useMemo(() => {
    return series.reduce(
      (acc, row) => {
        acc.views += row.views
        acc.users += row.new_users
        acc.preinscriptions += row.new_preinscriptions
        return acc
      },
      { views: 0, users: 0, preinscriptions: 0 },
    )
  }, [series])

  if (loading) return <Loader label="Chargement du tableau de bord" />
  if (error) return <div style={{ padding: '2rem', color: 'red' }}>{error}</div>

  const cards = [
    { label: 'Visites (30 j)', value: totals.views, icon: 'bx-show', color: '#1d4ed8' },
    { label: 'Utilisateurs', value: stats.users, icon: 'bx-group', color: '#166534' },
    { label: 'Préinscriptions', value: stats.preinscriptions, icon: 'bx-clipboard', color: '#c2410c' },
    { label: 'Dossiers en attente', value: stats.pendingPreinscriptions, icon: 'bx-time-five', color: '#a16207' },
    { label: 'Messages', value: stats.contacts, icon: 'bx-envelope', color: '#0369a1' },
    { label: 'Actualités publiées', value: stats.publishedArticles, icon: 'bx-news', color: '#be185d' },
  ]

  return (
    <div style={{ padding: '1.5rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>Tableau de Bord</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        {cards.map((card) => (
          <article key={card.label} style={{ background: '#fff', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ color: card.color, fontSize: '1.5rem' }}><i className={`bx ${card.icon}`} /></div>
              <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 500 }}>{card.label}</div>
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1e293b' }}>{card.value}</div>
          </article>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <section style={{ background: '#fff', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Pages les plus visitées</h2>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {pages.map((page) => (
              <div key={page.path} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ fontSize: '0.9rem', color: '#334155' }}>{page.path}</span>
                <strong style={{ fontSize: '0.9rem' }}>{page.views} vues</strong>
              </div>
            ))}
          </div>
        </section>

        <section style={{ background: '#f8fafc', border: '2px dashed #cbd5e1', padding: '2rem', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <div>
            <i className='bx bx-bar-chart-alt-2' style={{ fontSize: '3rem', color: '#94a3b8', marginBottom: '1rem' }}></i>
            <p style={{ color: '#64748b' }}>Graphiques temporairement désactivés.<br/>Lancez <strong>npm install</strong> pour les réactiver.</p>
          </div>
        </section>
      </div>
    </div>
  )
}
