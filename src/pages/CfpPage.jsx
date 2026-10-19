import { useMemo, lazy, Suspense } from 'react'
import { PageBody, PageHero } from '../components/layout/PageHero'
import { Seo } from '../components/layout/Seo'
import { site } from '../data/site'
import { media } from '../data/media'
import { LinkButton } from '../components/ui/LinkButton'
import { Loader } from '../components/ui/Loader'
import { useAsyncData } from '../hooks/useAsyncData'
import { getFormations } from '../services/formationService'
import { ASYNC } from '../utils/asyncState'
import { InstitutionFormationsSection } from '../components/sections/InstitutionFormationsSection'
import styles from '../components/layout/PageHero.module.css'

const CustomFormationsSection = lazy(() => import('../components/sections/CustomFormationsSection'))

export function CfpPage() {
  const { state, data: allFormations } = useAsyncData(getFormations, [])

  const cfpDiplomantes = useMemo(() => {
    return (allFormations || []).filter((f) => {
      const d = (f.diploma || '').toLowerCase()
      return f.institution === 'cfp' && (d.includes('cqp') || d.includes('dqp'))
    })
  }, [allFormations])

  return (
    <>
      <Seo
        title="CFP NO LIMIT — Formations Professionnelles (CQP, DQP, Attestations)"
        description="Centre de Formation Professionnelle agréé MINEFOP. Cycles d'un an (CQP/DQP) et formations courtes à la carte."
        path="/le-groupe/cfp"
      />
      <PageHero
        title="CFP NO LIMIT"
        lede="Centre de Formation Professionnelle agréé MINEFOP situé à Emana."
        logo={media.cfp}
        logoAlt="Logo officiel CFP NO LIMIT"
        crumbs={[{ to: '/', label: 'Accueil' }, { to: '/le-groupe', label: 'Le Groupe' }, { label: 'CFP NO LIMIT' }]}
      />
      <PageBody>
        <div className={styles.stack}>

          {/* SECTION 1 : CYCLES NATIONAUX DIPLÔMANTS */}
          <section>
            <div style={{
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
              color: '#ffffff',
              padding: 'clamp(1rem, 4vw, 1.5rem)',
              borderRadius: '12px',
              borderLeft: '6px solid #f97316',
              marginBottom: '2rem'
            }}>
              <h2 style={{ margin: '0 0 0.5rem 0', color: '#ffffff', fontSize: 'clamp(1.2rem, 4vw, 1.4rem)' }}>
                Formations qualifiantes (Cycles 1 an)
              </h2>
              <p style={{ margin: 0, fontSize: '0.95rem', color: '#fed7aa', lineHeight: 1.4 }}>
                Diplômes d'État : <strong>CQP</strong> (Certificat de Qualification) et <strong>DQP</strong> (Diplôme de Qualification).
              </p>
            </div>

            {state === ASYNC.loading ? (
              <Loader label="Récupération du catalogue CQP/DQP..." />
            ) : (
              <InstitutionFormationsSection
                formations={cfpDiplomantes}
                institution="cfp"
                diplomaFilters={['Tous', 'CQP', 'DQP']}
              />
            )}
          </section>

          <hr style={{ margin: 'clamp(2rem, 8vw, 4.5rem) 0', opacity: 0.1 }} />

          {/* SECTION 2 : FORMATIONS À LA CARTE (ATTESTATIONS) */}
          <section id="formations-a-la-carte">
             <div style={{ textAlign: 'center', marginBottom: '3rem', padding: '0 1rem' }}>
                <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.2rem)', color: '#0f172a', marginBottom: '0.5rem' }}>Formations à la Carte</h2>
                <div style={{ display: 'inline-block', height: '4px', width: '60px', background: '#ea580c', borderRadius: '2px' }}></div>
                <p style={{ marginTop: '1rem', color: '#64748b', fontSize: '1.05rem', maxWidth: '700px', marginInline: 'auto' }}>
                  Modules de <strong>03, 06 et 09 mois</strong> sanctionnés par une <strong>Attestation de Fin de Formation</strong>.
                </p>
             </div>

             <Suspense fallback={<Loader />}>
                <CustomFormationsSection />
             </Suspense>
          </section>

          {/* BROCHURES - RESPONSIVE GRID */}
          <h2 style={{ marginTop: '5rem', textAlign: 'center', fontSize: '1.75rem' }}>Documents Officiels</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '2rem',
            maxWidth: '900px',
            margin: '2rem auto 0',
            padding: '0 1rem'
          }}>
            <figure style={{ margin: 0 }}>
              <img src={media.flyerCfp} alt="Prospectus FR" style={{ borderRadius: '16px', width: '100%', height: 'auto', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} />
              <figcaption style={{ textAlign: 'center', marginTop: '1rem', fontWeight: 600 }}>Prospectus (Français)</figcaption>
            </figure>
            <figure style={{ margin: 0 }}>
              <img src={media.flyerCfpEn} alt="Prospectus EN" style={{ borderRadius: '16px', width: '100%', height: 'auto', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} />
              <figcaption style={{ textAlign: 'center', marginTop: '1rem', fontWeight: 600 }}>Prospectus (English)</figcaption>
            </figure>
          </div>

          <div style={{ marginTop: '4rem', textAlign: 'center', padding: '0 1rem' }}>
            <LinkButton to="/preinscription" size="lg" style={{ width: '100%', maxWidth: '400px' }}>
              Demander une inscription au CFP
            </LinkButton>
          </div>
        </div>
      </PageBody>
    </>
  )
}
