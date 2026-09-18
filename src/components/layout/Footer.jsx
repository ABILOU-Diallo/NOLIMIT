import { Link } from 'react-router-dom'
import { footerNav, legalNav } from '../../data/nav'
import { site } from '../../data/site'
import { Container } from '../ui/Container'
import { Logo } from './Logo'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.brand}>
        <Logo />
            <p>
              {site.address}. Horaires : {site.hours}.
            </p>
            <p className={styles.agrement}>{site.agrement}</p>
          </div>
          <nav className={styles.nav} aria-label="Pied de page">
            <h2 className={styles.title}>Navigation</h2>
            {footerNav.map((item) => (
              <Link key={item.to} to={item.to}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className={styles.meta}>
            <h2 className={styles.title}>Contact</h2>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            {site.phones.map((phone) => (
              <a key={phone.href} href={phone.href}>
                {phone.label} · {phone.display}
              </a>
            ))}
          </div>
        </div>
        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} {site.name}</p>
          <div className={styles.legal}>
            {legalNav.map((item) => (
              <Link key={item.to} to={item.to}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}
