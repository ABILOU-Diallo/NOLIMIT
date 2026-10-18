import { useParams, Link } from 'react-router-dom'
import { PageBody, PageHero } from '../components/layout/PageHero'
import { Seo } from '../components/layout/Seo'
import { Loader } from '../components/ui/Loader'
import { useAsyncData } from '../hooks/useAsyncData'
import { getArticleBySlug } from '../services/actualiteService'
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
          <p style={{ color: '#64748b', marginBottom: '2rem' }}>L'actualité que vous recherchez n'existe pas.</p>
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

  function renderMediaItem(item, index, total, isOverlay = false) {
    const url = item?.url || item
    if (!url) return null

    const type = item?.type || (url.includes('youtube.com') || url.includes('youtu.be') ? 'video' : 'image')
    const isVideo = type === 'video'

    const containerStyle = {
      position: 'relative',
      width: '100%',
      height: '100%',
      background: '#0f172a',
      overflow: 'hidden',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }

    const mediaStyle = {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }

    const renderContent = () => {
      if (isVideo) {
        const isYT = url.includes('youtube.com') || url.includes('youtu.be')
        if (isYT) {
          const embedUrl = url.includes('embed') ? url : url.replace('watch?v=', 'embed/')
          return (
            <iframe
              src={embedUrl}
              style={{ border: 'none', width: '100%', height: '100%' }}
              allowFullScreen
              title="Video"
            />
          )
        }
        return <video src={url} controls={!isOverlay} muted={isOverlay} style={mediaStyle} />
      }
      return <img src={url} alt="" style={mediaStyle} />
    }

    return (
      <div key={index} style={containerStyle}>
        {renderContent()}
        {isOverlay && (
          <div style={{
            position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: '2.5rem', fontWeight: 'bold', zIndex: 10,
            backdropFilter: 'blur(4px)'
          }}>
            +{total - 2}
          </div>
        )}
      </div>
    )
  }

  function renderFacebookGrid() {
    let mediaList = []

    if (Array.isArray(article.gallery) && article.gallery.length > 0) {
      mediaList = article.gallery
    } else {
      if (article.video_url) mediaList.push({ url: article.video_url, type: 'video' })
      if (article.image_url) mediaList.push({ url: article.image_url, type: 'image' })
    }

    if (mediaList.length === 0) return null
    const count = mediaList.length

    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: count === 1 ? '1fr' : '1fr 1fr',
        gap: '4px',
        height: count === 1 ? 'auto' : '450px',
        borderRadius: '16px',
        overflow: 'hidden',
        marginBottom: '2.5rem',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        background: '#0f172a'
      }}>
        {count === 1 ? (
          <div style={{ width: '100%', minHeight: '300px' }}>
             {renderMediaItem(mediaList[0], 0, 1)}
          </div>
        ) : (
          <>
            {renderMediaItem(mediaList[0], 0, count)}
            {renderMediaItem(mediaList[1], 1, count, count > 2)}
          </>
        )}
      </div>
    )
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

          {renderFacebookGrid()}

          <div style={{
            fontSize: '1.2rem',
            lineHeight: '1.8',
            color: '#334155',
            whiteSpace: 'pre-wrap',
            padding: '1rem 0'
          }}>
            {article.content}
          </div>

          <footer style={{ marginTop: '4rem', borderTop: '1px solid #e2e8f0', paddingTop: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
              <Link to="/actualites" style={{ color: 'var(--primary)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                <i className="bx bx-chevron-left" /> Toutes les actualités
              </Link>
              {article.published_at && (
                <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                  Publié le {new Date(article.published_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
              )}
            </div>
          </footer>
        </article>
      </PageBody>
    </>
  )
}
