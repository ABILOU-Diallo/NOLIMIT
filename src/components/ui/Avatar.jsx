import styles from './Avatar.module.css'

export function Avatar({ name, src, alt }) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()

  return (
    <span className={styles.avatar}>
      {src ? <img src={src} alt={alt || name} /> : initials}
    </span>
  )
}
