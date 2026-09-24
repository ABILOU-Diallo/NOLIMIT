import { PageBody, PageHero } from '../components/layout/PageHero'
import { Seo } from '../components/layout/Seo'
import { site } from '../data/site'
import { LinkButton } from '../components/ui/LinkButton'
import { Badge } from '../components/ui/Badge'
import { formations } from '../data/formations'
import { formatDiploma } from '../utils/format'
import styles from '../components/layout/PageHero.module.css'

const cfpFormations = formations.filter((f) => f.institution === 'cfp')

export function CfpPage() {
  return (
    <>
      <Seo
        title="CFP NO LIMIT — Centre de Formation Professionnelle"
        description="Centre de Formation Professionnelle NO LIMIT à Yaoundé, agréé MINEFOP. Diplômes professionnels CQP et DQP en 1 an."
        path="/le-groupe/cfp"
      />
      <PageHero
        title="CFP NO LIMIT"
        lede="Le Centre de Formation Professionnelle du Groupe, agréé MINEFOP à Emana."
        crumbs={[
          { to: '/', label: 'Accueil' },
          { to: '/le-groupe', label: 'Le Groupe' },
          { label: 'CFP NO LIMIT' },
        ]}
      />
      <PageBody>
        <div className={styles.stack}>
          <div style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            color: '#ffffff',
            padding: '1.5rem',
            borderRadius: '12px',
            borderLeft: '6px solid #f97316',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ margin: '0 0 0.5rem 0', color: '#ffffff', fontSize: '1.4rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <i className="bx bx-certification" style={{ color: '#fed7aa', fontSize: '1.6rem' }} aria-hidden="true" />
              <span>Formations Qualifiantes & Diplômantes</span>
            </h2>
            <p style={{ margin: '0 0 0.75rem 0', fontSize: '1.05rem', color: '#fed7aa' }}>
              Certificat de Qualification Professionnelle (CQP) & Diplôme de Qualification Professionnelle (DQP).
            </p>
            <p style={{ margin: 0, fontSize: '0.95rem', opacity: 0.9 }}>
              Durée des formations : <strong>1 an (Pratique intensive & Insertion professionnelle)</strong>
            </p>
          </div>

          <div>
            <p>
              Le CFP NO LIMIT prépare directement aux métiers du numérique, de la cybersécurité, de la gestion, des médias créatifs et de la santé.
            </p>
            <p className={styles.muted}>Agrément MINEFOP : {site.agrement}</p>
            <p>Localisation : {site.address}</p>
          </div>

          <h2 style={{ marginTop: '1.5rem' }}>Catalogue des Formations CFP NO LIMIT (CQP & DQP)</h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.25rem',
            marginTop: '0.5rem'
          }}>
            {cfpFormations.map((f) => (
              <div
                key={f.id}
                style={{
                  background: '#ffffff',
                  border: '1px solid var(--color-border)',
                  borderRadius: '10px',
                  padding: '1.2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between',
                  gap: '0.75rem'
                }}
              >
                <div>
                  <Badge variant="outline" style={{ marginBottom: '0.5rem' }}>
                    {formatDiploma(f.diploma)}
                  </Badge>
                  <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.05rem', color: 'var(--color-navy-900)' }}>
                    {f.title}
                  </h3>
                </div>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>
                  Durée : {f.duration}
                </span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <LinkButton to="/preinscription">
              S’inscrire au CFP NO LIMIT
            </LinkButton>
          </div>
        </div>
      </PageBody>
    </>
  )
}
