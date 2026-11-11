import { site } from '../../data/site'
import { media } from '../../data/media'
import { Container } from '../ui/Container'
import { LinkButton } from '../ui/LinkButton'
import { SectionHeading } from '../ui/SectionHeading'
import styles from './PromoterSection.module.css'

export function PromoterSection() {
  const { promoter } = site

  const fullSpeech = [
    "Depuis près de trente ans, une conviction guide mon engagement auprès de la jeunesse: un talent peut changer une vie lorsqu’il rencontre la bonne orientation, une formation solide et la possibilité de faire ses preuves.",
    "Trop de jeunes choisissent une filière sans avoir eu l’occasion de découvrir leurs aptitudes, de comprendre les métiers ou d’explorer les réalités du marché de l’emploi. Au Groupe NO LIMIT, nous voulons commencer par cette conversation essentielle: qu’aimez-vous faire, que savez-vous déjà faire et quelles compétences souhaitez-vous développer? Une bonne orientation donne un sens à l’effort qui suit.",
    "Vient ensuite la formation. Au CFP NO LIMIT, les parcours professionnels de 3, 6, 9 mois et d’un an permettent d’acquérir des savoir-faire concrets. À ISSMIGA, les cycles BTS, Licence et Master ouvrent d’autres voies de spécialisation et de progression. Chaque parcours mérite le même respect lorsqu’il correspond à un projet réfléchi et conduit à des compétences réelles.",
    "Mais apprendre ne suffit pas. Il faut pouvoir appliquer ce que l’on apprend, notamment lors des stages d’imprégnation, gagner en assurance, présenter ses réalisations et saisir les occasions de travailler ou d’entreprendre. C’est pourquoi notre engagement tient en trois mots: Orientation – Formation – Employabilité.",
    "À chaque jeune qui doute de sa place, je veux dire ceci: votre point de départ ne définit pas votre destination. Prenez le temps de découvrir vos forces. Travaillez avec exigence. Osez apprendre, essayer, vous tromper et recommencer. L’Afrique a besoin de vos idées, de votre savoir-faire et de votre détermination.",
    "Nous portons sur nos tee-shirts les mots « Bâtisseur de Compétences ». Pour moi, ils expriment une responsabilité : aider chaque apprenant à construire, étape par étape, les capacités qui lui permettront de tracer sa voie et de contribuer à sa communauté.",
    "Votre avenir ne se devine pas: il s’oriente, se forme et se construit. Ensemble, bâtissons les compétences qui feront avancer l’Afrique."
  ]

  return (
    <section className={styles.section} id="mot-du-promoteur">
      <Container>
        <SectionHeading kicker="06 — Mot du promoteur" title="Une vision engagée pour la jeunesse." />
        <div className={styles.layout}>
          {/* Portrait du promoteur (fixe / sticky sur desktop) */}
          <div className={styles.stickyColumn}>
            <figure className={styles.portrait}>
              <img
                src={media.founder}
                alt={`${promoter.name}, promoteur du Groupe NO LIMIT.`}
                width="540"
                height="614"
                loading="lazy"
              />
              <figcaption className={styles.portraitCaption}>
                <strong>{promoter.name}</strong>
                <span>{promoter.role}</span>
              </figcaption>
            </figure>
          </div>

          {/* Discours complet du promoteur */}
          <div className={styles.speechCard}>
            <div className={styles.speechBadge}>
              <i className="bx bxs-quote-left" aria-hidden="true" style={{ fontSize: '1.25rem', color: 'var(--color-magenta-600)' }} />
              <span>Mot officiel du Promoteur</span>
            </div>

            <div className={styles.paragraphsList}>
              {fullSpeech.map((paragraph, idx) => {
                const isFirst = idx === 0
                const isHighlight = paragraph.includes('Orientation – Formation – Employabilité') || paragraph.includes('Bâtisseur de Compétences')
                const isLast = idx === fullSpeech.length - 1

                if (isFirst) {
                  return (
                    <p key={idx} className={styles.leadQuote}>
                      « {paragraph} »
                    </p>
                  )
                }

                if (isHighlight) {
                  return (
                    <div key={idx} className={styles.highlightCallout}>
                      <p>{paragraph}</p>
                    </div>
                  )
                }

                if (isLast) {
                  return (
                    <p key={idx} className={styles.finalCall}>
                      <strong>{paragraph}</strong>
                    </p>
                  )
                }

                return (
                  <p key={idx} className={styles.standardParagraph}>
                    {paragraph}
                  </p>
                )
              })}
            </div>

            <div className={styles.signatureFooter}>
              <div>
                <strong className={styles.signatureName}>{promoter.name}</strong>
                <span className={styles.signatureRole}>{promoter.role}</span>
              </div>
              <LinkButton to="/le-groupe/promoteur" variant="outline">
                Découvrir la biographie du promoteur →
              </LinkButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
