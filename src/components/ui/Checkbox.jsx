import { forwardRef } from 'react'
import styles from './Checkbox.module.css'

export const Checkbox = forwardRef(function Checkbox({ id, label, error, ...props }, ref) {
  return (
    <div className={styles.field}>
      <div className={styles.row}>
        <input id={id} ref={ref} type="checkbox" className={styles.box} {...props} />
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      </div>
      {error ? (
        <p className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
})
