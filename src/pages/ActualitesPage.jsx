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
import styles from '../components/layout/PageHero.module.css'

// Construit la liste complète de medias d'un article avec normalisation
function buildMediaList(article) {
  if (!article) return []

  // Normalisation de la galerie
  let gallery = Array.isArray(article.gallery) ? article.gallery : []

  // Nettoyage et typage automatique si besoin
  let list = gallery.filter(Boolean).map(m => {
    if (typeof m === 'string') {
      const isVideo = m.match(/\.(mp4|webm|ogg|mov|m4v)$/i) || m.includes('youtube.com') || m.includes('youtu.be')
      return { url: m, type: isVideo ? 'video' : 'image' }
    }
    return m
  })

  // Si la galerie est vide, fallback sur les champs image_url et video_url
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
  const [showFullDesc, setShowFullDesc]   = useState(false)

  useLockBody(selectedIndex !== null)

  const handleNext = useCallback((e) => {
    e?.stopPropagation()
    if (selectedIndex === null || !data) return
    setSelectedIndex(prev => (prev + 1) % data.length)
    setMediaIndex(0)
    setShowFullDesc(false)
  }, [selectedIndex, data])

  const handlePrev = useCallback((e) => {
    e?.stopPropagation()
    if (selectedIndex === null || !data) return
    setSelectedIndex(prev => (prev - 1 + data.length) % data.length)
    setMediaIndex(0)
    setShowFullDesc(false)
  }, [selectedIndex, data])

  const handleClose = () => {
    setSelectedIndex(null)
    setMediaIndex(0)
    setShowFullDesc(false)
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
            <iframe
              src={embedUrl}
              title={article.title}
              style={{ width: '100%', height: '100%', border: 'none', borderRadius: '12px' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )
      }
      return (
        <video
          src={url}
          controls
          autoPlay
          className="lightbox-img"
          style={{ maxHeight: '72vh', maxWidth: '100%', width: 'auto', height: 'auto', objectFit: 'contain', borderRadius: '10px' }}
        />
      )
    }
    return (
      <img
        src={url}
        alt={article.title}
        className="lightbox-img"
        style={{ maxHeight: '72vh', maxWidth: '100%', width: 'auto', height: 'auto', objectFit: 'contain', display: 'block', borderRadius: '8px' }}
      />
    )
  }

  function renderCardMedia(article) {
    const mediaList = buildMediaList(article)
    const count = mediaList.length

    if (count === 0) {
      return (
        <div style={{ width: '100%', aspectRatio: '16/10', minHeight: '200px', background: 'linear-gradient(135deg,#1e3a8a,#3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '2.5rem' }}>
          <i className="bx bx-news" />
        </div>
      )
    }

    const renderItem = (media, index, isOverlay = false) => {
      if (!media) return null
      const { url, type } = media
      const isVideo = type === 'video'
      const isYT = isVideo && (url.includes('youtube.com') || url.includes('youtu.be'))

      return (
        <div key={index} style={{ position: 'relative', width: '100%', height: '100%', background: '#0b1120', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {isVideo ? (
            <>
              {!isYT && (
                <video
                  src={url}
                  muted
                  playsInline
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                />
              )}
              <i className="bx bx-play-circle" style={{ fontSize: count === 1 ? '3.6rem' : '2.4rem', zIndex: 2, color: '#fff', filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.6))' }} />
              {!isOverlay && (
                <span style={{ position: 'absolute', bottom: 10, right: 10, zIndex: 2, fontSize: '0.65rem', fontWeight: '700', background: 'rgba(0,0,0,0.65)', color: '#fff', padding: '2px 6px', borderRadius: '4px' }}>VIDÉO</span>
              )}
            </>
          ) : (
            <>
              <img
                src={url}
                alt=""
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(10px) brightness(0.5)', transform: 'scale(1.1)' }}
              />
              <img
                src={url}
                alt={article.title}
                style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'relative', zIndex: 1 }}
              />
            </>
          )}
          {isOverlay && (
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.8rem', fontWeight: '700', zIndex: 10, backdropFilter: 'blur(3px)' }}>
              +{count - 2}
            </div>
          )}
        </div>
      )
    }

    return (
      <div style={{ display: 'grid', gridTemplateColumns: count === 1 ? '1fr' : '1fr 1fr', gap: '2px', width: '100%', aspectRatio: '16/10', background: '#f8fafc', overflow: 'hidden' }}>
        {count === 1 ? renderItem(mediaList[0], 0) : (
          <>
            {renderItem(mediaList[0], 0)}
            {renderItem(mediaList[1], 1, count > 2)}
          </>
        )}
      </div>
    )
  }

  return (
    <>
      <Seo
        title="Actualités"
        description={`Annonces et informations du ${site.name}.`}
        path="/actualites"
      />
      <PageHero
        title="Actualités"
        lede="Retrouvez ici toute la vie du campus, les événements et les annonces importantes en images et vidéos."
        crumbs={[{ to: '/', label: 'Accueil' }, { label: 'Actualités' }]}
      />
      <PageBody>
        {state === ASYNC.loading ? <Loader /> : null}
        {state === ASYNC.error ? (
          <p role="alert" style={{ color: '#dc2626', padding: '1rem', background: '#fef2f2', borderRadius: '8px' }}>
            Les actualités n'ont pas pu être chargées. Réessayez plus tard.
          </p>
        ) : null}
        {(state === ASYNC.empty || (state === ASYNC.success && !data?.length)) ? (
          <p className={styles.todo}>
            Aucune actualité publiée pour le moment. La rentrée est prévue le {site.rentree.date}.
          </p>
        ) : null}

        {data?.length ? (
          <>
            <style>{`
              .actu-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
                gap: 1.75rem; padding: 0.5rem 0 1.5rem;
              }
              @media (max-width: 640px) { .actu-grid { grid-template-columns: 1fr; gap: 1.25rem; } }
              .actu-card {
                background: #fff; border-radius: 14px; overflow: hidden;
                box-shadow: 0 4px 6px -1px rgba(0,0,0,0.08); border: 1px solid #f1f5f9;
                display: flex; flex-direction: column;
                transition: transform 0.22s, box-shadow 0.22s; cursor: zoom-in;
              }
              .actu-card:hover { transform: translateY(-5px); box-shadow: 0 14px 28px -8px rgba(0,0,0,0.13); }
              .actu-card:hover img { transform: scale(1.02); }
            `}</style>
            <div className="actu-grid">
              {data.map((article, index) => (
                <article
                  key={article.id}
                  className="actu-card"
                  onClick={() => { setSelectedIndex(index); setMediaIndex(0) }}
                >
                  {renderCardMedia(article)}
                  <div style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <span style={{ alignSelf: 'flex-start', background: '#eff6ff', color: '#1d4ed8', fontSize: '0.7rem', fontWeight: '700', padding: '0.2rem 0.65rem', borderRadius: '999px', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                      {article.category || 'Actualité'}
                    </span>
                    <h2 style={{ fontSize: '1.02rem', fontWeight: '700', color: '#0f172a', lineHeight: '1.4', margin: '0 0 0.4rem' }}>
                      {article.title}
                    </h2>
                    <p style={{ color: '#64748b', fontSize: '0.87rem', lineHeight: '1.55', marginBottom: '1rem', flexGrow: 1 }}>
                      {article.excerpt || (article.content ? article.content.substring(0, 100) + '…' : '')}
                    </p>
                    <span style={{ color: '#2563eb', fontWeight: '600', fontSize: '0.84rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', marginTop: 'auto' }}>
                      Voir {buildMediaList(article)[0]?.type === 'video' ? 'la vidéo' : "l'annonce"}
                      <i className="bx bx-expand-alt" style={{ fontSize: '1rem' }} />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : null}

        {/* ═══════ LIGHTBOX ═══════ */}
        {selectedArticle && (
          <div
            onClick={handleClose}
            style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(15,23,42,0.97)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.75rem', backdropFilter: 'blur(12px)', animation: 'fadeInLb 0.22s ease' }}
          >
            <style>{`
              @keyframes fadeInLb { from{opacity:0} to{opacity:1} }

              .lb-shell {
                max-width: 1080px; width: 100%; height: 92vh;
                background: #0b1120; border-radius: 20px; overflow: hidden;
                position: relative; box-shadow: 0 30px 70px -12px rgba(0,0,0,0.85);
                display: flex; flex-direction: column;
              }
              @media(max-width:600px){ .lb-shell{height:96vh;border-radius:14px;} }

              .lb-media-area {
                flex:1; display:flex; align-items:center; justify-content:center;
                overflow:hidden; position:relative;
                padding: clamp(2.6rem, 5vh, 3.6rem) clamp(0.75rem, 2vw, 1.5rem) 0.5rem;
                background: #020617;
                transition: filter 0.3s;
              }
              .lb-media-area.dimmed { filter:brightness(0.2); }
              .lightbox-img { max-width:100%; max-height:100%; width:auto; height:auto; object-fit:contain; object-position:center; display:block; }

              .lb-thumbs {
                display:flex; gap:0.4rem; padding:0.45rem 0.65rem;
                background:rgba(0,0,0,0.65); overflow-x:auto; flex-shrink:0;
                scrollbar-width:thin; scrollbar-color:#475569 transparent;
              }
              .lb-thumb-item {
                width:52px; height:42px; flex-shrink:0; border-radius:6px;
                overflow:hidden; cursor:pointer; opacity:0.5;
                border:2px solid transparent; transition:opacity 0.2s, border-color 0.2s;
              }
              .lb-thumb-item.active { opacity:1; border-color:#3b82f6; }
              .lb-thumb-item img,.lb-thumb-item video{width:100%;height:100%;object-fit:cover;display:block;}

              .lb-details {
                position:relative;
                padding: 1rem 1.5rem 1.25rem; color:#fff; z-index:20;
                background: #0b1120;
                border-top: 1px solid rgba(255,255,255,0.08);
                display:flex; flex-direction:column;
                transition: max-height 0.3s;
              }
              .lb-details.expanded { max-height:60vh; overflow-y:auto; }
              @media(max-width:600px){ .lb-details{padding:0.85rem 1rem 1rem;} }

              .lb-nav {
                position:absolute; top:50%; transform:translateY(-50%);
                background:rgba(255,255,255,0.1); color:#fff; border:none;
                width:44px; height:44px; border-radius:50%; cursor:pointer;
                display:flex; align-items:center; justify-content:center;
                font-size:1.8rem; transition:background 0.2s,transform 0.2s; z-index:30;
              }
              .lb-nav:hover{background:rgba(255,255,255,0.22);transform:translateY(-50%) scale(1.08);}
              @media(max-width:600px){.lb-nav{width:36px;height:36px;font-size:1.4rem;}}

              .lb-close {
                position:absolute; top:1rem; right:1rem; z-index:40;
                background:rgba(255,255,255,0.9); border:none; color:#0f172a;
                width:38px; height:38px; border-radius:50%; cursor:pointer;
                display:flex; align-items:center; justify-content:center; font-size:1.5rem;
                box-shadow:0 4px 12px rgba(0,0,0,0.25); transition:transform 0.2s;
              }
              .lb-close:hover{transform:scale(1.08);}

              .lb-voir-plus {
                background:rgba(37,99,235,0.85); color:#fff; border:none;
                padding:0.42rem 1.05rem; border-radius:999px; font-weight:600;
                font-size:0.8rem; cursor:pointer; display:inline-flex;
                align-items:center; gap:0.3rem; transition:background 0.2s,transform 0.2s;
                margin-top:0.55rem; align-self:flex-start;
                box-shadow:0 4px 12px rgba(0,0,0,0.3);
              }
              .lb-voir-plus:hover{background:#2563eb;transform:translateY(-1px);}

              .lb-counter {
                position:absolute; top:1rem; left:50%; transform:translateX(-50%);
                background:rgba(0,0,0,0.5); color:#fff; font-size:0.7rem; font-weight:700;
                padding:3px 10px; border-radius:999px; z-index:40; backdrop-filter:blur(4px); pointer-events:none;
              }
              .tshadow { text-shadow:0 2px 4px rgba(0,0,0,0.9),0 4px 12px rgba(0,0,0,0.7); }
            `}</style>

            <button className="lb-close" onClick={handleClose} aria-label="Fermer">
              <i className="bx bx-x" />
            </button>

            {data.length > 1 && <>
              <button className="lb-nav" style={{ left: '0.4rem' }} onClick={handlePrev} aria-label="Précédent">
                <i className="bx bx-chevron-left" />
              </button>
              <button className="lb-nav" style={{ right: '0.4rem' }} onClick={handleNext} aria-label="Suivant">
                <i className="bx bx-chevron-right" />
              </button>
            </>}

            <div className="lb-shell" onClick={e => e.stopPropagation()}>
              {currentMediaList.length > 1 && (
                <div className="lb-counter">{mediaIndex + 1} / {currentMediaList.length}</div>
              )}

              <div className={`lb-media-area ${showFullDesc ? 'dimmed' : ''}`}>
                {renderLightboxMedia(currentMedia, selectedArticle)}
              </div>

              {currentMediaList.length > 1 && (
                <div className="lb-thumbs">
                  {currentMediaList.map((m, i) => (
                    <div
                      key={i}
                      className={`lb-thumb-item ${i === mediaIndex ? 'active' : ''}`}
                      onClick={() => setMediaIndex(i)}
                    >
                      {m.type === 'video'
                        ? <video src={m.url} muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        : <img src={m.url} alt={`media ${i + 1}`} />
                      }
                    </div>
                  ))}
                </div>
              )}

              <div className={`lb-details ${showFullDesc ? 'expanded' : ''}`}>
                <span style={{ color: '#93c5fd', fontWeight: '700', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem', display: 'block' }}>
                  {selectedArticle.category || 'Actualité'}
                </span>
                <h2 style={{ fontSize: showFullDesc ? '1.3rem' : '1.1rem', color: '#fff', margin: 0, lineHeight: '1.3', fontWeight: '700', transition: 'font-size 0.3s' }}>
                  {selectedArticle.title}
                </h2>
                <div style={{ marginTop: '0.5rem', color: '#cbd5e1', fontSize: '0.87rem', lineHeight: '1.6' }}>
                  {showFullDesc ? (
                    <div style={{ animation: 'fadeInLb 0.2s ease' }}>
                      <p style={{ marginBottom: '1.1rem', whiteSpace: 'pre-wrap', color: '#e2e8f0' }}>
                        {selectedArticle.content || selectedArticle.excerpt}
                      </p>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <button className="lb-voir-plus" style={{ background: 'rgba(71,85,105,0.85)' }} onClick={() => setShowFullDesc(false)}>
                          <i className="bx bx-chevron-up" /> Réduire
                        </button>
                        <Link
                          to={`/actualites/${selectedArticle.slug}`}
                          style={{ color: '#60a5fa', fontWeight: '600', textDecoration: 'none', fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                        >
                          Page complète <i className="bx bx-link-external" />
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>
                        {selectedArticle.excerpt || selectedArticle.content || ''}
                      </p>
                      <button className="lb-voir-plus" onClick={() => setShowFullDesc(true)}>
                        <i className="bx bx-chevron-down" /> Lire la description
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </PageBody>
    </>
  )
}
