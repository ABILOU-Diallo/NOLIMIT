import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { PageBody, PageHero } from '../components/layout/PageHero'
import { Seo } from '../components/layout/Seo'
import { Loader } from '../components/ui/Loader'
import { useAsyncData } from '../hooks/useAsyncData'
import { getPublishedArticles } from '../services/actualiteService'
import { site } from '../data/site'
import { ASYNC } from '../utils/asyncState'
import { useLockBody } from '../hooks/useLockBody'

// Construit la liste complète de medias d'un article avec normalisation
function buildMediaList(article) {
  if (!article) return []
  let gallery = Array.isArray(article.gallery) ? article.gallery : []
  let list = gallery.filter(Boolean).map(m => {
    if (typeof m === 'string') {
      const isVideo = m.match(/\.(mp4|webm|ogg|mov|m4v)$/i) || m.includes('youtube.com') || m.includes('youtu.be')
      return { url: m, type: isVideo ? 'video' : 'image' }
    }
    return m
  })
  if (list.length === 0) {
    if (article.video_url) list.push({ url: article.video_url, type: 'video' })
    if (article.image_url) list.push({ url: article.image_url, type: 'image' })
  }
  return list
}

export function ActualitesPage() {
  const { state, data, error } = useAsyncData(getPublishedArticles, [])
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [mediaIndex, setMediaIndex]       = useState(0)

  useLockBody(selectedIndex !== null)

  const handleNext = useCallback((e) => {
    e?.stopPropagation()
    if (selectedIndex === null || !data) return
    setSelectedIndex(prev => (prev + 1) % data.length)
    setMediaIndex(0)
  }, [selectedIndex, data])

  const handlePrev = useCallback((e) => {
    e?.stopPropagation()
    if (selectedIndex === null || !data) return
    setSelectedIndex(prev => (prev - 1 + data.length) % data.length)
    setMediaIndex(0)
  }, [selectedIndex, data])

  const handleClose = () => {
    setSelectedIndex(null)
    setMediaIndex(0)
  }

  useEffect(() => {
    if (selectedIndex === null) return
    const onKey = (e) => {
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'ArrowLeft')  handlePrev()
      if (e.key === 'Escape')     handleClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedIndex, handleNext, handlePrev])

  const selectedArticle  = selectedIndex !== null ? data[selectedIndex] : null
  const currentMediaList = selectedArticle ? buildMediaList(selectedArticle) : []
  const currentMedia     = currentMediaList[mediaIndex] || null

  function renderLightboxMedia(media, article) {
    if (!media) return null
    const { url, type } = media
    if (type === 'video') {
      const isYT = url.includes('youtube.com') || url.includes('youtu.be')
      if (isYT) {
        const embedUrl = url.includes('embed') ? url : url.replace('watch?v=', 'embed/')
        return (
          <div style={{ width: '100%', maxWidth: '960px', aspectRatio: '16/9', maxHeight: '72vh', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <iframe src={embedUrl} title={article.title} style={{ width: '100%', height: '100%', border: 'none', borderRadius: '12px' }} allowFullScreen />
          </div>
        )
      }
      return <video src={url} controls autoPlay style={{ maxHeight: '72vh', maxWidth: '100%', borderRadius: '10px' }} />
    }
    return <img src={url} alt={article.title} style={{ maxHeight: '72vh', maxWidth: '100%', borderRadius: '8px' }} />
  }

  function renderCardMedia(article) {
    const mediaList = buildMediaList(article)
    const count = mediaList.length
    if (count === 0) return <div style={{ width: '100%', aspectRatio: '16/10', background: 'linear-gradient(135deg,#1e3a8a,#3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><i className="bx bx-news" /></div>
    const renderItem = (media, index, isOverlay = false) => {
      if (!media) return null
      const { url, type } = media
      const isVideo = type === 'video'
      return (
        <div key={index} style={{ position: 'relative', width: '100%', height: '100%', background: '#0b1120', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {isVideo ? <i className="bx bx-play-circle" style={{ fontSize: '3rem', color: '#fff', zIndex: 2 }} /> : <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
          {isOverlay && <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.5rem', fontWeight: 'bold', zIndex: 10 }}>+{count - 2}</div>}
        </div>
      )
    }
    return (
      <div style={{ display: 'grid', gridTemplateColumns: count === 1 ? '1fr' : '1fr 1fr', gap: '2px', width: '100%', aspectRatio: '16/10', overflow: 'hidden' }}>
        {count === 1 ? renderItem(mediaList[0], 0) : <>{renderItem(mediaList[0], 0)}{renderItem(mediaList[1], 1, count > 2)}</>}
      </div>
    )
  }

  return (
    <>
      <Seo
        title="Actualités et Événements du Campus — Groupe NO LIMIT"
        description={`Découvrez les dernières actualités d'ISSMIGA et du CFP NO LIMIT à Yaoundé.`}
        path="/actualites"
      />
      <PageHero
        title="Actualités"
        lede="Toute la vie du campus et les annonces importantes en images et vidéos."
        crumbs={[{ to: '/', label: 'Accueil' }, { label: 'Actualités' }]}
      />
      <PageBody>
        {state === ASYNC.loading ? <Loader /> : null}
        {state === ASYNC.error ? <p role="alert">Erreur de chargement des actualités.</p> : null}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          {data?.map((article, index) => (
            <article key={article.id} onClick={() => setSelectedIndex(index)} style={{ cursor: 'zoom-in', background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
              {renderCardMedia(article)}
              <div style={{ padding: '1.25rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-magenta-600)', fontWeight: 700, textTransform: 'uppercase' }}>{article.category}</span>
                <h2 style={{ fontSize: '1.1rem', margin: '0.5rem 0' }}>{article.title}</h2>
                <p style={{ fontSize: '0.9rem', color: '#64748b' }}>{article.excerpt}</p>
              </div>
            </article>
          ))}
        </div>

        {selectedArticle && (
          <div onClick={handleClose} style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(10px)' }}>
            <button onClick={handleClose} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: '#fff', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', zIndex: 1001 }}>×</button>
            <div onClick={e => e.stopPropagation()} style={{ maxWidth: '1000px', width: '100%', background: '#fff', borderRadius: '20px', overflow: 'hidden' }}>
              <div style={{ background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                {renderLightboxMedia(currentMedia, selectedArticle)}
              </div>
              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                   <div>
                      <h3 style={{ margin: 0 }}>{selectedArticle.title}</h3>
                      <span style={{ color: '#64748b', fontSize: '0.85rem' }}>{selectedArticle.category}</span>
                   </div>
                   <Link to={`/actualites/${selectedArticle.slug}`} onClick={handleClose} style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }}>Détails →</Link>
                </div>
                <p style={{ color: '#334155', lineHeight: '1.6' }}>{selectedArticle.excerpt || selectedArticle.content?.substring(0, 200) + '...'}</p>
              </div>
            </div>
          </div>
        )}
      </PageBody>
    </>
  )
}
