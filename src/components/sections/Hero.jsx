import { site } from '../../data/site'
import { media } from '../../data/media'
import { Badge } from '../ui/Badge'
import { Container } from '../ui/Container'
import { LinkButton } from '../ui/LinkButton'
import styles from './Hero.module.css'

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <figure className={styles.photo}>
        <img
          src={media.flyer}
          alt="L’équipe et des étudiants du Groupe NO LIMIT, à Yaoundé."
          width="656"
          height="872"
          fetchPriority="high"
        />
      </figure>
      <Container className={styles.layout}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{site.name}</p>
          <p className={styles.signature}>{site.signature}</p>
          <h1 id="hero-title" className={styles.title}>
            {site.tagline}
          </h1>
          <p className={styles.lead}>
            Un écosystème à Yaoundé pour s’orienter, se former et préparer un métier — ici
            comme à l’international.
          </p>
          <Badge variant="signal" className={styles.ticket}>
            <span>
              <b>{site.rentree.label}</b>
              {site.rentree.date}
            </span>
          </Badge>
          <div className={styles.actions}>
            <LinkButton to="/preinscription">Je m’inscris</LinkButton>
            <LinkButton to="/formations" variant="outline" onDark>
              Découvrir les formations
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  )
}
