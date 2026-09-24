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
            <p style={{ display: 'flex', gap: '0.4rem', alignItems: 'flex-start', marginTop: '0.75rem' }}>
              <i className="bx bx-map-pin" style={{ fontSize: '1.2rem', flexShrink: 0, marginTop: '0.1rem' }} aria-hidden="true" />
              <span>{site.address}. Horaires : {site.hours}.</span>
            </p>
            <p className={styles.agrement} style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
              <i className="bx bx-badge-check" style={{ fontSize: '1.1rem' }} aria-hidden="true" />
              <span>{site.agrement}</span>
            </p>
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
            <a href={`mailto:${site.email}`} style={{ display: 'inline-flex', gap: '0.4rem', alignItems: 'center' }}>
              <i className="bx bx-envelope" aria-hidden="true" />
              <span>{site.email}</span>
            </a>
            {site.phones.map((phone) => (
              <a key={phone.href} href={phone.href} style={{ display: 'inline-flex', gap: '0.4rem', alignItems: 'center' }}>
                <i className={phone.label === 'WhatsApp' ? 'bx bxl-whatsapp' : 'bx bx-phone'} aria-hidden="true" />
                <span>{phone.label} · {phone.display}</span>
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
