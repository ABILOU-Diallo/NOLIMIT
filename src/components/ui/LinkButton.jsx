import { Link } from 'react-router-dom'
import styles from './Button.module.css'

export function LinkButton({
  to,
  href,
  variant = 'primary',
  onDark = false,
  full = false,
  className = '',
  children,
  ...props
}) {
  const classes = [
    styles.button,
    styles[variant] || styles.primary,
    onDark ? styles.onDark : '',
    full ? styles.full : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <Link to={to} className={classes} {...props}>
      {children}
    </Link>
  )
}
