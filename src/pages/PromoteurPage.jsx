import { PageBody, PageHero } from '../components/layout/PageHero'
import { Seo } from '../components/layout/Seo'
import { site } from '../data/site'
import { media } from '../data/media'

export function PromoteurPage() {
  const { promoter } = site

  return (
    <>
      <Seo
        title={`Mot du Promoteur — ${promoter.name}`}
        description="Message officiel du Dr Orly TANTCHOU, promoteur du Groupe NO LIMIT à Yaoundé : orientation, formation et employabilité."
        path="/le-groupe/promoteur"
      />
      <PageHero
        title={promoter.name}
        lede={promoter.role}
        crumbs={[
          { to: '/', label: 'Accueil' },
          { to: '/le-groupe', label: 'Le Groupe' },
          { label: 'Promoteur' },
        ]}
      />
      <PageBody>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          alignItems: 'start',
          marginTop: '1rem'
        }}>
          {/* Portrait Column */}
          <div style={{ position: 'sticky', top: '2rem' }}>
            <figure style={{
              margin: 0,
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 12px 32px rgba(15, 23, 42, 0.12)',
              border: '1px solid var(--color-border)',
              background: '#ffffff'
            }}>
              <img
                src={media.founder}
                alt={`${promoter.name}, promoteur du Groupe NO LIMIT.`}
                width="540"
                height="614"
                loading="lazy"
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              />
              <figcaption style={{
                padding: '1.25rem',
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                color: '#ffffff',
                textAlign: 'center'
              }}>
                <strong style={{ display: 'block', fontSize: '1.15rem', color: '#ffffff' }}>
                  {promoter.name}
                </strong>
                <span style={{ fontSize: '0.9rem', color: '#f97316', fontWeight: 500 }}>
                  {promoter.role}
                </span>
              </figcaption>
            </figure>
          </div>

          {/* Letter / Message Column */}
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '2rem',
            border: '1px solid var(--color-border)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)'
          }}>
            <span style={{
              display: 'inline-block',
              padding: '0.35rem 0.85rem',
              borderRadius: '20px',
              background: 'rgba(236, 72, 153, 0.1)',
              color: '#db2777',
              fontWeight: 600,
              fontSize: '0.85rem',
              marginBottom: '1rem'
            }}>
              {promoter.title}
            </span>

            <h2 style={{
              fontSize: '1.4rem',
              color: 'var(--color-navy-900)',
              marginTop: 0,
              marginBottom: '1.25rem',
              fontStyle: 'italic'
            }}>
              « {promoter.greeting} »
            </h2>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.15rem',
              fontSize: '1.025rem',
              lineHeight: '1.7',
              color: 'var(--color-navy-800)'
            }}>
              {promoter.paragraphs.map((paragraph, index) => {
                // Highlight key pillar sentences or quotes
                const isHighlight = paragraph.includes('Orientation – Formation – Employabilité') || paragraph.includes('Bâtisseur de Compétences')
                return (
                  <p
                    key={index}
                    style={{
                      margin: 0,
                      padding: isHighlight ? '1.1rem 1.25rem' : '0',
                      background: isHighlight ? 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)' : 'transparent',
                      borderLeft: isHighlight ? '4px solid #db2777' : 'none',
                      borderRadius: isHighlight ? '0 8px 8px 0' : '0',
                      fontWeight: isHighlight ? 600 : 400
                    }}
                  >
                    {paragraph}
                  </p>
                )
              })}
            </div>

            <div style={{
              marginTop: '2.5rem',
              paddingTop: '1.5rem',
              borderTop: '2px dashed var(--color-border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem'
            }}>
              <strong style={{ fontSize: '1.2rem', color: 'var(--color-navy-900)' }}>
                {promoter.name}
              </strong>
              <span style={{ color: 'var(--color-muted)', fontWeight: 500 }}>
                {promoter.role}
              </span>
            </div>
          </div>
        </div>
      </PageBody>
    </>
  )
}

