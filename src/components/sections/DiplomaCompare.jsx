import { site } from '../../data/site'
import { Container } from '../ui/Container'
import { LinkButton } from '../ui/LinkButton'
import { SectionHeading } from '../ui/SectionHeading'
import styles from './DiplomaCompare.module.css'

export function DiplomaCompare() {
  return (
    <section className={styles.section}>
      <Container>
        <SectionHeading
          kicker="09 — CQP / DQP"
          title="Deux diplômes. Même exigence de clarté."
          lede="Choisissez selon le niveau visé. La durée indiquée ici est celle communiquée pour la rentrée 2026."
        />
        <div className={styles.compare}>
          {site.diplomas.map((item) => (
            <article key={item.code} className={styles.card}>
              <h3>{item.code}</h3>
              <p>{item.name}</p>
              <p>Durée : {item.duration}</p>
            </article>
          ))}
        </div>
        <div style={{ marginTop: '1.5rem' }}>
          <LinkButton to="/admissions" variant="outline">
            Le parcours d’admission
          </LinkButton>
        </div>
      </Container>
    </section>
  )
}
