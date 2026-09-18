import { PageBody, PageHero } from '../components/layout/PageHero'
import { Seo } from '../components/layout/Seo'
import { employabilityPath } from '../data/admissions'
import styles from '../components/layout/PageHero.module.css'

export function EmployabilitePage() {
  return (
    <>
      <Seo
        title="Employabilité"
        description="Le parcours NO LIMIT : orientation, formation, pratique, stage, employabilité et opportunités internationales."
        path="/employabilite"
      />
      <PageHero
        title="De la formation au travail."
        lede="Une narration en six temps. Pas une liste de services."
        crumbs={[
          { to: '/', label: 'Accueil' },
          { label: 'Employabilité' },
        ]}
      />
      <PageBody>
        <ol className={styles.stack}>
          {employabilityPath.map((step, index) => (
            <li key={step.id}>
              <h2>
                {String(index + 1).padStart(2, '0')} · {step.title}
              </h2>
              <p className={styles.muted}>{step.text}</p>
            </li>
          ))}
        </ol>
        <p className={styles.todo} style={{ marginTop: '1.5rem' }}>
          {/* TODO: contenu réel à fournir */}
          Le détail des modalités de stage sera publié lorsqu’il sera fourni. Aucun partenaire
          n’est affiché sans validation.
        </p>
      </PageBody>
    </>
  )
}
