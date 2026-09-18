import { PageBody, PageHero } from '../components/layout/PageHero'
import { Seo } from '../components/layout/Seo'
import { site } from '../data/site'
import styles from '../components/layout/PageHero.module.css'

export function MentionsPage() {
  return (
    <>
      <Seo
        title="Mentions légales"
        description={`Mentions légales du ${site.name}.`}
        path="/mentions-legales"
      />
      <PageHero title="Mentions légales" />
      <PageBody>
        <div className={styles.stack}>
          <p>
            {site.name}, {site.address}.
          </p>
          <p>E-mail : {site.email}</p>
          <p>{site.agrement}</p>
          <p className={styles.todo}>
            {/* TODO: contenu réel à fournir */}
            Identifiant fiscal, directeur de publication et hébergeur à compléter.
          </p>
        </div>
      </PageBody>
    </>
  )
}
