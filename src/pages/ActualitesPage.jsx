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

// Construit la liste complète de medias d'un article
function buildMediaList(article) {
  const gallery = Array.isArray(article.gallery) ? article.gallery : []
  if (gallery.length > 0) return gallery
  const list = []
  if (article.image_url) list.push({ url: article.image_url, type: 'image' })
  if (article.video_url) list.push({ url: article.video_url, type: 'video' })
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
          <iframe
            src={embedUrl}
            title={article.title}
            style={{ width: '100%', height: '100%', border: 'none' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )
      }
      return <video src={url} controls className="lightbox-img" style={{ maxHeight: '80vh', maxWidth: '100%' }} />
    }
    return <img src={url} alt={article.title} className="lightbox-img" />
  }

  function renderCardMedia(article) {
    const mediaList = buildMediaList(article)
    const first = mediaList[0]
    if (!first) {
      return (
        <div style={{ width: '100%', height: '200px', background: 'linear-gradient(135deg,#1e3a8a,#3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '2.5rem' }}>
          <i className="bx bx-news" />
        </div>
      )
    }
    if (first.type === 'video') {
      const isYT = first.url.includes('youtube.com') || first.url.includes('youtu.be')
      return (
        <div style={{ width: '100%', height: '200px', background: '#0f172a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', position: 'relative', overflow: 'hidden' }}>
          {!isYT && <video src={first.url} muted playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} />}
          <i className="bx bx-play-circle" style={{ fontSize: '3.5rem', zIndex: 2 }} />
          <span style={{ zIndex: 2, fontSize: '0.72rem', fontWeight: '700', marginTop: '0.4rem', background: 'rgba(0,0,0,0.5)', padding: '2px 8px', borderRadius: '4px' }}>VIDÉO</span>
          {mediaList.length > 1 && (
            <span style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: '0.68rem', fontWeight: '700', padding: '2px 7px', borderRadius: '4px', backdropFilter: 'blur(4px)' }}>
              +{mediaList.length - 1} médias
            </span>
          )}
        </div>
      )
    }
    return (
      <div style={{ width: '100%', overflow: 'hidden', background: '#f8fafc', position: 'relative' }}>
        <img
          src={first.url}
          alt={article.title}
          style={{ width: '100%', height: '210px', objectFit: 'cover', display: 'block', transition: 'transform 0.4s' }}
        />
        {mediaList.length > 1 && (
          <span style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(15,23,42,0.65)', color: '#fff', fontSize: '0.68rem', fontWeight: '700', padding: '2px 8px', borderRadius: '4px', backdropFilter: 'blur(4px)' }}>
            📸 {mediaList.length}
          </span>
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
              .actu-card:hover img { transform: scale(1.04); }
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
                background: #0f172a; border-radius: 20px; overflow: hidden;
                position: relative; box-shadow: 0 30px 70px -12px rgba(0,0,0,0.8);
                display: flex; flex-direction: column;
              }
              @media(max-width:600px){ .lb-shell{height:96vh;border-radius:14px;} }

              .lb-media-area {
                flex:1; display:flex; align-items:center; justify-content:center;
                overflow:hidden; position:relative;
                transition:filter 0.3s; filter:brightness(0.65);
              }
              .lb-media-area.dimmed { filter:brightness(0.18); }
              .lightbox-img { max-width:100%; max-height:100%; object-fit:contain; display:block; }

              .lb-thumbs {
                display:flex; gap:0.4rem; padding:0.45rem 0.65rem;
                background:rgba(0,0,0,0.55); overflow-x:auto; flex-shrink:0;
                scrollbar-width:thin; scrollbar-color:#475569 transparent;
              }
              .lb-thumb-item {
                width:50px; height:40px; flex-shrink:0; border-radius:6px;
                overflow:hidden; cursor:pointer; opacity:0.45;
                border:2px solid transparent; transition:opacity 0.2s, border-color 0.2s;
              }
              .lb-thumb-item.active { opacity:1; border-color:#3b82f6; }
              .lb-thumb-item img,.lb-thumb-item video{width:100%;height:100%;object-fit:cover;display:block;}

              .lb-details {
                position:absolute; bottom:0; left:0; right:0;
                padding:3.5rem 2rem 1.75rem; color:#fff; z-index:20;
                background:linear-gradient(to top,rgba(0,0,0,0.85) 0%,transparent 100%);
                max-height:42%; display:flex; flex-direction:column;
                justify-content:flex-end; pointer-events:none; transition:max-height 0.3s;
              }
              .lb-details.expanded { max-height:85%; justify-content:flex-start; overflow-y:auto; padding-top:1.5rem; }
              .lb-details * { pointer-events:auto; }
              @media(max-width:600px){ .lb-details{padding:2rem 1rem 1rem;max-height:50%;} }

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
                <span className="tshadow" style={{ color: '#93c5fd', fontWeight: '700', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.2rem', display: 'block' }}>
                  {selectedArticle.category || 'Actualité'}
                </span>
                <h2 className="tshadow" style={{ fontSize: showFullDesc ? '1.4rem' : '1.15rem', color: '#fff', margin: 0, lineHeight: '1.3', fontWeight: '700', transition: 'font-size 0.3s' }}>
                  {selectedArticle.title}
                </h2>
                <div className="tshadow" style={{ marginTop: '0.55rem', color: '#f1f5f9', fontSize: '0.88rem', lineHeight: '1.6' }}>
                  {showFullDesc ? (
                    <div style={{ animation: 'fadeInLb 0.2s ease' }}>
                      <p style={{ marginBottom: '1.25rem', whiteSpace: 'pre-wrap', color: '#fff' }}>
                        {selectedArticle.content || selectedArticle.excerpt}
                      </p>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <button className="lb-voir-plus" style={{ background: 'rgba(71,85,105,0.75)' }} onClick={() => setShowFullDesc(false)}>
                          <i className="bx bx-chevron-down" /> Réduire
                        </button>
                        <Link
                          to={`/actualites/${selectedArticle.slug}`}
                          style={{ color: '#60a5fa', fontWeight: '600', textDecoration: 'none', fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
                        >
                          Page complète <i className="bx bx-link-external" />
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', color: '#e2e8f0', margin: 0 }}>
                        {selectedArticle.excerpt || selectedArticle.content || ''}
                      </p>
                      <button className="lb-voir-plus" onClick={() => setShowFullDesc(true)}>
                        <i className="bx bx-chevron-up" /> Lire la description
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
