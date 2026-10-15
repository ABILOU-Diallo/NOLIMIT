import { Link, useLocation } from 'react-router-dom'
import { footerNav, legalNav } from '../../data/nav'
import { site } from '../../data/site'
import { Container } from '../ui/Container'
import { Logo } from './Logo'
import cfpLogo from '../../assets/cfp.jpg'
import issmigaLogo from '../../assets/issmiga.jpg'
import styles from './Footer.module.css'

export function Footer() {
  const { pathname } = useLocation()
  const isIssmiga = pathname.includes('issmiga')
  const isCfp = pathname.includes('cfp')

  // --- FOOTER SPÉCIFIQUE ISSMIGA ---
  if (isIssmiga) {
    return (
      <footer className={styles.footer} role="contentinfo" aria-label="Pied de page ISSMIGA">
        <Container>
          <div className={styles.grid}>
            <div className={styles.brand}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <img
                  src={issmigaLogo}
                  alt="Logo ISSMIGA"
                  width="48"
                  height="48"
                  style={{ borderRadius: '50%', border: '2px solid #ffffff', objectFit: 'cover' }}
                />
                <div>
                  <strong style={{ fontSize: '1.25rem', color: '#ffffff', display: 'block', fontFamily: 'var(--font-display)' }}>
                    ISSMIGA
                  </strong>
                  <span style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.75)' }}>
                    Enseignement Supérieur
                  </span>
                </div>
              </div>

              <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.85)', marginTop: '0.85rem' }}>
                {site.issmiga.fullName}.
              </p>
              <p style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', marginTop: '0.4rem', color: '#fbcfe8', fontSize: '0.88rem', fontWeight: 600 }}>
                <i className="bx bx-gift" aria-hidden="true" />
                <span>{site.issmiga.offer}</span>
              </p>
              <p style={{ display: 'flex', gap: '0.4rem', alignItems: 'flex-start', marginTop: '0.75rem' }}>
                <i className="bx bx-map-pin" style={{ fontSize: '1.2rem', flexShrink: 0, marginTop: '0.1rem' }} aria-hidden="true" />
                <span>{site.address}. Horaires : {site.hours}.</span>
              </p>
              <p className={styles.agrement} style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', color: '#6ee7b7' }}>
                <i className="bx bx-badge-check" style={{ fontSize: '1.2rem' }} aria-hidden="true" />
                <span><strong>Agrément MINESUP :</strong> {site.agrementMinesup || site.issmiga.agrement}</span>
              </p>
            </div>

            <nav className={styles.nav} aria-label="Navigation ISSMIGA">
              <h2 className={styles.title}>Filières ISSMIGA</h2>
              <Link to="/le-groupe/issmiga">Toutes les formations ISSMIGA</Link>
              <Link to="/formations">Cycles BTS (2 ans)</Link>
              <Link to="/formations">Licence Professionnelle (3 ans)</Link>
              <Link to="/formations">Master Professionnel (2 ans)</Link>
              <Link to="/preinscription">Préinscription en ligne</Link>
              <Link to="/le-groupe/cfp" style={{ color: '#fed7aa', marginTop: '0.5rem' }}>
                <i className="bx bx-link-external" aria-hidden="true" /> Aller au CFP NO LIMIT
              </Link>
            </nav>

            <div className={styles.meta}>
              <h2 className={styles.title}>Contact ISSMIGA</h2>
              <a
                href="mailto:Info@issmiga.com"
                style={{ display: 'inline-flex', gap: '0.4rem', alignItems: 'center', fontSize: '0.92rem' }}
              >
                <i className="bx bx-envelope" aria-hidden="true" />
                <span>Email : Info@issmiga.com</span>
              </a>
              {site.phones.map((phone) => (
                <a key={phone.href} href={phone.href} style={{ display: 'inline-flex', gap: '0.4rem', alignItems: 'center' }}>
                  <i className={phone.label === 'WhatsApp' ? 'bx bxl-whatsapp' : 'bx bx-phone'} aria-hidden="true" />
                  <span>{phone.label} · {phone.display}</span>
                </a>
              ))}
              <div style={{ marginTop: '0.75rem' }}>
                <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: '#fbcfe8' }}>
                  <i className="bx bx-conversation" aria-hidden="true" /> Nous contacter directement
                </Link>
              </div>
            </div>
          </div>

          <div className={styles.bottom}>
            <p>© {new Date().getFullYear()} ISSMIGA — Groupe NO LIMIT. Tous droits réservés.</p>
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

  // --- FOOTER SPÉCIFIQUE CFP NO LIMIT ---
  if (isCfp) {
    return (
      <footer className={styles.footer} role="contentinfo" aria-label="Pied de page CFP NO LIMIT">
        <Container>
          <div className={styles.grid}>
            <div className={styles.brand}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <img
                  src={cfpLogo}
                  alt="Logo CFP NO LIMIT"
                  width="48"
                  height="48"
                  style={{ borderRadius: '50%', border: '2px solid #ffffff', objectFit: 'cover' }}
                />
                <div>
                  <strong style={{ fontSize: '1.25rem', color: '#ffffff', display: 'block', fontFamily: 'var(--font-display)' }}>
                    CFP NO LIMIT
                  </strong>
                  <span style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.75)' }}>
                    Formation Professionnelle
                  </span>
                </div>
              </div>

              <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.85)', marginTop: '0.85rem' }}>
                Centre de Formation Professionnelle NO LIMIT. Pratique métier, diplômes d’État en 1 an et immersion professionnelle directe.
              </p>
              <p style={{ display: 'flex', gap: '0.4rem', alignItems: 'flex-start', marginTop: '0.75rem' }}>
                <i className="bx bx-map-pin" style={{ fontSize: '1.2rem', flexShrink: 0, marginTop: '0.1rem' }} aria-hidden="true" />
                <span>{site.address}. Horaires : {site.hours}.</span>
              </p>
              <p className={styles.agrement} style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', color: '#fed7aa' }}>
                <i className="bx bx-badge-check" style={{ fontSize: '1.2rem' }} aria-hidden="true" />
                <span><strong>Agrément MINEFOP :</strong> {site.agrementMinefop || site.agrement}</span>
              </p>
            </div>

            <nav className={styles.nav} aria-label="Navigation CFP NO LIMIT">
              <h2 className={styles.title}>Formations CFP</h2>
              <Link to="/le-groupe/cfp">Toutes les formations CFP</Link>
              <Link to="/formations">Certificat de Qualification (CQP)</Link>
              <Link to="/formations">Diplôme de Qualification (DQP)</Link>
              <Link to="/preinscription">Préinscription en ligne</Link>
              <Link to="/le-groupe/issmiga" style={{ color: '#fbcfe8', marginTop: '0.5rem' }}>
                <i className="bx bx-link-external" aria-hidden="true" /> Aller à l'ISSMIGA
              </Link>
            </nav>

            <div className={styles.meta}>
              <h2 className={styles.title}>Contact CFP NO LIMIT</h2>
              <a
                href="mailto:Info@cfpnolimit.com"
                style={{ display: 'inline-flex', gap: '0.4rem', alignItems: 'center', fontSize: '0.92rem' }}
              >
                <i className="bx bx-envelope" aria-hidden="true" />
                <span>Email : Info@cfpnolimit.com</span>
              </a>
              {site.phones.map((phone) => (
                <a key={phone.href} href={phone.href} style={{ display: 'inline-flex', gap: '0.4rem', alignItems: 'center' }}>
                  <i className={phone.label === 'WhatsApp' ? 'bx bxl-whatsapp' : 'bx bx-phone'} aria-hidden="true" />
                  <span>{phone.label} · {phone.display}</span>
                </a>
              ))}
              <div style={{ marginTop: '0.75rem' }}>
                <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: '#fed7aa' }}>
                  <i className="bx bx-conversation" aria-hidden="true" /> Nous contacter directement
                </Link>
              </div>
            </div>
          </div>

          <div className={styles.bottom}>
            <p>© {new Date().getFullYear()} CFP NO LIMIT — Groupe NO LIMIT. Tous droits réservés.</p>
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

  // --- FOOTER GLOBAL DU GROUPE NO LIMIT & ISSMIGA ---
  return (
    <footer className={styles.footer} role="contentinfo" aria-label="Pied de page Groupe NO LIMIT">
      <Container>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Logo />
            <p style={{ display: 'flex', gap: '0.4rem', alignItems: 'flex-start', marginTop: '0.75rem' }}>
              <i className="bx bx-map-pin" style={{ fontSize: '1.2rem', flexShrink: 0, marginTop: '0.1rem' }} aria-hidden="true" />
              <span>{site.address}. Horaires : {site.hours}.</span>
            </p>
            <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.84rem' }}>
              <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', color: '#fed7aa' }}>
                <i className="bx bx-badge-check" style={{ fontSize: '1.1rem' }} aria-hidden="true" />
                <span><strong>MINEFOP (CFP) :</strong> {site.agrementMinefop || site.agrement}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', color: '#6ee7b7' }}>
                <i className="bx bx-badge-check" style={{ fontSize: '1.1rem' }} aria-hidden="true" />
                <span><strong>MINESUP (ISSMIGA) :</strong> {site.agrementMinesup}</span>
              </div>
            </div>
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
            <h2 className={styles.title}>Contact & Établissements</h2>
            {site.emails.map((em) => (
              <a
                key={em.address}
                href={em.href}
                style={{ display: 'inline-flex', gap: '0.4rem', alignItems: 'center', fontSize: '0.92rem' }}
              >
                <i className="bx bx-envelope" aria-hidden="true" />
                <span>{em.label} : {em.address}</span>
              </a>
            ))}
            {site.phones.map((phone) => (
              <a key={phone.href} href={phone.href} style={{ display: 'inline-flex', gap: '0.4rem', alignItems: 'center' }}>
                <i className={phone.label === 'WhatsApp' ? 'bx bxl-whatsapp' : 'bx bx-phone'} aria-hidden="true" />
                <span>{phone.label} · {phone.display}</span>
              </a>
            ))}
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} {site.name} & ISSMIGA. Tous droits réservés.</p>
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
