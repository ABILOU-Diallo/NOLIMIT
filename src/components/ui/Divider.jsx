import styles from './Divider.module.css'

export function Divider({ variant = 'default' }) {
  return <hr className={[styles.divider, variant === 'navy' ? styles.navy : ''].join(' ')} />
}
