import { site } from '../../data/site'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { LinkButton } from '../ui/LinkButton'
import styles from './InternationalSection.module.css'

export function InternationalSection() {
  const canada = site.phones?.find((item) => item.label === 'Canada')

  const languagePrograms = [
    {
      id: 'allemand',
      title: 'Allemand (A1-C2)',
      badge: 'Études & Emploi en Allemagne',
      icon: 'bx bx-book-bookmark',
      description:
        'Formation progressive et intensive du niveau A1 à C2. Préparez efficacement le Goethe-Zertifikat.',
      tags: ['A1 - C2', 'Goethe-Zertifikat'],
    },
    {
      id: 'anglais',
      title: 'Anglais (TOEFL - IELTS - SAT...)',
      badge: 'Tests Internationaux & Bourses',
      icon: 'bx bx-certification',
      description:
        'Préparation rigoureuse aux tests d’anglais de renommée mondiale requis par les grandes universités nord-américaines (USA, Canada).',
      tags: ['TOEFL', 'IELTS Academic', 'SAT'],
    },
    {
      id: 'francais',
      title: 'Français (TCF - TEF...)',
      badge: 'Procédures Canada & Universités',
      icon: 'bx bx-badge-check',
      description:
        'Entraînement stratégique et complet aux épreuves du TCF et du TEF. Maximisez vos scores officiels pour vos permis d’études et projets d’immigration.',
      tags: ['TCF Canada', 'TEF Canada', 'Entraînement oral'],
    },
  ]

  const accompanimentPoints = [
    {
      icon: 'bx bx-timer',
      title: 'Préparation intensive aux examens',
      desc: 'Méthodologie ciblée, examens blancs réguliers en conditions réelles et décryptage des grilles de notation officielles.',
    },
    {
      icon: 'bx bx-file-blank',
      title: 'Accompagnement & constitution des dossiers',
      desc: 'Conseils personnalisés pour l’orientation, le montage de vos dossiers académiques, demandes de bourses et démarches de mobilité.',
    },
    {
      icon: 'bx bx-user-voice',
      title: 'Coaching aux entretiens',
      desc: 'Simulations d’entretiens consulaires et d’admissions universitaires pour vous exprimer avec confiance et convaincre.',
    },
  ]

  return (
    <section className={styles.section} aria-labelledby="international-title">
      <Container>
        <SectionHeading
          kicker="05 — International & Mobilité"
          title="Ouverture sur le monde et mobilité."
          lede="Le Groupe NO LIMIT accompagne ses étudiants dans leurs projets d'études, de vie et de carrière professionnelle au travers nos formations, recrutements et recrutements directs au Canada."
        />

        {/* 3 cartes de langues et certifications */}
        <div className={styles.languagesGrid}>
          {languagePrograms.map((item) => (
            <div key={item.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>
                  <i className={item.icon} aria-hidden="true" />
                </div>
                <div>
                  <span className={styles.cardBadge}>{item.badge}</span>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                </div>
              </div>

              <p className={styles.cardDesc}>{item.description}</p>

              <div className={styles.tagsList}>
                {item.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bloc Préparation aux examens & accompagnements */}
        <div className={styles.accompanimentBox}>
          
          <div className={styles.actionsBar}>
            <div className={styles.buttonsGroup}>
              <LinkButton to="/langues" variant="primary">
                <i className="bx bx-book-open" style={{ marginRight: '0.4rem' }} aria-hidden="true" />
                Découvrir le Centre de Langues
              </LinkButton>
              <LinkButton to="/preinscription" variant="outline" onDark>
                <i className="bx bx-edit-alt" style={{ marginRight: '0.4rem' }} aria-hidden="true" />
                Préinscription en ligne
              </LinkButton>
            </div>

            {canada && (
              <div className={styles.canadaContact}>
                <span className={styles.canadaLabel}>Conseiller mobilité (Canada) :</span>
                <a className={styles.canadaPhone} href={canada.href}>
                  <i className="bx bx-phone" aria-hidden="true" /> {canada.display}
                </a>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
