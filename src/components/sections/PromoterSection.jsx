import { site } from '../../data/site'
import { media } from '../../data/media'
import { Container } from '../ui/Container'
import { LinkButton } from '../ui/LinkButton'
import { SectionHeading } from '../ui/SectionHeading'
import styles from './PromoterSection.module.css'

export function PromoterSection() {
  return (
    <section className={styles.section}>
      <Container>
        <SectionHeading kicker="08 — Mot du promoteur" title="Une institution a un visage." />
        <div className={styles.layout}>
          <figure className={styles.portrait}>
          <img
            src={media.founder}
            alt={`${site.promoter.name}, promoteur du Groupe NO LIMIT.`}
            width="540"
            height="614"
            loading="lazy"
          />
          </figure>
          <blockquote className={styles.quote}>
            <p>
              Le mot officiel du promoteur sera publié ici dès qu’il aura été transmis par le
              Groupe NO LIMIT.
            </p>
            <div className={styles.who}>
              <strong>{site.promoter.name}</strong>
              <span>{site.promoter.role}</span>
            </div>
            <LinkButton to="/le-groupe/promoteur" variant="ghost">
              Lire la page du promoteur
            </LinkButton>
          </blockquote>
        </div>
      </Container>
    </section>
  )
}
