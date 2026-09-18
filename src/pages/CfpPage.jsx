import { PageBody, PageHero } from '../components/layout/PageHero'
import { Seo } from '../components/layout/Seo'
import { site } from '../data/site'
import { LinkButton } from '../components/ui/LinkButton'
import styles from '../components/layout/PageHero.module.css'

export function CfpPage() {
  return (
    <>
      <Seo
        title="CFP NO LIMIT"
        description="Centre de Formation Professionnelle NO LIMIT à Yaoundé, agréé MINEFOP. CQP et DQP."
        path="/le-groupe/cfp"
      />
      <PageHero
        title="CFP NO LIMIT"
        lede="Le centre de formation professionnelle du groupe, à Emana."
        crumbs={[
          { to: '/', label: 'Accueil' },
          { to: '/le-groupe', label: 'Le Groupe' },
          { label: 'CFP' },
        ]}
      />
      <PageBody>
        <div className={styles.stack}>
          <p>
            Le CFP NO LIMIT prépare à des métiers via des diplômes professionnels reconnus :
            CQP et DQP, chacun sur une année.
          </p>
          <p className={styles.muted}>{site.agrement}</p>
          <p>{site.address}</p>
          <LinkButton to="/preinscription">Préinscription</LinkButton>
        </div>
      </PageBody>
    </>
  )
}
