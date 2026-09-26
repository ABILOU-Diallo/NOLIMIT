import { useParams, Link } from 'react-router-dom'
import { PageBody, PageHero } from '../components/layout/PageHero'
import { Seo } from '../components/layout/Seo'
import { Loader } from '../components/ui/Loader'
import { useAsyncData } from '../hooks/useAsyncData'
import { getArticleBySlug } from '../services/actualiteService'
import { site } from '../data/site'
import { ASYNC } from '../utils/asyncState'

export function ActualiteDetailPage() {
  const { slug } = useParams()
  const { state, data: article } = useAsyncData(() => getArticleBySlug(slug), [slug])

  if (state === ASYNC.loading) return <Loader label="Chargement de l'article" />

  if (!article) {
    return (
      <PageBody>
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <h2 style={{ fontSize: '2rem', color: '#1e293b' }}>Article introuvable</h2>
          <p style={{ color: '#64748b', marginBottom: '2rem' }}>L'actualité que vous recherchez n'existe pas ou a été déplacée.</p>
          <Link to="/actualites" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'var(--primary)',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '999px',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}>
            <i className="bx bx-left-arrow-alt" /> Retour aux actualités
          </Link>
        </div>
      </PageBody>
    )
  }

  function renderMedia() {
    const elements = []

    if (article.video_url) {
      const url = article.video_url
      const isYT = url.includes('youtube.com') || url.includes('youtu.be')

      if (isYT) {
        const embedUrl = url.includes('embed') ? url : url.replace('watch?v=', 'embed/')
        elements.push(
          <div key="video" style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '16px', marginBottom: '2rem', background: '#000', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
            <iframe
              src={embedUrl}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )
      } else {
        elements.push(
          <video
            key="video"
            src={url}
            controls
            style={{ width: '100%', borderRadius: '16px', marginBottom: '2rem', background: '#000', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
          />
        )
      }
    }

    if (article.image_url && (!article.video_url || elements.length === 0)) {
      elements.push(
        <img
          key="image"
          src={article.image_url}
          alt={article.title}
          style={{ width: '100%', maxHeight: '600px', objectFit: 'cover', borderRadius: '16px', marginBottom: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
        />
      )
    }

    return elements
  }

  return (
    <>
      <Seo title={article.title} description={article.excerpt} path={`/actualites/${slug}`} />
      <PageHero
        title={article.title}
        lede={article.category || 'Actualité'}
        crumbs={[
          { to: '/', label: 'Accueil' },
          { to: '/actualites', label: 'Actualités' },
          { label: article.title }
        ]}
      />
      <PageBody>
        <article style={{ maxWidth: '900px', margin: '0 auto' }}>
          {renderMedia()}

          <div style={{
            fontSize: '1.25rem',
            lineHeight: '1.8',
            color: '#334155',
            whiteSpace: 'pre-wrap',
            padding: '1rem 0'
          }}>
            {article.content}
          </div>

          <footer style={{ marginTop: '4rem', borderTop: '1px solid #e2e8f0', paddingTop: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
              <Link to="/actualites" style={{ color: 'var(--primary)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', fontSize: '1.1rem' }}>
                <i className="bx bx-chevron-left" style={{ fontSize: '1.6rem' }} /> Toutes les actualités
              </Link>

              {article.published_at && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8' }}>
                  <i className="bx bx-calendar" />
                  <span>Publié le {new Date(article.published_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
              )}
            </div>
          </footer>
        </article>
      </PageBody>
    </>
  )
}
