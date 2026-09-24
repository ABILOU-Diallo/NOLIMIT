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
            <strong style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
              <i className="bx bx-badge-check" style={{ fontSize: '1.25rem', color: 'var(--color-magenta-500)' }} aria-hidden="true" />
              <span>Agréé MINEFOP & MINESUP</span>
            </strong>
            <span>{site.agrement}</span>
          </div>
          <div className={styles.item}>
            <strong style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
              <i className="bx bx-certification" style={{ fontSize: '1.25rem', color: 'var(--color-magenta-500)' }} aria-hidden="true" />
              <span>Diplômes d’État & Supérieurs</span>
            </strong>
            <span>CQP, DQP (1 an) et BTS, Licence, Master (ISSMIGA).</span>
          </div>
          <div className={styles.item}>
            <strong style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
              <i className="bx bx-map-pin" style={{ fontSize: '1.25rem', color: 'var(--color-magenta-500)' }} aria-hidden="true" />
              <span>{site.city}</span>
            </strong>
            <span>{site.address}</span>
          </div>
        </div>
      </Container>
    </section>
  )
}
