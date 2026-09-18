import styles from './Button.module.css'

const VARIANTS = ['primary', 'secondary', 'outline', 'ghost']

export function Button({
  variant = 'primary',
  type = 'button',
  onDark = false,
  full = false,
  className = '',
  children,
  ...props
}) {
  const variantClass = VARIANTS.includes(variant) ? styles[variant] : styles.primary
  const classes = [
    styles.button,
    variantClass,
    onDark ? styles.onDark : '',
    full ? styles.full : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  )
}
