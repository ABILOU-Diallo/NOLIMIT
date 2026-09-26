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

export function ActualitesPage() {
  const { state, data, error } = useAsyncData(getPublishedArticles, [])
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [showFullDesc, setShowFullDesc] = useState(false)

  // Verrouiller le scroll quand la lightbox est ouverte
  useLockBody(selectedIndex !== null)

  const handleNext = useCallback((e) => {
    e?.stopPropagation()
    if (selectedIndex === null || !data) return
    setSelectedIndex((prev) => (prev + 1) % data.length)
    setShowFullDesc(false)
  }, [selectedIndex, data])

  const handlePrev = useCallback((e) => {
    e?.stopPropagation()
    if (selectedIndex === null || !data) return
    setSelectedIndex((prev) => (prev - 1 + data.length) % data.length)
    setShowFullDesc(false)
  }, [selectedIndex, data])

  const handleClose = () => {
    setSelectedIndex(null)
    setShowFullDesc(false)
  }

  // Navigation au clavier
  useEffect(() => {
    if (selectedIndex === null) return
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex, handleNext, handlePrev])

  const selectedArticle = selectedIndex !== null ? data[selectedIndex] : null

  function renderMedia(article, isLightbox = false) {
    const hasVideo = Boolean(article.video_url)
    const hasImage = Boolean(article.image_url)

    if (hasVideo) {
      const url = article.video_url
      const isYT = url.includes('youtube.com') || url.includes('youtu.be')

      if (isLightbox) {
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
        return (
          <video
            src={url}
            controls
            className="lightbox-img"
            style={{ maxHeight: '80vh', maxWidth: '100%' }}
          />
        )
      }

      // Preview in grid
      return (
        <div style={{
          width: '100%',
          height: '200px',
          background: '#0f172a',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {hasImage && (
            <img
              src={article.image_url}
              alt=""
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}
            />
          )}
          <i className="bx bx-play-circle" style={{ fontSize: '4rem', zIndex: 2 }} />
          <span style={{ zIndex: 2, fontSize: '0.8rem', fontWeight: 'bold', marginTop: '0.5rem', background: 'rgba(0,0,0,0.5)', padding: '2px 8px', borderRadius: '4px' }}>
            VIDÉO
          </span>
        </div>
      )
    }

    if (hasImage) {
      return (
        <div style={{
          width: '100%',
          background: '#f8fafc',
          borderBottom: isLightbox ? 'none' : '1px solid #f1f5f9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          height: isLightbox ? '100%' : 'auto'
        }}>
          <img
            src={article.image_url}
            alt={article.title}
            className={isLightbox ? "lightbox-img" : ""}
            style={isLightbox ? {} : {
              width: '100%',
              height: 'auto',
              maxHeight: '240px',
              objectFit: 'contain',
              display: 'block'
            }}
          />
        </div>
      )
    }

    return (
      <div style={{
        width: '100%',
        height: '160px',
        background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        fontSize: '2.5rem'
      }}>
        <i className="bx bx-news" />
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
        crumbs={[
          { to: '/', label: 'Accueil' },
          { label: 'Actualités' },
        ]}
      />
      <PageBody>
        {state === ASYNC.loading ? <Loader /> : null}
        {state === ASYNC.error ? (
          <p role="alert" style={{ color: '#dc2626', padding: '1rem', background: '#fef2f2', borderRadius: '8px' }}>
            Les actualités n’ont pas pu être chargées. Réessayez plus tard.
          </p>
        ) : null}
        {state === ASYNC.empty || (state === ASYNC.success && !data?.length) ? (
          <p className={styles.todo}>
            Aucune actualité publiée pour le moment. La rentrée est prévue le {site.rentree.date}.
          </p>
        ) : null}

        {data?.length ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '2rem',
            padding: '1rem 0'
          }}>
            {data.map((article, index) => (
              <article
                key={article.id}
                onClick={() => setSelectedIndex(index)}
                style={{
                  background: '#ffffff',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  border: '1px solid #f1f5f9',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'zoom-in'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none'
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }}
              >
                {renderMedia(article)}

                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <span style={{
                    alignSelf: 'flex-start',
                    background: '#eff6ff',
                    color: '#1d4ed8',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '999px',
                    marginBottom: '0.75rem'
                  }}>
                    {article.category || 'Actualité'}
                  </span>

                  <h2 style={{
                    fontSize: '1.15rem',
                    fontWeight: '700',
                    color: '#0f172a',
                    marginBottom: '0.5rem',
                    lineHeight: '1.4'
                  }}>
                    {article.title}
                  </h2>

                  <p style={{
                    color: '#64748b',
                    fontSize: '0.9rem',
                    lineHeight: '1.5',
                    marginBottom: '1.25rem',
                    flexGrow: 1
                  }}>
                    {article.excerpt || (article.content ? article.content.substring(0, 100) + '...' : '')}
                  </p>

                  <span
                    style={{
                      color: '#2563eb',
                      fontWeight: '600',
                      fontSize: '0.9rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      marginTop: 'auto'
                    }}
                  >
                    Voir {article.video_url ? 'la vidéo' : 'l\'annonce'} <i className="bx bx-expand-alt" style={{ fontSize: '1rem' }} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        ) : null}

        {selectedArticle && (
          <div
            onClick={handleClose}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1000,
              background: 'rgba(15, 23, 42, 0.97)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
              backdropFilter: 'blur(12px)',
              animation: 'fadeIn 0.25s ease'
            }}
          >
            <style>{`
              @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
              .lightbox-content {
                max-width: 1060px;
                width: 100%;
                height: 92vh;
                background: #0f172a;
                border-radius: 24px;
                overflow: hidden;
                position: relative;
                box-shadow: 0 25px 60px -12px rgba(0, 0, 0, 0.7);
              }
              .nav-btn {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                background: rgba(255, 255, 255, 0.12);
                color: white;
                border: none;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2rem;
                transition: all 0.2s;
                z-index: 35;
              }
              .nav-btn:hover { background: rgba(255, 255, 255, 0.25); transform: translateY(-50%) scale(1.1); }
              .close-btn {
                position: absolute;
                top: 1.25rem;
                right: 1.25rem;
                background: rgba(255, 255, 255, 0.9);
                color: #0f172a;
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.6rem;
                z-index: 40;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                transition: transform 0.2s;
              }
              .close-btn:hover { transform: scale(1.05); background: #ffffff; }

              .lightbox-img-area {
                position: absolute;
                inset: 0;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
                padding: 1.5rem;
                z-index: 5;
                transition: filter 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                filter: brightness(0.65);
              }

              .lightbox-img-area.deep-dimmed {
                filter: brightness(0.18);
              }

              .lightbox-img {
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
                display: block;
              }

              .details-overlay {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                padding: 4rem 2.5rem 2.5rem;
                color: white;
                z-index: 20;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                max-height: 45%;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                pointer-events: none;
              }

              .details-overlay.expanded {
                max-height: 85%;
                justify-content: flex-start;
                overflow-y: auto;
                padding-top: 2rem;
              }

              .details-overlay * {
                pointer-events: auto;
              }

              .voir-plus-btn {
                background: rgba(37, 99, 235, 0.85);
                color: white;
                border: none;
                padding: 0.5rem 1.25rem;
                border-radius: 999px;
                font-weight: 600;
                font-size: 0.85rem;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 0.35rem;
                transition: background 0.2s, transform 0.2s;
                margin-top: 0.75rem;
                align-self: flex-start;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
              }
              .voir-plus-btn:hover { background: #2563eb; transform: translateY(-1px); }

              .text-shadow-safe {
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.9), 0 4px 12px rgba(0, 0, 0, 0.7);
              }

              @media (max-width: 768px) {
                .lightbox-content { height: 96vh; border-radius: 16px; }
                .nav-btn { width: 38px; height: 38px; font-size: 1.4rem; background: rgba(0,0,0,0.5); }
                .nav-btn.prev { left: 0.25rem; }
                .nav-btn.next { right: 0.25rem; }
                .close-btn { top: 0.75rem; right: 0.75rem; width: 34px; height: 34px; font-size: 1.3rem; }
                .details-overlay { padding: 2rem 1.25rem 1.25rem; max-height: 55%; }
                .details-overlay.expanded { max-height: 88%; }
              }
            `}</style>

            <button className="close-btn" onClick={handleClose} aria-label="Fermer">
              <i className="bx bx-x" />
            </button>

            <button className="nav-btn prev" style={{ left: '0.75rem' }} onClick={handlePrev} aria-label="Précédent">
              <i className="bx bx-chevron-left" />
            </button>
            <button className="nav-btn next" style={{ right: '0.75rem' }} onClick={handleNext} aria-label="Suivant">
              <i className="bx bx-chevron-right" />
            </button>

            <div
              className="lightbox-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`lightbox-img-area ${showFullDesc ? 'deep-dimmed' : ''}`}>
                {renderMedia(selectedArticle, true)}
              </div>

              <div className={`details-overlay ${showFullDesc ? 'expanded' : ''}`}>
                <span className="text-shadow-safe" style={{ color: '#93c5fd', fontWeight: '700', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem', display: 'block' }}>
                  {selectedArticle.category || 'Actualité'}
                </span>

                <h2 className="text-shadow-safe" style={{ fontSize: showFullDesc ? '1.6rem' : '1.3rem', color: '#ffffff', margin: 0, lineHeight: '1.3', fontWeight: '700' }}>
                  {selectedArticle.title}
                </h2>

                <div className="text-shadow-safe" style={{ marginTop: '0.75rem', color: '#f1f5f9', lineHeight: '1.6', fontSize: '0.95rem' }}>
                  {showFullDesc ? (
                    <div style={{ animation: 'fadeIn 0.2s ease' }}>
                      <p style={{ marginBottom: '1.5rem', whiteSpace: 'pre-wrap', color: '#ffffff' }}>
                        {selectedArticle.content || selectedArticle.excerpt}
                      </p>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <button
                          className="voir-plus-btn"
                          style={{ background: 'rgba(71, 85, 105, 0.75)' }}
                          onClick={() => setShowFullDesc(false)}
                        >
                          <i className="bx bx-chevron-down" /> Réduire
                        </button>
                        <Link
                          to={`/actualites/${selectedArticle.slug}`}
                          style={{
                            color: '#60a5fa',
                            fontWeight: '600',
                            textDecoration: 'none',
                            fontSize: '0.9rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                          }}
                        >
                          Page de l'article <i className="bx bx-link-external" />
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <p style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        color: '#e2e8f0',
                        margin: 0
                      }}>
                        {selectedArticle.excerpt || selectedArticle.content || ''}
                      </p>
                      <button
                        className="voir-plus-btn"
                        onClick={() => setShowFullDesc(true)}
                      >
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
