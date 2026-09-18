import { PageBody, PageHero } from '../components/layout/PageHero'
import { Seo } from '../components/layout/Seo'
import { site } from '../data/site'
import { media } from '../data/media'
import styles from '../components/layout/PageHero.module.css'

export function PromoteurPage() {
  return (
    <>
      <Seo
        title="Le promoteur"
        description="Dr Orly Tantchou, promoteur du Groupe NO LIMIT à Yaoundé."
        path="/le-groupe/promoteur"
      />
      <PageHero
        title={site.promoter.name}
        lede={site.promoter.role}
        crumbs={[
          { to: '/', label: 'Accueil' },
          { to: '/le-groupe', label: 'Le Groupe' },
          { label: 'Promoteur' },
        ]}
      />
      <PageBody>
        <figure className={styles.media}>
          <img
            src={media.founder}
            alt={`${site.promoter.name}, à Yaoundé, derrière Tradex Emana.`}
            width="540"
            height="614"
            loading="lazy"
          />
        </figure>
        <p className={styles.todo} style={{ marginTop: '1rem' }}>
          Biographie et mot officiel du promoteur à fournir. Rien n’est inventé ici.
        </p>
      </PageBody>
    </>
  )
}
