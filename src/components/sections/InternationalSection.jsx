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
          title="Un relais au Canada, pas une promesse floue."
          lede="Les opportunités internationales s’appuient sur un contact réel. Les partenariats seront publiés lorsqu’ils seront confirmés."
        />
        <div className={styles.panel}>
          <p>
            Pour une question d’orientation ou de mobilité, un conseiller peut être joint au
            Canada.
          </p>
          <a className={styles.phone} href={canada.href}>
            {canada.display}
          </a>
          {/* TODO: liste officielle des partenaires internationaux */}
        </div>
      </Container>
    </section>
  )
}
