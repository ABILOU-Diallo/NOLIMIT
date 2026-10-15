import { Link, useLocation } from 'react-router-dom'
import { media } from '../../data/media'
import { site } from '../../data/site'
import styles from './Logo.module.css'

export function Logo() {
  const location = useLocation()
  const isIssmiga = location.pathname.includes('/issmiga')
  const isCfp = location.pathname.includes('/cfp')

  let currentLogo = media.logo
  let currentName = site.name
  let currentSig = site.signature

  if (isIssmiga) {
    currentLogo = media.issmiga
    currentName = 'ISSMIGA'
    currentSig = 'Institut Supérieur · Groupe NO LIMIT'
  } else if (isCfp) {
    currentLogo = media.cfp
    currentName = 'CFP NO LIMIT'
    currentSig = 'Centre de Formation Professionnelle'
  }

  return (
    <Link to="/" className={styles.mark} title="Retour à l’accueil">
      <img
        className={styles.seal}
        src={currentLogo}
        alt={`Logo ${currentName}`}
        width="88"
        height="88"
      />
      <span className={styles.wordmark}>
        <span className={styles.name}>{currentName}</span>
        <span className={styles.sig}>{currentSig}</span>
      </span>
    </Link>
  )
}
