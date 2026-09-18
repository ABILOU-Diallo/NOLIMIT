import { admissionSteps } from '../../data/admissions'
import { site } from '../../data/site'
import { Container } from '../ui/Container'
import { LinkButton } from '../ui/LinkButton'
import styles from './PreinscriptionCta.module.css'

export function PreinscriptionCta() {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.band}>
          <div>
            <p>
              {site.rentree.label} : {site.rentree.date}
            </p>
            <h2>Quatre étapes en ligne. L’admission, au campus.</h2>
            <ol className={styles.steps}>
              {admissionSteps.slice(0, 4).map((step) => (
                <li key={step.n}>
                  {step.title}
                </li>
              ))}
            </ol>
          </div>
          <LinkButton to="/preinscription" variant="secondary">
            Commencer la préinscription
          </LinkButton>
        </div>
      </Container>
    </section>
  )
}
