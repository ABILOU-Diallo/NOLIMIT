import { PageBody, PageHero } from '../components/layout/PageHero'
import { Seo } from '../components/layout/Seo'
import { site } from '../data/site'
import styles from '../components/layout/PageHero.module.css'

export function ConfidentialitePage() {
  return (
    <>
      <Seo
        title="Politique de Confidentialité"
        description={`Comment le ${site.name} protège vos données personnelles collectées lors de votre préinscription ou via nos formulaires de contact.`}
        path="/politique-confidentialite"
      />
      <PageHero
        title="Protection des Données"
        lede="Votre vie privée est au cœur de notre engagement pédagogique."
        crumbs={[
          { to: '/', label: 'Accueil' },
          { label: 'Confidentialité' },
        ]}
      />
      <PageBody>
        <div className={styles.stack}>
          <section>
            <h2>Collecte des données</h2>
            <p>
              Dans le cadre de votre préinscription, nous collectons des informations d'identité (nom, prénom), de contact (email, téléphone), des documents administratifs et une photo portrait. Ces données sont strictement réservées à l'examen de votre candidature par nos services académiques.
            </p>
          </section>

          <section>
            <h2>Utilisation et Sécurité</h2>
            <p>
              Vos données ne sont ni vendues, ni partagées avec des tiers à des fins commerciales. Le stockage est assuré par des serveurs sécurisés et l'accès est restreint au personnel habilité du Groupe NO LIMIT (ISSMIGA & CFP).
            </p>
            <p>
              L'utilisation de la photo portrait est exclusivement destinée à votre futur badge étudiant et à l'identification de votre dossier au sein de notre établissement.
            </p>
          </section>

          <section>
            <h2>Vos droits</h2>
            <p>
              Conformément à la réglementation sur la protection des données personnelles, vous disposez d'un droit d'accès, de rectification et de suppression des informations vous concernant. Pour exercer ce droit, vous pouvez nous contacter à l'adresse suivante : <strong>{site.email}</strong>.
            </p>
          </section>

          <p className={styles.todo}>
            {/* TODO: contenu réel à fournir */}
            Préciser la durée exacte de conservation des dossiers non retenus.
          </p>
        </div>
      </PageBody>
    </>
  )
}
