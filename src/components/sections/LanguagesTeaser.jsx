import { languageCertifications, languageLevels, languages } from '../../data/languages'
import { Container } from '../ui/Container'
import { LinkButton } from '../ui/LinkButton'
import { SectionHeading } from '../ui/SectionHeading'
import styles from './LanguagesTeaser.module.css'

export function LanguagesTeaser() {
  // Sécurité au cas où les données seraient mal chargées
  const safeLanguages = Array.isArray(languages) ? languages : []
  const safeGroups = Array.isArray(languageLevels) ? languageLevels : []

  // Aplatir les niveaux pour l'affichage de l'échelle (A1, A2, B1...)
  const allLevels = safeGroups.flatMap(group => group.levels || [])

  return (
    <section className={styles.section}>
      <Container>
        <SectionHeading
          onDark
          kicker="05 — Centre de langues"
          title="A1 jusqu’à C2. Pas un slogan, une échelle."
          lede="Allemand, anglais et français, avec des certifications reconnues. Votre réussite internationale commence ici."
        />
        <div className={styles.scale} aria-label="Niveaux du CECRL">
          {allLevels.map((level) => (
            <div key={level.code} className={styles.level}>
              {level.code}
            </div>
          ))}
        </div>
        <div className={styles.langs}>
          {safeLanguages.map((lang) => (
            <span key={lang.slug} className={styles.chip}>
              {lang.name}
            </span>
          ))}
        </div>
        <div className={styles.certs}>
          {Array.isArray(languageCertifications) && languageCertifications.map((item) => (
            <span key={item.code} className={styles.chip}>
              {item.code}
            </span>
          ))}
        </div>
        {safeLanguages.length > 0 && safeLanguages[0].bonus && (
          <p className={styles.bonus}>Bonus : {safeLanguages[0].bonus}</p>
        )}
        <LinkButton to="/langues" variant="outline" onDark>
          Découvrir nos cours
        </LinkButton>
      </Container>
    </section>
  )
}
