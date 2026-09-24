import { useEffect, useMemo, useState } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Loader } from '../../components/ui/Loader'
import { getAllArticles } from '../../services/actualiteService'
import { getPreinscriptions } from '../../services/preinscriptionService'
import { getUsers } from '../../services/authService'
import { getFormations } from '../../services/formationService'
import { getContacts } from '../../services/contactService'
import { getAllTestimonials } from '../../services/testimonialService'
import { getAllComments } from '../../services/commentService'
import { getDashboardSeries, getTopPages } from '../../services/statsService'

const PIE_COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#8b5cf6']

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
          comments,
          seriesData,
          topPages,
        ] = await Promise.all([
          getUsers({ hideOwner: true }),
          getPreinscriptions(),
          getAllArticles(),
          getFormations(true),
          getContacts(),
          getAllTestimonials(),
          getAllComments().catch(() => []),
          getDashboardSeries(30),
          getTopPages(8),
        ])

        if (!active) return

        setSeries(seriesData)
        setPages(topPages)
        setStats({
          users: users.length,
          activeUsers: users.filter((user) => user.is_active !== false).length,
          preinscriptions: preinscriptions.length,
          pendingPreinscriptions: preinscriptions.filter((item) => item.status === 'new').length,
          articles: articles.length,
          publishedArticles: articles.filter((item) => item.status === 'published').length,
          formations: formations.length,
          publishedFormations: formations.filter((item) => item.isPublished || item.is_published).length,
          contacts: contacts.length,
          pendingContacts: contacts.filter((item) => item.status === 'new').length,
          testimonials: testimonials.length,
          approvedTestimonials: testimonials.filter((item) => item.is_approved).length,
          comments: comments.length,
          blockedComments: comments.filter((item) => item.is_blocked).length,
        })
      } catch (err) {
        if (!active) return
        setError(err.message || 'Impossible de charger le tableau de bord.')
      } finally {
        if (active) setLoading(false)
      }
    }

    load()
    return () => {
      active = false
    }
  }, [])

  const totals = useMemo(() => {
    return series.reduce(
      (acc, row) => {
        acc.views += row.views
        acc.sessions += row.unique_sessions
        acc.users += row.new_users
        acc.preinscriptions += row.new_preinscriptions
        acc.contacts += row.new_contacts
        return acc
      },
      { views: 0, sessions: 0, users: 0, preinscriptions: 0, contacts: 0 },
    )
  }, [series])

  const last7 = series.slice(-7)
  const prev7 = series.slice(-14, -7)
  const deltaViews = last7.reduce((sum, row) => sum + row.views, 0) - prev7.reduce((sum, row) => sum + row.views, 0)

  const mix = [
    { name: 'Visites', value: totals.views },
    { name: 'Inscriptions', value: totals.users },
    { name: 'Préinscriptions', value: totals.preinscriptions },
    { name: 'Messages', value: totals.contacts },
  ]

  if (loading) return <Loader label="Chargement du tableau de bord" />
  if (error) return <p className="admin-alert error" role="alert">{error}</p>

  const cards = [
    { label: 'Visites (30 j)', value: totals.views, icon: 'bx-show', bg: '#dbeafe', color: '#1d4ed8', delta: deltaViews },
    { label: 'Sessions uniques', value: totals.sessions, icon: 'bx-pulse', bg: '#ede9fe', color: '#6d28d9' },
    { label: 'Utilisateurs', value: stats.users, icon: 'bx-group', bg: '#dcfce7', color: '#166534' },
    { label: 'Préinscriptions', value: stats.preinscriptions, icon: 'bx-clipboard', bg: '#ffedd5', color: '#c2410c' },
    { label: 'Dossiers en attente', value: stats.pendingPreinscriptions, icon: 'bx-time-five', bg: '#fef9c3', color: '#a16207' },
    { label: 'Messages', value: stats.contacts, icon: 'bx-envelope', bg: '#e0f2fe', color: '#0369a1' },
    { label: 'Actualités', value: stats.publishedArticles, icon: 'bx-news', bg: '#fce7f3', color: '#be185d' },
    { label: 'Commentaires bloqués', value: stats.blockedComments, icon: 'bx-block', bg: '#fee2e2', color: '#b91c1c' },
  ]

  return (
    <div>
      <div className="stats-grid">
        {cards.map((card) => (
          <article key={card.label} className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-icon" style={{ background: card.bg, color: card.color }}>
                <i className={`bx ${card.icon}`} />
              </div>
              {typeof card.delta === 'number' ? (
                <span className={`stat-card-delta ${card.delta >= 0 ? 'positive' : 'negative'}`}>
                  {card.delta >= 0 ? '+' : ''}{card.delta} / 7 j
                </span>
              ) : null}
            </div>
            <div className="stat-card-value">{card.value}</div>
            <div className="stat-card-label">{card.label}</div>
          </article>
        ))}
      </div>

      <div className="charts-grid">
        <section className="chart-card">
          <div className="chart-card-header">
            <div>
              <div className="chart-card-title">Trafic du site</div>
              <div className="chart-card-subtitle">Visites et sessions uniques sur 30 jours</div>
            </div>
          </div>
          <div style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={series}>
                <defs>
                  <linearGradient id="viewsFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.28} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="views" name="Visites" stroke="#3b82f6" fill="url(#viewsFill)" />
                <Area type="monotone" dataKey="unique_sessions" name="Sessions" stroke="#8b5cf6" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="chart-card">
          <div className="chart-card-header">
            <div>
              <div className="chart-card-title">Conversions</div>
              <div className="chart-card-subtitle">Inscriptions, préinscriptions et messages</div>
            </div>
          </div>
          <div style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={series}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="new_users" name="Inscriptions" fill="#22c55e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="new_preinscriptions" name="Préinscriptions" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="new_contacts" name="Contacts" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <div className="charts-grid">
        <section className="chart-card">
          <div className="chart-card-header">
            <div>
              <div className="chart-card-title">Répartition 30 jours</div>
              <div className="chart-card-subtitle">Volume global des interactions</div>
            </div>
          </div>
          <div style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={mix} dataKey="value" nameKey="name" innerRadius={58} outerRadius={90} paddingAngle={3}>
                  {mix.map((entry, index) => (
                    <Cell key={entry.name} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="chart-card">
          <div className="chart-card-header">
            <div>
              <div className="chart-card-title">Pages les plus visitées</div>
              <div className="chart-card-subtitle">30 derniers jours</div>
            </div>
          </div>
          <div style={{ display: 'grid', gap: '0.7rem' }}>
            {pages.map((page) => (
              <div key={page.path} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                <span style={{ color: '#334155', fontWeight: 600 }}>{page.path}</span>
                <strong>{page.views}</strong>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
