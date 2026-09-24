import { useState } from 'react'
import { Navigate, Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { useAuth } from '../../hooks/useAuth'
import { signIn } from '../../services/authService'
import styles from './AuthPage.module.css'

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { session, ready, isAdmin } = useAuth()
  const [form, setForm] = useState({ email: 'admin@nolimitacademy.org', password: 'admin123' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (!ready) return null
  if (session) {
    if (isAdmin) return <Navigate to="/admin" replace />
    return <Navigate to="/compte" replace />
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    const result = await signIn(form.email, form.password)
    if (result.error) {
      setError(result.error.message || 'Impossible de se connecter.')
      setLoading(false)
      return
    }

    const next = location.state?.from || '/compte'
    navigate(next, { replace: true })
  }

  return (
    <div className={styles.page}>
      <div className={styles.panel}>
        <h1 className={styles.title}>Connexion</h1>
        <p className={styles.subtitle}>Accédez à votre espace personnel ou à l’administration.</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <Input id="email" label="E-mail" name="email" type="email" value={form.email} onChange={handleChange} required />
          <Input id="password" label="Mot de passe" name="password" type="password" value={form.password} onChange={handleChange} required />
          {error ? <p role="alert" className={styles.error}>{error}</p> : null}
          <Button type="submit" full disabled={loading}>
            {loading ? 'Connexion…' : 'Se connecter'}
          </Button>
        </form>

        <p className={styles.meta}>
          Pas encore inscrit ? <Link to="/inscription">Créer un compte</Link>
        </p>
      </div>
    </div>
  )
}
