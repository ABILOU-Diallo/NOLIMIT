import { employabilityPath } from '../../data/admissions'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import styles from './EmployabilityPath.module.css'

export function EmployabilityPath() {
  return (
    <section className={styles.section}>
      <Container>
        <SectionHeading
          kicker="04 — Du métier au travail"
          title="De l’orientation à l’employabilité passant par une bonne formation"
          lede="L’employabilité n’est pas un bloc de plus en bas de page. C’est le fil qui relie chaque étape."
        />
        <ol className={styles.path}>
          {employabilityPath.map((step, index) => (
            <li key={step.id} className={styles.step}>
              <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
