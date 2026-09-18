import { PageBody, PageHero } from '../components/layout/PageHero'
import { Seo } from '../components/layout/Seo'
import { site } from '../data/site'
import styles from '../components/layout/PageHero.module.css'

export function ConfidentialitePage() {
  return (
    <>
      <Seo
        title="Politique de confidentialité"
        description="Traitement des données personnelles collectées via le site du Groupe NO LIMIT."
        path="/politique-confidentialite"
      />
      <PageHero title="Politique de confidentialité" />
      <PageBody>
        <div className={styles.stack}>
          <p>
            Les formulaires de contact et de préinscription collectent des données d’identité
            et de contact pour le suivi des admissions. Elles sont destinées au {site.name}.
          </p>
          <p>
            Aucun mot de passe n’est stocké dans la base métier. L’authentification, lorsqu’elle
            sera ouverte, passera par Supabase Auth.
          </p>
          <p className={styles.todo}>
            {/* TODO: contenu réel à fournir */}
            Durée de conservation et base légale à faire valider par le promoteur.
          </p>
        </div>
      </PageBody>
    </>
  )
}
