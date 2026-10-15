import { PageBody, PageHero } from '../components/layout/PageHero'
import { Seo } from '../components/layout/Seo'
import { LinkButton } from '../components/ui/LinkButton'
import { Badge } from '../components/ui/Badge'
import { media } from '../data/media'
import { site } from '../data/site'
import { formations } from '../data/formations'
import { InstitutionFormationsSection } from '../components/sections/InstitutionFormationsSection'
import styles from '../components/layout/PageHero.module.css'

const issmigaFormations = formations.filter((f) => f.institution === 'issmiga')

export function IssmigaPage() {
  return (
    <>
      <Seo
        title="ISSMIGA Yaoundé — Institut Supérieur (BTS, Licence, Master)"
        description={`${site.issmiga.fullName} à Emana. Formations en Management, Informatique et Gestion. ${site.issmiga.offer}. Diplômes d'État et insertion professionnelle.`}
        path="/le-groupe/issmiga"
      />
      <PageHero
        title={site.issmiga.name}
        lede={site.issmiga.fullName}
        logo={media.issmiga}
        logoAlt="Logo officiel ISSMIGA"
        crumbs={[
          { to: '/', label: 'Accueil' },
          { to: '/le-groupe', label: 'Le Groupe' },
          { label: 'ISSMIGA' },
        ]}
      />
      <PageBody>
        <div className={styles.stack}>
          <div style={{
            background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
            color: '#ffffff',
            padding: '1.5rem',
            borderRadius: '12px',
            borderLeft: '6px solid #ec4899',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ margin: '0 0 0.5rem 0', color: '#ffffff', fontSize: '1.4rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <i className="bx bx-gift" style={{ color: '#fbcfe8', fontSize: '1.6rem' }} aria-hidden="true" />
              <span>Offre d’Admission Exceptionnelle</span>
            </h2>
            <p style={{ margin: '0 0 0.75rem 0', fontSize: '1.1rem', fontWeight: 600, color: '#fbcfe8' }}>
              {site.issmiga.offer}
            </p>
            <p style={{ margin: 0, fontSize: '0.95rem', opacity: 0.9 }}>
              Cycle : <strong>BTS / Licence / Master</strong> (HND / Bachelor's / Master's) · Début des cours : <strong>{site.issmiga.rentree}</strong>
            </p>
          </div>

          <div>
            <p>
              ISSMIGA est l’Institut Supérieur des Sciences du Management, de l’Informatique et de Gestion Appliquée du Groupe NO LIMIT, situé à Yaoundé (derrière Tradex Emana, lieu-dit NO LIMIT).
            </p>
            <p className={styles.muted} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <i className="bx bx-badge-check" style={{ color: '#10b981', fontSize: '1.2rem' }} aria-hidden="true" />
              <strong>Agrément MINESUP :</strong> {site.agrementMinesup || site.issmiga.agrement}
            </p>
          </div>

          <h2 style={{ marginTop: '2rem' }}>Catalogue des Formations Supérieures (ISSMIGA)</h2>
          <p style={{ color: 'var(--color-muted)', marginTop: '-0.5rem' }}>
            Explorez nos filières d’enseignement supérieur avec descriptions complètes, compétences professionnelles visées et débouchés de carrière concrets.
          </p>

          <InstitutionFormationsSection
            formations={issmigaFormations}
            institution="issmiga"
            diplomaFilters={['Tous', 'BTS', 'Licence', 'Master']}
          />

          <h2 style={{ marginTop: '2.5rem' }}>Brochures & Prospectus</h2>
          <p style={{ color: 'var(--color-muted)', marginTop: '-0.5rem', marginBottom: '1.5rem' }}>
            Consultez les dépliants officiels d’ISSMIGA.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', maxWidth: '800px' }}>
            <figure className={styles.media}>
              <img
                src={media.flyerFr}
                alt="Flyer officiel ISSMIGA en Français — Inscription, BTS, Licence, Master et filières."
                width="656"
                height="872"
                loading="lazy"
                style={{ borderRadius: '12px', width: '100%', height: 'auto' }}
              />
              <figcaption style={{ textAlign: 'center', marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--color-muted)' }}>
                Prospectus ISSMIGA (Version Français)
              </figcaption>
            </figure>
            <figure className={styles.media}>
              <img
                src={media.flyerEn}
                alt="Official ISSMIGA flyer in English — Higher Education Cycle HND, Bachelor's, Master's."
                width="656"
                height="872"
                loading="lazy"
                style={{ borderRadius: '12px', width: '100%', height: 'auto' }}
              />
              <figcaption style={{ textAlign: 'center', marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--color-muted)' }}>
                Prospectus ISSMIGA (Version Anglais)
              </figcaption>
            </figure>
          </div>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <LinkButton to="/preinscription">
              S’inscrire à ISSMIGA dès maintenant
            </LinkButton>
          </div>
        </div>
      </PageBody>
    </>
  )
}
