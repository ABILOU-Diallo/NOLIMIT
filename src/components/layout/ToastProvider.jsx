import { useCallback, useMemo, useState } from 'react'
import { ToastContext } from '../../hooks/toast-context'

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismiss = useCallback((id) => {
    setToasts((list) => list.filter((item) => item.id !== id))
  }, [])

  const push = useCallback((toast) => {
    const id = crypto.randomUUID()
    setToasts((list) => [...list, { id, ...toast }])
    window.setTimeout(() => dismiss(id), toast.duration ?? 5000)
  }, [dismiss])

  const value = useMemo(() => ({ toasts, push, dismiss }), [toasts, push, dismiss])

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}
