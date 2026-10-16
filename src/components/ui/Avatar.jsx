import styles from './Avatar.module.css'

export function Avatar({ name = '', src, alt }) {
  // Sécurité pour éviter le crash si name est vide ou null
  const safeName = name || ''
  const initials = safeName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase() || '?'

  return (
    <span className={styles.avatar}>
      {src ? <img src={src} alt={alt || safeName} /> : initials}
    </span>
  )
}
