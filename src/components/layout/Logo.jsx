import { Link } from 'react-router-dom'
import { media } from '../../data/media'
import { site } from '../../data/site'
import styles from './Logo.module.css'

export function Logo() {
  return (
    <Link to="/" className={styles.mark}>
      <img
        className={styles.seal}
        src={media.logo}
        alt=""
        width="88"
        height="88"
      />
      <span className={styles.wordmark}>
        <span className={styles.name}>{site.name}</span>
        <span className={styles.sig}>{site.signature}</span>
      </span>
    </Link>
  )
}
