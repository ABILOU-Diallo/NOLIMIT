import { PageBody, PageHero } from '../components/layout/PageHero'
import { Seo } from '../components/layout/Seo'
import { site } from '../data/site'
import { media } from '../data/media'
import { LinkButton } from '../components/ui/LinkButton'
import { Badge } from '../components/ui/Badge'
import { formations } from '../data/formations'
import { formatDiploma } from '../utils/format'
import { InstitutionFormationsSection } from '../components/sections/InstitutionFormationsSection'
import styles from '../components/layout/PageHero.module.css'

const cfpFormations = formations.filter((f) => f.institution === 'cfp')

export function CfpPage() {
  return (
    <>
      <Seo
        title="CFP NO LIMIT Yaoundé — Formations Professionnelles CQP & DQP"
        description="Centre de Formation Professionnelle agréé MINEFOP à Yaoundé. Devenez opérationnel en 1 an avec nos cycles CQP et DQP. Stages garantis et insertion immédiate."
        path="/le-groupe/cfp"
      />
      <PageHero
        title="CFP NO LIMIT"
        lede="Le Centre de Formation Professionnelle du Groupe, agréé MINEFOP à Emana."
        logo={media.cfp}
        logoAlt="Logo officiel CFP NO LIMIT"
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
              Certificat de Qualification Professionnelle (CQP), Diplôme de Qualification Professionnelle (DQP) & des attestations de 03, 06 et 09 mois.
            </p>
            <p style={{ margin: 0, fontSize: '0.95rem', opacity: 0.9 }}>
              Durée des formations : <strong>1 an (Pratique intensive & Insertion professionnelle)</strong>
            </p>
          </div>

          <div>
            <p>
              Le CFP NO LIMIT prépare directement aux métiers d'avenir du numérique, de la cybersécurité, de la gestion, des médias créatifs et du management appliqué.
            </p>
            <p className={styles.muted} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <i className="bx bx-badge-check" style={{ color: '#ea580c', fontSize: '1.2rem' }} aria-hidden="true" />
              <strong>Agrément MINEFOP :</strong> {site.agrementMinefop || site.agrement}
            </p>
            <p style={{ margin: '0.25rem 0 0 0' }}>Localisation : {site.address}</p>
          </div>

          <h2 style={{ marginTop: '2rem' }}>Catalogue des Formations Professionnelles (CFP NO LIMIT)</h2>
          <p style={{ color: 'var(--color-muted)', marginTop: '-0.5rem' }}>
            Parcours pratiques et qualifiants (CQP & DQP en 1 an) avec descriptions complètes, compétences techniques développées et débouchés directs sur le marché de l’emploi.
          </p>

          <InstitutionFormationsSection
            formations={cfpFormations}
            institution="cfp"
            diplomaFilters={['Tous', 'CQP', 'DQP']}
          />

          <h2 style={{ marginTop: '2.5rem' }}>Brochure Officielle CFP NO LIMIT</h2>
          <div style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
            <figure className={styles.media}>
              <img
                src={media.flyerCfp}
                alt="Brochure officielle du Centre de Formation Professionnelle CFP NO LIMIT."
                width="656"
                height="872"
                loading="lazy"
                style={{ borderRadius: '12px', width: '100%', height: 'auto' }}
              />
              <figcaption style={{ textAlign: 'center', marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--color-muted)' }}>
                Prospectus CFP NO LIMIT (Filières, Modalités & Inscriptions)
              </figcaption>
            </figure>
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
