import { PageBody, PageHero } from '../components/layout/PageHero'
import { Seo } from '../components/layout/Seo'
import { site } from '../data/site'
import styles from '../components/layout/PageHero.module.css'

export function MentionsPage() {
  return (
    <>
      <Seo
        title="Mentions Légales"
        description={`Informations administratives et juridiques concernant le ${site.name} (ISSMIGA & CFP NO LIMIT) à Yaoundé.`}
        path="/mentions-legales"
      />
      <PageHero
        title="Mentions Légales"
        crumbs={[
          { to: '/', label: 'Accueil' },
          { label: 'Mentions Légales' },
        ]}
      />
      <PageBody>
        <div className={styles.stack}>
          <section>
            <h2>Éditeur du site</h2>
            <p>
              <strong>{site.name}</strong><br />
              Siège social : {site.address}<br />
              Email : {site.email}<br />
              Téléphone : {site.phones[0].display}
            </p>
          </section>

          <section>
            <h2>Agréments Ministériels</h2>
            <p>
              <strong>ISSMIGA :</strong> {site.issmiga.agrement}<br />
              <strong>CFP NO LIMIT :</strong> {site.cfp.agrement}
            </p>
          </section>

          <section>
            <h2>Propriété Intellectuelle</h2>
            <p>
              L'ensemble de ce site relève de la législation camerounaise et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
            </p>
          </section>

          <p className={styles.todo}>
            {/* TODO: contenu réel à fournir */}
            Directeur de publication et hébergeur à compléter selon les informations définitives.
          </p>
        </div>
      </PageBody>
    </>
  )
}
