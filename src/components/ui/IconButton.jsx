import { forwardRef } from 'react'
import styles from './IconButton.module.css'

export const IconButton = forwardRef(function IconButton(
  { label, onDark = false, className = '', children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      className={[styles.iconButton, onDark ? styles.onDark : '', className]
        .filter(Boolean)
        .join(' ')}
      aria-label={label}
      {...props}
    >
      {children}
    </button>
  )
})
