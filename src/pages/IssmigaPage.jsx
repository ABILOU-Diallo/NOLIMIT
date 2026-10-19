import { useMemo } from 'react'
import { PageBody, PageHero } from '../components/layout/PageHero'
import { Seo } from '../components/layout/Seo'
import { LinkButton } from '../components/ui/LinkButton'
import { Loader } from '../components/ui/Loader'
import { media } from '../data/media'
import { site } from '../data/site'
import { useAsyncData } from '../hooks/useAsyncData'
import { getFormations } from '../services/formationService'
import { ASYNC } from '../utils/asyncState'
import { InstitutionFormationsSection } from '../components/sections/InstitutionFormationsSection'
import styles from '../components/layout/PageHero.module.css'

export function IssmigaPage() {
  const { state, data: allFormations } = useAsyncData(getFormations, [])

  // Filtrage strict : Uniquement BTS, Licence, Master pour ISSMIGA
  const issmigaFormations = useMemo(() => {
    return (allFormations || []).filter((f) => {
      const diploma = (f.diploma || '').toLowerCase()
      return f.institution === 'issmiga' && (
        diploma.includes('bts') ||
        diploma.includes('licence') ||
        diploma.includes('master')
      )
    })
  }, [allFormations])

  return (
    <>
      <Seo
        title="ISSMIGA Yaoundé — Institut Supérieur (BTS, Licence, Master)"
        description={`${site.issmiga.fullName} à Emana. Formations en Management, Informatique et Gestion.`}
        path="/le-groupe/issmiga"
      />
      <PageHero
        title={site.issmiga.name}
        lede={site.issmiga.fullName}
        logo={media.issmiga}
        logoAlt="Logo officiel ISSMIGA"
        crumbs={[{ to: '/', label: 'Accueil' }, { to: '/le-groupe', label: 'Le Groupe' }, { label: 'ISSMIGA' }]}
      />
      <PageBody>
        <div className={styles.stack}>
          {/* Bannière Offre Admission */}
          <div style={{
            background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
            color: '#ffffff',
            padding: '1.5rem',
            borderRadius: '12px',
            borderLeft: '6px solid #ec4899',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ margin: '0 0 0.5rem 0', color: '#ffffff', fontSize: '1.4rem' }}>Offre d’Admission Exceptionnelle</h2>
            <p style={{ margin: 0, fontSize: '1.1rem', color: '#fbcfe8' }}>{site.issmiga.offer}</p>
          </div>

          <h2 style={{ marginTop: '2rem' }}>Cycles Supérieurs (BTS, Licence, Master)</h2>
          {state === ASYNC.loading ? (
            <Loader label="Chargement des filières supérieures..." />
          ) : (
            <InstitutionFormationsSection
              formations={issmigaFormations}
              institution="issmiga"
              diplomaFilters={['Tous', 'BTS', 'Licence', 'Master']}
            />
          )}

          {/* BROCHURES ISSMIGA */}
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
              <img src={media.flyerFr} alt="Brochure ISSMIGA FR" style={{ borderRadius: '16px', width: '100%', height: 'auto', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} />
              <figcaption style={{ textAlign: 'center', marginTop: '1rem', fontWeight: 600 }}>Brochure (Français)</figcaption>
            </figure>
            <figure style={{ margin: 0 }}>
              <img src={media.flyerEn} alt="Brochure ISSMIGA EN" style={{ borderRadius: '16px', width: '100%', height: 'auto', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} />
              <figcaption style={{ textAlign: 'center', marginTop: '1rem', fontWeight: 600 }}>Brochure (English)</figcaption>
            </figure>
          </div>

          <div style={{ marginTop: '4rem', textAlign: 'center', padding: '0 1rem' }}>
            <LinkButton to="/preinscription" style={{ width: '100%', maxWidth: '400px' }}>S’inscrire à ISSMIGA</LinkButton>
          </div>
        </div>
      </PageBody>
    </>
  )
}
