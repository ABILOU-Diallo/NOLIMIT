import { useEffect, useRef } from 'react'
import { IconButton } from './IconButton'
import { useLockBody } from '../../hooks/useLockBody'
import styles from './Modal.module.css'

/**
 * Composant Modal optimisé pour ne pas interrompre la saisie dans les formulaires
 */
export function Modal({ open, title, onClose, children }) {
  const ref = useRef(null)
  const isInitiallyFocused = useRef(false)
  useLockBody(open)

  // Gestion du focus initial (Accessibilité)
  useEffect(() => {
    if (open) {
      if (!isInitiallyFocused.current) {
        // Un léger délai assure que le DOM est prêt avant de donner le focus au conteneur
        const timer = setTimeout(() => {
          ref.current?.focus()
          isInitiallyFocused.current = true
        }, 50)
        return () => clearTimeout(timer)
      }
    } else {
      isInitiallyFocused.current = false
    }
  }, [open])

  // Gestion de la touche Echap
  useEffect(() => {
    if (!open) return
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
