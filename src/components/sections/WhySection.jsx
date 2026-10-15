import { site } from '../../data/site'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import styles from './WhySection.module.css'

export function WhySection() {
  return (
    <section className={styles.section}>
      <Container>
        <SectionHeading
          kicker="01 — Pourquoi NO LIMIT"
          title="Une institution de formation, pas une plateforme anonyme."
          lede="Le Groupe NO LIMIT relie l’orientation, la formation professionnelle et l’employabilité dans un même lieu, à Yaoundé."
        />
        <div className={styles.proof}>
          <div className={styles.item}>
            <strong style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
              <i className="bx bx-badge-check" style={{ fontSize: '1.25rem', color: 'var(--color-magenta-500)' }} aria-hidden="true" />
              <span>Agréé MINEFOP & MINESUP</span>
            </strong>
            <span style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', fontSize: '0.86rem' }}>
              <span><strong>MINEFOP :</strong> {site.agrementMinefop || site.agrement}</span>
              <span><strong>MINESUP :</strong> {site.agrementMinesup}</span>
            </span>
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
              <span>Cameroun</span>
            </strong>
            <span>Yaoundé, derrière Tradex Emana, lieu-dit NO LIMIT</span>
          </div>
        </div>
      </Container>
    </section>
  )
}
