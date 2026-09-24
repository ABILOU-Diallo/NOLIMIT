import { Link } from 'react-router-dom'
import { PageBody, PageHero } from '../components/layout/PageHero'
import { Seo } from '../components/layout/Seo'
import { Loader } from '../components/ui/Loader'
import { useAsyncData } from '../hooks/useAsyncData'
import { getPublishedArticles } from '../services/actualiteService'
import { site } from '../data/site'
import { ASYNC } from '../utils/asyncState'
import styles from '../components/layout/PageHero.module.css'

export function ActualitesPage() {
  const { state, data, error } = useAsyncData(getPublishedArticles, [])

  return (
    <>
      <Seo
        title="Actualités"
        description={`Annonces et informations du ${site.name}.`}
        path="/actualites"
      />
      <PageHero
        title="Actualités"
        lede="Les informations publiées par le groupe apparaissent ici."
        crumbs={[
          { to: '/', label: 'Accueil' },
          { label: 'Actualités' },
        ]}
      />
      <PageBody>
        {state === ASYNC.loading ? <Loader /> : null}
        {state === ASYNC.error ? (
          <p role="alert" style={{ color: '#dc2626', padding: '1rem', background: '#fef2f2', borderRadius: '8px' }}>
            Les actualités n’ont pas pu être chargées. {error?.message} Réessayez plus tard.
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
            {data.map((article) => (
              <article key={article.id} style={{
                background: '#ffffff',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                border: '1px solid #f1f5f9',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none'
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}>
                {article.image_url ? (
                  <div style={{
                    width: '100%',
                    background: '#f8fafc',
                    borderBottom: '1px solid #f1f5f9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                  }}>
                    <img
                      src={article.image_url}
                      alt={article.title}
                      style={{
                        width: '100%',
                        height: 'auto',
                        maxHeight: '240px',
                        objectFit: 'contain', // Affiche l'image entièrement sans la couper
                        display: 'block'
                      }}
                    />
                  </div>
                ) : (
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
                )}

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

                  <Link
                    to={`/actualites/${article.slug}`}
                    style={{
                      color: '#2563eb',
                      fontWeight: '600',
                      fontSize: '0.9rem',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      marginTop: 'auto'
                    }}
                  >
                    Lire la suite <i className="bx bx-right-arrow-alt" style={{ fontSize: '1.2rem' }} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </PageBody>
    </>
  )
}
