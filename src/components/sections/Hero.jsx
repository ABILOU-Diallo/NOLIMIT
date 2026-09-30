import { site } from '../../data/site'
import { media } from '../../data/media'
import { Container } from '../ui/Container'
import { LinkButton } from '../ui/LinkButton'
import { whatsappUrl } from '../../utils/format'
import styles from './Hero.module.css'

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      {/* Background ambient glow effect */}
      <div className={styles.bgGlow} aria-hidden="true" />

      <Container className={styles.container}>
        {/* Top welcoming content */}
        <div className={styles.header}>
          <div className={styles.badgeWelcome}>
            <span className={styles.badgeDot} />
            <span>Bienvenue au {site.name} & ISSMIGA · Yaoundé</span>
          </div>

          <h1 id="hero-title" className={styles.title}>
            Construisez Votre Avenir avec une Formation d’Excellence
          </h1>

          <p className={styles.signature}>
            {site.signature}
          </p>

          <p className={styles.lead}>
            L’institut supérieur <strong>(ISSMIGA)</strong> et le centre professionnel <strong>(CFP NO LIMIT)</strong> réunis pour vous offrir des parcours diplômants, pratiques et directement connectés à l’emploi.
          </p>

          <div className={styles.actions}>
            <LinkButton to="/preinscription" className={styles.primaryCta}>
              <i className="bx bx-edit-alt" style={{ fontSize: '1.2rem', marginRight: '0.4rem' }} aria-hidden="true" />
              Préinscription en ligne (Rentrée {site.rentree.date})
            </LinkButton>
            <LinkButton to="/formations" variant="outline" onDark>
              <i className="bx bx-book-open" style={{ fontSize: '1.2rem', marginRight: '0.4rem' }} aria-hidden="true" />
              Explorer les formations
            </LinkButton>
            <LinkButton
              href={whatsappUrl(site.whatsapp.e164, site.whatsapp.message)}
              target="_blank"
              rel="noreferrer"
              variant="ghost"
              onDark
            >
              <i className="bx bxl-whatsapp" style={{ color: '#25D366', fontSize: '1.3rem', marginRight: '0.35rem' }} aria-hidden="true" />
              WhatsApp Direct
            </LinkButton>
          </div>
        </div>

        {/* Central Unique Image Showcase */}
        <div className={styles.showcaseWrapper}>
          <div className={styles.showcaseCard}>
            <figure className={styles.photo}>
              <img
                src={media.heroGroup}
                alt="L’équipe, l’administration et les étudiants du Groupe NO LIMIT et ISSMIGA réunis sur le campus à Yaoundé."
                width="1200"
                height="800"
                fetchPriority="high"
              />
              <div className={styles.photoOverlay} />
            </figure>

            {/* Floating Trust Badges */}
            <div className={`${styles.floatingBadge} ${styles.badgeTopLeft}`}>
              <div className={styles.badgeIcon} style={{ background: '#3b82f6' }}>
                <i className="bx bx-award" aria-hidden="true" />
              </div>
              <div>
                <strong>Agréé MINESUP & MINEFOP</strong>
                <span>Diplômes d’État Reconnus</span>
              </div>
            </div>

            <div className={`${styles.floatingBadge} ${styles.badgeTopRight}`}>
              <div className={styles.badgeIcon} style={{ background: '#10b981' }}>
                <i className="bx bx-briefcase-alt-2" aria-hidden="true" />
              </div>
              <div>
                <strong>Stages & Insertion 98%</strong>
                <span>Partenariats Entreprises</span>
              </div>
            </div>

            <div className={`${styles.floatingBadge} ${styles.badgeBottomCenter}`}>
              <div className={styles.badgeIcon} style={{ background: '#ec4899' }}>
                <i className="bx bx-laptop" aria-hidden="true" />
              </div>
              <div>
                <strong>Offre Spéciale Étudiants</strong>
                <span>1 Étudiant Inscrit = 1 Ordinateur Offert</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Highlights Bar */}
        <div className={styles.highlightsGrid}>
          <div className={styles.highlightItem}>
            <div className={styles.highlightIcon}>
              <i className="bx bxs-graduation" aria-hidden="true" />
            </div>
            <div>
              <h3>ISSMIGA — Enseignement Supérieur</h3>
              <p>Cycles BTS (2 ans), Licence Pro (3 ans) et Master Pro (2 ans post-licence).</p>
            </div>
          </div>

          <div className={styles.highlightItem}>
            <div className={styles.highlightIcon}>
              <i className="bx bx-wrench" aria-hidden="true" />
            </div>
            <div>
              <h3>CFP NO LIMIT — Métiers Pratiques</h3>
              <p>Parcours certifiants CQP & DQP en 1 an avec immersion professionnelle immédiate.</p>
            </div>
          </div>

          <div className={styles.highlightItem}>
            <div className={styles.highlightIcon}>
              <i className="bx bx-globe" aria-hidden="true" />
            </div>
            <div>
              <h3>Centre International de Langues</h3>
              <p>Allemand (A1-B2), Anglais, Français. Préparation aux examens & mobilités.</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

