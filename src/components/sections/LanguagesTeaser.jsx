import { languageCertifications, languageLevels, languages } from '../../data/languages'
import { Container } from '../ui/Container'
import { LinkButton } from '../ui/LinkButton'
import { SectionHeading } from '../ui/SectionHeading'
import styles from './LanguagesTeaser.module.css'

export function LanguagesTeaser() {
  return (
    <section className={styles.section}>
      <Container>
        <SectionHeading
          onDark
          kicker="05 — Centre de langues"
          title="A1 jusqu’à C2. Pas un slogan, une échelle."
          lede="Allemand, anglais et français, avec des certifications reconnues. Un livre de cours d’allemand est offert."
        />
        <div className={styles.scale} aria-label="Niveaux du CECRL">
          {languageLevels.map((level) => (
            <div key={level} className={styles.level}>
              {level}
            </div>
          ))}
        </div>
        <div className={styles.langs}>
          {languages.map((lang) => (
            <span key={lang.slug} className={styles.chip}>
              {lang.name}
            </span>
          ))}
        </div>
        <div className={styles.certs}>
          {languageCertifications.map((item) => (
            <span key={item.code} className={styles.chip}>
              {item.code}
            </span>
          ))}
        </div>
        <p className={styles.bonus}>Bonus : {languages[0].bonus}</p>
        <LinkButton to="/langues" variant="outline" onDark>
          Le centre de langues
        </LinkButton>
      </Container>
    </section>
  )
}
