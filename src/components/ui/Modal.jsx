import { useEffect, useRef } from 'react'
import { IconButton } from './IconButton'
import { useLockBody } from '../../hooks/useLockBody'
import styles from './Modal.module.css'

/**
 * Composant Modal optimisé pour ne pas voler le focus lors de la saisie dans les formulaires
 */
export function Modal({ open, title, onClose, children }) {
  const ref = useRef(null)
  const isInitiallyFocused = useRef(false)
  useLockBody(open)

  useEffect(() => {
    if (!open) {
      isInitiallyFocused.current = false
      return undefined
    }

    // On ne donne le focus au conteneur de la modale QUE lors de l'ouverture
    // Cela évite de perdre le focus des inputs lors des re-rendus (pendant la saisie clavier)
    if (!isInitiallyFocused.current) {
      const timer = setTimeout(() => {
        ref.current?.focus()
        isInitiallyFocused.current = true
      }, 50)
      return () => clearTimeout(timer)
    }

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
        style={{ outline: 'none' }}
      >
        <div className={styles.header}>
          <h2 id="modal-title" className={styles.title}>
            {title}
          </h2>
          <IconButton label="Fermer" onClick={onClose}>
            <span aria-hidden="true">×</span>
          </IconButton>
        </div>
        <div className={styles.body}>
          {children}
        </div>
      </div>
    </div>
  )
}
