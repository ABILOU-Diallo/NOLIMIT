import { Link, useLocation } from 'react-router-dom'
import { site } from '../../data/site'
import styles from './Footer.module.css'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const { pathname } = useLocation()

  // Détection du contexte pour un affichage exclusif
  const isIssmigaContext = pathname.includes('/issmiga')
  const isCfpContext = pathname.includes('/cfp')

  // Par défaut sur les pages neutres (accueil, contact, etc.), on affiche la vue Groupe.
  const isGlobal = !isIssmigaContext && !isCfpContext

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>

          {/* --- VUE ISSMIGA (Si page ISSMIGA) --- */}
          {isIssmigaContext && (
            <>
              <div className={styles.brand}>
                <h2 className={styles.institutionName}>{site.issmiga.name}</h2>
                <p className={styles.tagline}>{site.issmiga.fullName}</p>
                <div className={styles.agrement}>
                  <p><strong>Agrément MINESUP :</strong><br/>{site.issmiga.agrement || site.agrementMinesup}</p>
                </div>
              </div>

              <nav className={styles.nav} aria-label="Navigation ISSMIGA">
                <h3 className={styles.title}>Formations</h3>
                <Link to="/formations">Toutes les filières</Link>
                <Link to="/formations?level=bts">BTS (Bac+2)</Link>
                <Link to="/formations?level=licence">Licence Professionnelle</Link>
                <Link to="/formations?level=master">Master Professionnel</Link>
                <Link to="/preinscription">Inscription en ligne</Link>
              </nav>

              <div className={styles.meta}>
                <h3 className={styles.title}>Contact & Accès</h3>
                <a href={`mailto:${site.issmiga.email || 'Info@issmiga.com'}`}>
                  <i className="bx bx-envelope" /> {site.issmiga.email || 'Info@issmiga.com'}
                </a>
                {site.phones.map(p => (
                  <a key={p.href} href={p.href}>
                    <i className="bx bx-phone" /> {p.display}
                  </a>
                ))}
                <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', opacity: 0.8 }}>
                  <i className="bx bx-map-pin" /> {site.address}
                </p>
              </div>
            </>
          )}

          {/* --- VUE CFP NO LIMIT (Si page CFP) --- */}
          {isCfpContext && (
            <>
              <div className={styles.brand}>
                <h2 className={styles.institutionName}>{site.cfp.name}</h2>
                <p className={styles.tagline}>{site.cfp.fullName}</p>
                <div className={styles.agrement}>
                  <p><strong>Agrément MINEFOP :</strong><br/>{site.cfp.agrement || site.agrementMinefop}</p>
                </div>
              </div>

              <nav className={styles.nav} aria-label="Navigation CFP">
                <h3 className={styles.title}>Cycles Certifiants</h3>
                <Link to="/le-groupe/cfp">Le Centre</Link>
                <Link to="/formations?level=cqp">Certificat (CQP)</Link>
                <Link to="/formations?level=dqp">Diplôme (DQP)</Link>
                <Link to="/formations-a-la-carte">Attestations (3-9 mois)</Link>
                <Link to="/preinscription">Préinscription</Link>
              </nav>

              <div className={styles.meta}>
                <h3 className={styles.title}>Contact CFP</h3>
                <a href="mailto:Info@cfpnolimit.com">
                  <i className="bx bx-envelope" /> Info@cfpnolimit.com
                </a>
                <a href={`https://wa.me/${site.whatsapp.e164}`} target="_blank" rel="noopener noreferrer">
                  <i className="bx bxl-whatsapp" /> WhatsApp Direct
                </a>
                <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', opacity: 0.8 }}>
                  <i className="bx bx-time-five" /> Lun-Ven : {site.hours}
                </p>
              </div>
            </>
          )}

          {/* --- VUE GLOBALE GROUPE (Accueil, etc.) --- */}
          {isGlobal && (
            <>
              <div className={styles.brand}>
                <h2 className={styles.institutionName}>{site.name}</h2>
                <p>{site.tagline}</p>
                <p className={styles.agrement}>{site.signature}</p>
              </div>

              <nav className={styles.nav} aria-label="Liens rapides Groupe">
                <h3 className={styles.title}>Le Groupe</h3>
                <Link to="/le-groupe/issmiga">ISSMIGA (Supérieur)</Link>
                <Link to="/le-groupe/cfp">CFP NO LIMIT (Métiers)</Link>
                <Link to="/employabilite">Employabilité</Link>
                <Link to="/actualites">Actualités</Link>
                <Link to="/contact">Contact</Link>
              </nav>

              <div className={styles.meta}>
                <h3 className={styles.title}>Nous rejoindre</h3>
                <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>{site.address}</p>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '1.5rem' }}>
                  <a href={site.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <i className="bx bxl-facebook-circle" />
                  </a>
                  <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <i className="bx bxl-linkedin-square" />
                  </a>
                </div>
              </div>
            </>
          )}
        </div>

        <div className={styles.bottom}>
          <div className={styles.copyright}>
            © {currentYear} <strong>{site.name}</strong>. Tous droits réservés.
          </div>
          <div className={styles.legal}>
            <Link to="/mentions-legales">Mentions Légales</Link>
            <Link to="/politique-confidentialite">Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
