import { useEffect, useRef } from 'react'
import { IconButton } from './IconButton'
import { useLockBody } from '../../hooks/useLockBody'
import styles from './Modal.module.css'

export function Modal({ open, title, onClose, children }) {
  const ref = useRef(null)
  useLockBody(open)

  useEffect(() => {
    if (!open) return undefined
    const node = ref.current
    node?.focus()

    function onKey(event) {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        ref={ref}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.header}>
          <h2 id="modal-title" className={styles.title}>
            {title}
          </h2>
          <IconButton label="Fermer" onClick={onClose}>
            <span aria-hidden="true">×</span>
          </IconButton>
        </div>
        {children}
      </div>
    </div>
  )
}
