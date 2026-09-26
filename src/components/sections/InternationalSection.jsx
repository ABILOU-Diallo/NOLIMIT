import { site } from '../../data/site'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import styles from './InternationalSection.module.css'

export function InternationalSection() {
  const canada = site.phones.find((item) => item.label === 'Canada')

  return (
    <section className={styles.section}>
      <Container>
        <SectionHeading
          kicker="07 — International"
          title="Ouverture sur le monde et mobilité."
          lede="Le Groupe NO LIMIT accompagne ses étudiants dans leurs projets d'études et de carrière à l'international."
        />
        <div className={styles.panel}>
          {canada ? (
            <>
              <p>
                Pour une question d’orientation ou de mobilité, un conseiller peut être joint au
                Canada.
              </p>
              <a className={styles.phone} href={canada.href}>
                {canada.display}
              </a>
            </>
          ) : (
            <p>
              Nous développons des partenariats stratégiques pour faciliter la mobilité académique
              et professionnelle de nos étudiants vers l'étranger.
            </p>
          )}
          {/* TODO: liste officielle des partenaires internationaux */}
        </div>
      </Container>
    </section>
  )
}
