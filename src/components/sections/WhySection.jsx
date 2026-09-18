import { site } from '../../data/site'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import styles from './WhySection.module.css'

export function WhySection() {
  return (
    <section className={styles.section}>
      <Container>
        <SectionHeading
          kicker="02 — Pourquoi NO LIMIT"
          title="Une institution de formation, pas une plateforme anonyme."
          lede="Le Groupe NO LIMIT relie l’orientation, la formation professionnelle et l’employabilité dans un même lieu, à Yaoundé."
        />
        <div className={styles.proof}>
          <div className={styles.item}>
            <strong>Agréé MINEFOP</strong>
            <span>{site.agrement}</span>
          </div>
          <div className={styles.item}>
            <strong>CQP et DQP</strong>
            <span>Deux diplômes professionnels, chacun sur une année.</span>
          </div>
          <div className={styles.item}>
            <strong>{site.city}</strong>
            <span>{site.address}</span>
          </div>
        </div>
      </Container>
    </section>
  )
}
