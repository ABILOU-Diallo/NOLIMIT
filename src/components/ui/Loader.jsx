import styles from './Loader.module.css'

export function Loader({ label = 'Chargement' }) {
  return (
    <div className={styles.center} role="status" aria-live="polite">
      <span className={styles.loader} aria-hidden="true" />
      <span className="visually-hidden">{label}</span>
    </div>
  )
}
