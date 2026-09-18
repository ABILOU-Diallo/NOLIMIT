import styles from './Badge.module.css'

export function Badge({ variant = 'navy', className = '', children }) {
  return (
    <span className={[styles.badge, styles[variant], className].filter(Boolean).join(' ')}>
      {children}
    </span>
  )
}
