import { Link } from 'react-router-dom'
import { site } from '../../data/site'
import styles from './Footer.module.css'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          {/* INSTITUTION 1: ISSMIGA */}
          <div className={styles.section}>
            <div className={styles.brand}>
              <h2 className={styles.institutionName}>{site.issmiga.name}</h2>
              <p className={styles.tagline}>{site.issmiga.fullName}</p>
              <p className={styles.agrement}>
                <i className="bx bx-badge-check" style={{ fontSize: '1.2rem' }} aria-hidden="true" />
                <span><strong>Agrément MINESUP :</strong> {site.agrementMinesup || site.issmiga.agrement}</span>
              </p>
            </div>

            <nav className={styles.nav} aria-label="Navigation ISSMIGA">
              <h2 className={styles.title}>Formations ISSMIGA</h2>
              <Link to="/le-groupe/issmiga">Toutes les formations</Link>
              <Link to="/formations">BTS (Bac+2)</Link>
              <Link to="/formations">Licence Professionnelle (Bac+3)</Link>
              <Link to="/formations">Master Professionnel (Bac+5)</Link>
              <Link to="/preinscription">Préinscription en ligne</Link>
            </nav>

            <div className={styles.meta}>
              <h2 className={styles.title}>Contact ISSMIGA</h2>
              <a
                href="mailto:Info@issmiga.com"
                style={{ display: 'inline-flex', gap: '0.4rem', alignItems: 'center', fontSize: '0.92rem' }}
              >
                <i className="bx bx-envelope" aria-hidden="true" /> Info@issmiga.com
              </a>
            </div>
          </div>

          {/* INSTITUTION 2: CFP NO LIMIT */}
          <div className={styles.section}>
            <div className={styles.brand}>
              <h2 className={styles.institutionName}>{site.cfp.name}</h2>
              <p className={styles.tagline}>{site.cfp.fullName}</p>
              <p className={styles.agrement}>
                <i className="bx bx-badge-check" style={{ fontSize: '1.2rem' }} aria-hidden="true" />
                <span><strong>Agrément MINEFOP :</strong> {site.agrementMinefop || site.agrement}</span>
              </p>
            </div>

            <nav className={styles.nav} aria-label="Navigation CFP NO LIMIT">
              <h2 className={styles.title}>Formations CFP</h2>
              <Link to="/le-groupe/cfp">Toutes les formations CFP</Link>
              <Link to="/formations">Certificat de Qualification Professionnelle (CQP)</Link>
              <Link to="/formations">Diplôme de Qualification Professionnelle (DQP)</Link>
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
                <i className="bx bx-envelope" aria-hidden="true" /> Info@cfpnolimit.com
              </a>
            </div>
          </div>
        </div>

        <hr className={styles.hr} />

        <div className={styles.bottom}>
          <div className={styles.copyright}>
            © {currentYear} <strong>{site.name}</strong>. Tous droits réservés.
          </div>
          <div className={styles.socials}>
            <a href={site.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <i className="bx bxl-facebook" />
            </a>
            <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="bx bxl-linkedin" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
