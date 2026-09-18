import { Link } from 'react-router-dom'
import styles from './Card.module.css'

export function Card({
  to,
  padded = true,
  className = '',
  children,
  ...props
}) {
  const classes = [
    styles.card,
    padded ? styles.padded : '',
    to ? styles.interactive : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}
