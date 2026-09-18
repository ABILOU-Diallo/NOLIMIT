import { useToast } from '../../hooks/useToast'
import styles from './Toast.module.css'

export function ToastViewport() {
  const { toasts } = useToast()

  return (
    <div className={styles.region} aria-live="polite" aria-relevant="additions">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={[styles.toast, styles[toast.variant || 'info']].join(' ')}
          role="status"
        >
          {toast.message}
        </div>
      ))}
    </div>
  )
}
