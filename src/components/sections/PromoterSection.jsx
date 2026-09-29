import { site } from '../../data/site'
import { media } from '../../data/media'
import { Container } from '../ui/Container'
import { LinkButton } from '../ui/LinkButton'
import { SectionHeading } from '../ui/SectionHeading'
import styles from './PromoterSection.module.css'

export function PromoterSection() {
  const { promoter } = site

  return (
    <section className={styles.section}>
      <Container>
        <SectionHeading kicker="08 — Mot du promoteur" title="Une vision engagée pour la jeunesse." />
        <div className={styles.layout}>
          <figure className={styles.portrait}>
            <img
              src={media.founder}
              alt={`${promoter.name}, promoteur du Groupe NO LIMIT.`}
              width="540"
              height="614"
              loading="lazy"
            />
          </figure>
          <blockquote className={styles.quote}>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.6', fontStyle: 'italic', marginBottom: '1rem' }}>
              « Depuis près de trente ans, une conviction guide mon engagement auprès de la jeunesse: un talent peut changer une vie lorsqu’il rencontre la bonne orientation, une formation solide et la possibilité de faire ses preuves. »
            </p>
            <p style={{ fontSize: '1.05rem', color: 'var(--color-navy-800)', lineHeight: '1.6', marginBottom: '1.25rem' }}>
              Notre engagement tient en trois mots: <strong>Orientation – Formation – Employabilité</strong>. Ensemble, bâtissons les compétences qui feront avancer l’Afrique.
            </p>
            <div className={styles.who}>
              <strong>{promoter.name}</strong>
              <span>{promoter.role}</span>
            </div>
            <div style={{ marginTop: '1.25rem' }}>
              <LinkButton to="/le-groupe/promoteur">
                Lire le mot complet du promoteur
              </LinkButton>
            </div>
          </blockquote>
        </div>
      </Container>
    </section>
  )
}
