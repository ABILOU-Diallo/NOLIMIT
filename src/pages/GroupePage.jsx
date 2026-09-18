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
        <figure className={styles.media} style={{ marginTop: '1.5rem' }}>
          <img
            src={media.flyer}
            alt="Flyer officiel ISSMIGA, institut du Groupe NO LIMIT à Yaoundé."
            width="656"
            height="872"
            loading="lazy"
          />
        </figure>
        <p className={styles.todo} style={{ marginTop: '1.5rem' }}>
          {/* TODO: contenu réel à fournir */}
          Le texte institutionnel long du Groupe sera intégré dès réception.
        </p>
        <p style={{ marginTop: '1rem' }}>
          <Link to="/formations">Explorer les formations</Link>
        </p>
      </PageBody>
    </>
  )
}
