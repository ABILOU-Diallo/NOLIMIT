import { Link } from 'react-router-dom'
import { PageBody, PageHero } from '../components/layout/PageHero'
import { Seo } from '../components/layout/Seo'
import { Card } from '../components/ui/Card'
import { media } from '../data/media'
import { site } from '../data/site'
import styles from '../components/layout/PageHero.module.css'

export function GroupePage() {
  return (
    <>
      <Seo
        title="Le Groupe"
        description="L’écosystème NO LIMIT : orientation, CFP, ISSMIGA et employabilité à Yaoundé."
        path="/le-groupe"
      />
      <PageHero
        title="Un groupe, trois portes d’entrée."
        lede="Orientation, formation professionnelle et accompagnement vers l’emploi. Même exigence, des rôles distincts."
        crumbs={[
          { to: '/', label: 'Accueil' },
          { label: 'Le Groupe' },
        ]}
      />
      <PageBody>
        <div className={styles.list}>
          <Card to="/le-groupe/cfp">
            <h2>CFP NO LIMIT</h2>
            <p className={styles.muted}>
              Centre de formation professionnelle agréé MINEFOP. CQP et DQP.
            </p>
          </Card>
          <Card to="/le-groupe/issmiga">
            <h2>ISSMIGA</h2>
            <p className={styles.muted}>{site.issmiga.fullName}.</p>
          </Card>
          <Card to="/le-groupe/promoteur">
            <h2>Le promoteur</h2>
            <p className={styles.muted}>Dr Orly Tantchou.</p>
          </Card>
        </div>
        <h2 style={{ marginTop: '2rem' }}>Brochures officielles du Groupe</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
          <figure className={styles.media}>
            <img
              src={media.flyerFr}
              alt="Flyer officiel ISSMIGA, institut du Groupe NO LIMIT à Yaoundé."
              width="656"
              height="872"
              loading="lazy"
              style={{ borderRadius: '12px', width: '100%', height: 'auto' }}
            />
            <figcaption style={{ textAlign: 'center', marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--color-muted)' }}>
              Dépliant ISSMIGA (Cycles BTS, Licence & Master)
            </figcaption>
          </figure>
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
              Dépliant CFP NO LIMIT (Formations CQP & DQP)
            </figcaption>
          </figure>
        </div>
        <p style={{ marginTop: '1rem' }}>
          <Link to="/formations">Explorer les formations</Link>
        </p>
      </PageBody>
    </>
  )
}
